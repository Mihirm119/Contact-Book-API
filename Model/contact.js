const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const USER = new Schema({
    name:{
        type:String,
        required:[true,"Email Is Required , PLease Enter A Email"],
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        require:[true,"Password Is Required , PLease Enter A Password"],
        trim:true,
    },
    email:{
        type:String,
        require:[true,"Password Is Required , PLease Enter A Password"],
        trim:true,
    },
    address:{
        type:String,
        require:[true,"Password Is Required , PLease Enter A Password"],
        trim:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}) 

const Contact = mongoose.model("Contact", USER);

module.exports = Contact;