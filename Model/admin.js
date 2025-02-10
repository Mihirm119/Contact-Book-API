const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const USER = new Schema({
    email:{
        type:String,
        require:[true,"Email Is Required , PLease Enter A Email"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:[true,"Password Is Required , PLease Enter A Password"],
        trim:true,
    },
    role:{
        type:String,
        default:"Admin",
    }
}) 

const ADMIN = mongoose.model("admin", USER);

module.exports = ADMIN;