const userModel=require("../model/User");
const basicModel=require("../model/BasicUser");
const ErrorHandler=require("../utils/ErrorHandler");
const {CatchAsyncError}=require("../middleware/CatchasyncError");
const {sendToken,sendAddedUserToken}=require("../utils/SendToken");
const { default: mongoose } = require("mongoose");
exports.homepage=CatchAsyncError(async (req,res,next)=>{
    res.status(200).json({message:"Home is Ready"});
});
exports.currentAdmin=CatchAsyncError(async (req,res,next)=>{
    const admin= await userModel.findById(req.id).populate("createdusers").exec();
    res.status(200).json({admin})
})
exports.signup=CatchAsyncError(async (req,res,next)=>{
    //  res.json(req.body);
    const user=await new userModel(req.body).save();
    const result=sendToken(user,201,res);
    res.json(result);
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
exports.addUser=CatchAsyncError(async (req,res,next)=>{
    const admin=await userModel.findById(req.id).exec();
    const basicUser=await new basicModel(req.body).save();
    admin.createdusers.push(basicUser._id);
    await admin.save();
    const result=sendAddedUserToken(basicUser,201,res);
    res.json(result);
});

exports.editUser=CatchAsyncError(async (req,res,next)=>{
    const admin = await userModel.findById(req.id).exec();
    const updateUserDetail=await basicModel.findByIdAndUpdate(req.params.id,req.body);
    await updateUserDetail.save();
    await admin.save();
    res.json({admin,message:"Updated !!!"});
});

exports.deleteUser=CatchAsyncError(async (req,res,next)=>{
    const admin = await userModel.findById(req.id).exec();
    const basicUser=await basicModel.findOne({_id:req.params.id});
    admin.createdusers.splice(admin.createdusers.indexOf(basicUser._id),1);
    await basicModel.findByIdAndDelete(basicUser._id);
    await admin.save();
    // await basicModel.findByIdAndDelete(req.params.id);
    res.json({message:"Account Deleted Successfully"});
});