const userModel=require("../model/User");
const ErrorHandler=require("../utils/ErrorHandler");
const {CatchAsyncError}=require("../middleware/CatchasyncError");
const {sendToken}=require("../utils/SendToken");


exports.homepage=CatchAsyncError(async (req,res,next)=>{
    res.status(200).json({message:"Home is Ready"});
});

exports.signup=CatchAsyncError(async (req,res,next)=>{
    //  res.json(req.body);
    const user=await new userModel(req.body).save();
    const result=sendToken(user,201,res);
    res.json({result});
});
exports.signin=CatchAsyncError(async (req,res,next)=>{
     const loggedUser=await userModel.findOne({email:req.body.email}).select("+password").exec();

     if(loggedUser.role!=='ADMIN'){
       return next(new ErrorHandler("User is Not Admin",404));
     } 
    if(!loggedUser){
          return next(new ErrorHandler("User with this email address Not Found",404));
    }  
   
    const isMatch=loggedUser.comparepassword(req.body.password);
    if(!isMatch){
        return next(new ErrorHandler("Wrong Credentials !!",500));
    }
//    res.json(loggedUser);
  sendToken(loggedUser,200,res);
});
exports.signout=CatchAsyncError(async (req,res,next)=>{
    res.clearCookie("token");
    res.json({message:"successFully sign out !!!!"});
});

exports.allBasicUser=CatchAsyncError(async (req,res,next)=>{
     const allUsers=await userModel.find({role:"BASIC"});
     res.json({allUsers});
});

