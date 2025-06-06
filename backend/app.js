const express=require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();
require("./conn/conn");
const User=require("./routes/user");
const Books=require("./routes/book");
const Favourite=require("./routes/favourite");
const Cart=require("./routes/cart");
const Order = require("./routes/order");
const path=require("path");




app.use(cors());
app.use(express.json());





app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);


if (process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));

  })
}



app.listen(process.env.PORT,()=>{
  console.log(`Server started in ${process.env.PORT}`);
});
