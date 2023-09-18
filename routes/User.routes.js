const express = require("express");
const UserRouter = express.Router()
const { body, validationResult } = require('express-validator');
require("dotenv").config()
const bcrypt = require("bcrypt")
const UserModel = require('../Models/User.model');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );


  function generateOTP() {
    const length = 4; // Change the length to 4 for a 4-digit OTP
    let otp = ''; 
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
    }
     return otp;
  }  

UserRouter.post("/register",[
    body("name","Enter a vaild name").isLength({min:1}),
    body("email","Enter a vaild email").isEmail(),
    body("password","Enter a vaild password").isLength({min:8})
],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({ error: errors.array() })
    }
    try {
        const {email,password,name,mobileNumber} = req.body
        const otp = generateOTP()
        const hashedpass = bcrypt.hashSync(password, 10);
         
        client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to:`${mobileNumber}`,
            body: `Otp : ${otp}`,
            messagingServiceSid:process.env.M_SID
          }).then((messsage) => {
            fetch(`https://ipinfo.io/json?token=${process.env.authip}`).then(
                (response) => response.json()
              ).then(
                async(jsonResponse) => {
                  const user = new UserModel({
                    name,
                    email,
                   password:hashedpass,
                   mobileNumber,
                   verification_ip:jsonResponse.ip,
                   verifiaction_state:jsonResponse.state,
                   verifiaction_city:jsonResponse.city,
                   verification_pincode:jsonResponse.postal,
                   otp, 
                  })
                  
                await user.save()
                res.status(200).send({"msg":"OTP sent successfully"})
                }
              )

          });
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ error: 'Registration failed' ,errormessage:error.message});
    }
})

UserRouter.post("/verifyOTP",async(req,res)=>{
    const {mobileNumber,otp} = req.body
    try {
        const checkuser = await UserModel.findOne({mobileNumber})
        if(!checkuser){
            res.status(400).send({"msg":"Invalid mobile number"})
        }

        if(checkuser.otp==otp){
            const update = await UserModel.findByIdAndUpdate(checkuser._id,{mobileNumber_is_Verified:true})
            res.status(200).send({"msg":"Your are verified now you can login"})
        }else{
            res.status(400).send({"msg":"Invalid OTP"})
        }
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ error: 'Registration failed' ,errormessage:error.message});
    }
})

module.exports = UserRouter