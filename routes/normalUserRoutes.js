const express=require("express");
const router=express.Router();
const {userSignIn,userSignOut,currentUser}=require("../controller/normalUserController");
const {isNormalUserAuthenticated}=require("../middleware/auth");


//GET /basic/currentuser  =>FOR FINDING THE BASIC LOGIN USER

router.get("/currentuser",isNormalUserAuthenticated,currentUser);

//POST /basic/signin  => LOGIN ROUTE FOR BASIC USER

router.post("/signin",userSignIn);


//GET /basic/signout => LOGOUT ROUTE FOR BASIC USER

router.get("/signout",userSignOut);




module.exports=router