const express=require("express");
const router=express.Router();
const {homepage,signup,signin,signout,allBasicUser,currentAdmin,addUser, editUser, deleteUser} =require("../controller/IndexController")
const {isAuthenticated}=require("../middleware/auth")
const {userSignUp} =require("../controller/normalUserController");
//GET /admin
router.get("/",isAuthenticated,homepage);


//GET /admin/currentAdmin  CURRENT ADMIN

router.get("/currentAdmin",isAuthenticated,currentAdmin);

//POST /admin/signup  =>   SIGNUP ROUTE FOR ADMIN
router.post("/signup",signup);

//POST /admin/signin   =>  SIGNIN ROUTE FOR ADMIN

router.post("/signin",signin);

//GET /admin/signout   =>  SIGNOUT ROUTE FOR ADMIN 

router.get("/signout",signout);

//GET  /admin/allUser  =>  SEE THE ALL NORMAL USER
 
router.get("/alluser",isAuthenticated,allBasicUser);

//GET /admin/addUser  => Register All Basic User by Admin

router.post("/adduser",isAuthenticated,addUser);

//POST /admin/edituser

router.post("/edituser/:id",isAuthenticated,editUser);


router.post("/delete/:id",isAuthenticated,deleteUser);

module.exports = router;
