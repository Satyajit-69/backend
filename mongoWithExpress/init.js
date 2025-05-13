const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

//monogoose connection
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


let allchats = [
{
from: "Gugu",
to: "bunu",
msg: "back pain",
created_at: new Date(),
},
{
  from: "Sunio",
  to: "Nobita",
  msg: "chest day lets go",
  created_at: new Date(),
},
{
  from: "Adi",
  to: "Guru",
  msg: "lets play free fire",
  created_at: new Date(),
}
]

Chat.insertMany(allchats) ;