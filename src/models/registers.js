const mongoose = require("mongoose");
const employeeschema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    instituteid: {
        type: Number,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    }
})

const Register = new mongoose.model("mydata",employeeschema);

module.exports = Register;



