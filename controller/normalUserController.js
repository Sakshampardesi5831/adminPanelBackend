const basicModel=require("../model/BasicUser");
const ErrorHandler=require("../utils/ErrorHandler");
const {CatchAsyncError}=require("../middleware/CatchasyncError");
const {sendAddedUserToken}=require("../utils/SendToken");


exports.userSignIn=CatchAsyncError(async (req,res,next)=>{
    const loggedUser=await basicModel.findOne({email:req.body.email}).select("+password").exec();

    if(!loggedUser){
       return  next(new ErrorHandler("User with this Email Address not found",404))
    }
    const isMatch=loggedUser.comparepassword(req.body.password);
    if(!isMatch){
        return next(new ErrorHandler("Wrong Credentials !!",500));
    }
    sendAddedUserToken(loggedUser,200,res);
})

exports.userSignOut=CatchAsyncError(async (req,res,next)=>{
    res.clearCookie("basicUser");
    res.json({message:"successFully sign out !!!!"});
});

exports.currentUser=CatchAsyncError(async (req,res,next)=>{
    const basicUser=await basicModel.findById(req.id).exec();
    res.status(200).json({basicUser});
});

