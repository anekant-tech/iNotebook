const mongoose = require('mongoose');

//const mongoURI = "mongodb://127.0.0.1:27017/ecommerce?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const mongoURI="mongodb+srv://anekantjain:veera2000@cluster0.5dtuq.mongodb.net/inotebook?retryWrites=true&w=majority"
   
connectToMongo=()=>{mongoose.connect(mongoURI 
    );
  const db=mongoose.connection;
  db.on("error", function(){console.log("error in connecting mongo db")});
  db.once("open",function(){
    console.log("Connected to Mongo Successfully");

  }) }


module.exports = connectToMongo; 