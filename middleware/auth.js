const jwt=require("jsonwebtoken");
const ErrorHandler=require("../utils/ErrorHandler");
const {CatchAsyncError}=require("../middleware/CatchasyncError");

exports.isAuthenticated=CatchAsyncError(async (req,res,next)=>{
   const {token}=req.cookies;
   if(!token){
     return next(new ErrorHandler("Please Login to Access the resources",401));
   }
   const {id}=jwt.verify(token,process.env.JWT_SECRET);
   req.id=id;
   next();
});


exports.isNormalUserAuthenticated=CatchAsyncError(async (req,res,next)=>{
 const {basicUser}=req.cookies;
 if(!basicUser){
  return next(new ErrorHandler("Please Login Access the Resources",401));
 }
 const {id}=jwt.verify(basicUser,process.env.JWT_SECRET);
 req.id=id;
 next();
});