const express=require("express");
const router=express.Router();
const {homepage,signup,signin,signout,allBasicUser} =require("../controller/IndexController")
const {isAuthenticated}=require("../middleware/auth")

//GET /admin
router.get("/",isAuthenticated,homepage);

//POST /admin/signup  =>   SIGNUP ROUTE FOR ADMIN
router.post("/signup",signup);

//POST /admin/signin   =>  SIGNIN ROUTE FOR ADMIN

router.post("/signin",signin);

//GET /admin/signout   =>  SIGNOUT ROUTE FOR ADMIN 

router.get("/signout",signout);

//GET  /admin/allUser  =>  SEE THE ALL NORMAL USER
 
router.get("/alluser",isAuthenticated,allBasicUser);

module.exports = router;