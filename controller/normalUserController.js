const userModel=require("../model/User");
const ErrorHandler=require("../utils/ErrorHandler");
const {CatchAsyncError}=require("../middleware/CatchasyncError");
const {sendAddedUserToken}=require("../utils/SendToken");


exports.userHomePage=CatchAsyncError(async (req,res,next)=>{
    res.json({message:"SECURE PAGE FOR ALL USER"});
});

exports.userSignUp=CatchAsyncError(async (req,res,next)=>{
    const normalUser=await new userModel(req.body).save();
    const result=sendAddedUserToken(normalUser,200,res);
    res.json(result);
});

exports.userSignIn=CatchAsyncError(async (req,res,next)=>{
    const loggedUser=await userModel.findOne({email:req.body.email}).select("+password").exec();
    if(!loggedUser){
        return next(new ErrorHandler("User is Not Found With this Email Address"));
    }
    const isMatch=loggedUser.comparepassword(req.body.password);
    if(!isMatch){
        return next(new ErrorHandler("Wrong Credentials !!",500));
    }
    sendAddedUserToken(loggedUser,200,res);
});

exports.userSignOut=CatchAsyncError(async (req,res,next)=>{
    res.clearCookie("basicUser");
    res.json({message:"successFully sign out !!!!"});
}); 