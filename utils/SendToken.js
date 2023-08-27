exports.sendToken=(user,statusCode,res)=>{
    const token=user.generatedJwtToken();
    const option={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,

    };
     res.status(statusCode).cookie("token",token,option)
     .json({success:true,id:user._id,token});
     
    // res.json({
    //     token:token,
    // });
}

exports.sendAddedUserToken=(normalUser,statusCode,res)=>{
    const token=normalUser.generatedJwtToken();
    const option={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,

    };
     res.status(statusCode).cookie("basicUser",token,option)
     .json({success:true,id:normalUser._id,token});
     
    // res.json({
    //     token:token,
    // });
}
