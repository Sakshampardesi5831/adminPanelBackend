exports.generatedError=(err,req,res,next)=>{
     const statusCode=err.statuscode || 500
     if(err.name=="MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message="User with this email address already exists";
     }

    res.status(statusCode).json({
        message:err.message,
        errName:err.name,
    });
}