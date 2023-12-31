const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verification_city:{
        type:String
    },
    verification_pincode:{
        type:Number
    },
    verification_state:{
        type:String
    },
    verification_ip:{
        type:String
    },
    mobileNumber: {
        type:Number
    },
    mobileNumber_is_Verified:{
      type:Boolean,
      default:false
    },
    otp:{
        type:Number
    }
},
{timestamps:true}
)



const UserModel = mongoose.model("user",UserSchema)


module.exports = UserModel