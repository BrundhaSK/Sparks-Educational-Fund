const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:[true, "First name is required"],
        minLength:3
    },
    last_name:{
        type:String,
        required:[true, "last name is required"],
        minLength:3
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Id")
            }
        }
    },
    message:{
        type:String,
        required:[true, "Message is required"],
        minLength:3
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const User = mongoose.model("User",userSchema);

module.exports = User;