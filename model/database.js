const mongoose=require("mongoose");
mongoose.set("strictQuery",false);
//"mongodb://localhost/adminPanel"
exports.databaseConnect=()=>{
  try {
    mongoose.connect(`${process.env.MONGODB_URI}`).then(function(){
        console.log("Database is Connected !!!");
    })

  } catch (error) {
    console.log(error);
  }
}