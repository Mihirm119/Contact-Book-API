const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const USER = new Schema({
    firstname:{
        type:String,
        require:[true,"firstname Is Required , PLease Enter A Email"],
        trim:true,
        unique:true
    },
    lastname:{
        type:String,
        require:[true,"lastname Is Required , PLease Enter A Email"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:[true,"email Is Required , PLease Enter A Email"],
        trim:true
    },
    password:{
        type:String,
        require:[true,"Password Is Required , PLease Enter A Password"],
        trim:true,
    },
    profile: String
}) 

const NEWUSER = mongoose.model("User", USER);

module.exports = NEWUSER;