const express = require('express');

const admincontroller=require('./admin')
const controller= require('./common_controler');
const router=express.Router();


//user route
router.post('/signup',controller.create)
router.post('/login',controller.login)


//admin route
router.post('/adminlogin',admincontroller.login)





module.exports=router;