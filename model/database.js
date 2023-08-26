const mongoose=require("mongoose");
mongoose.set("strictQuery",false);

exports.databaseConnect=()=>{
  try {
    mongoose.connect("mongodb://localhost/adminPanel").then(function(){
        console.log("Database is Connected !!!");
    })

  } catch (error) {
    console.log(error);
  }
}