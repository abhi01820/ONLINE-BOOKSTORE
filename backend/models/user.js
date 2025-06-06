const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  favourites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
  ],
  orders:[
    {
      type:mongoose.Schema.Types.ObjectId ,
      ref:"order"
    }
  ],
},{timestamps:true}
);

module.exports=mongoose.model("user",user);

