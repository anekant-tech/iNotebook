const mongoose = require('mongoose');
require('dotenv').config()


//const mongoURI = "mongodb://127.0.0.1:27017/ecommerce?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const mongoURI=process.env.MONGOURI
   
connectToMongo=()=>{mongoose.connect(mongoURI 
    );
  const db=mongoose.connection;
  db.on("error", function(){console.log("error in connecting mongo db")});
  db.once("open",function(){
    console.log("Connected to Mongo Successfully");

  }) }


module.exports = connectToMongo; 