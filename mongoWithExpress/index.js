const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
  console.log("MongoDB connected");
}
main().catch((err) => console.log(err));

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Utility: Wrap async functions for error handling
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

// Root
app.get("/", (req, res) => {
  res.send("Root is working");
});

// Index Route
app.get("/chats", asyncWrap(async (req, res) => {
  const chats = await Chat.find();
  res.render("index.ejs", { chats });
}));

// New Chat Form
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Chat
app.post("/chats", asyncWrap(async (req, res) => {
  const { from, to, msg } = req.body;
  const newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date()
  });
  await newChat.save();
  res.redirect("/chats");
}));

// Show Chat
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  if (!chat) throw new ExpressError("Chat not found", 404);
  res.render("show.ejs", { chat }); // You need to create show.ejs
}));

// Edit Form
app.get("/chats/:id/edit", asyncWrap(async (req, res, next) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  if (!chat) throw new ExpressError("Chat not found", 404);
  res.render("edit.ejs", { chat });
}));

// Update Chat
app.put("/chats/:id", asyncWrap(async (req, res) => {
  const { id } = req.params;
  const { msg: newMsg } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  res.redirect("/chats");
}));

// Delete Chat
app.delete("/chats/:id", asyncWrap(async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
}));

// Error Handling Middleware

// Mongoose Validation Error Handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    console.log("Validation Error");
    err.status = 400;
    err.message = "Validation error  ! Please follow the rules";
  }
  next(err);
});

// Final Error Handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).send(message);
});

// Server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
