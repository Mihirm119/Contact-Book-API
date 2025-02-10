const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const USER = new Schema({
    email: {
        type: String,
        require: [true, "email Is Required , PLease Enter A Email"],
        trim: true
    },
    password: {
        type: String,
        require: [true, "Password Is Required , PLease Enter A Password"],
        trim: true,
    },
    profile: String,
    role: {
        type: String,
        default: "User",
    }
})

const NEWUSER = mongoose.model("User", USER);

module.exports = NEWUSER;