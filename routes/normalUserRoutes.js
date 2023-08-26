const express=require("express");
const router=express.Router();
const {userHomePage,userSignUp,userSignIn,userSignOut}=require("../controller/normalUserController");
const {isNormalUserAuthenticated}=require("../middleware/auth")

//GET /basic  FRONT PAGE FOR NORMAL USERS

router.get("/",isNormalUserAuthenticated,userHomePage);

//POST /basic/signup REGISTER ROUTE FOR NORMAL USER
router.post("/signup",userSignUp);


//POST /basic/signin LOGIN ROUTE FOR NORMAL USER 
router.post("/signin",userSignIn);



//POST /basic/signout LOGOUT ROUTE FOR NORMAL USER
router.get("/signout",userSignOut);





module.exports=router