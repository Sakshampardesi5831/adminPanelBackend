require("dotenv").config({path:"./.env"});
const express=require("express");
const app=express();
const logger=require("morgan");
const session=require("express-session");
const cookieParser=require("cookie-parser");


//DATABASE CONNECTION
require("./model/database").databaseConnect();

//logger
app.use(logger("tiny"));



//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET,
}));

app.use(cookieParser());

app.use("/admin",require("./routes/indexRoutes"));
app.use("/basic",require("./routes/normalUserRoutes"));
//ERROR HANDLING 
const {generatedError}=require("./middleware/error");
const ErrorHandler=require("./utils/ErrorHandler")
app.all("*",function(req,res,next){
   next(new ErrorHandler(`Request Url Not Found ${req.url}`,404));
});


app.use(generatedError);




app.listen(process.env.PORT,()=>console.log(`Server is running at ${process.env.PORT}`));



