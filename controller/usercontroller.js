var NEWUSER = require("../Model/user");
var ADMIN = require("../Model/admin");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.SECURE = async function (req, res, next) {
    try {

    const token = req.headers.authorization;
    if(!token) throw new Error("PLease Attche Token");

    const isvalidtoken = jwt.verify(token,"TEST");
    const  tokenndata = await ADMIN.findById(isvalidtoken.id);
    
    if(!tokenndata) throw new Error("USER is not valid");
      
    next()
    
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}

exports.SIGNUP = async function (req, res, next) {
    try {
        // console.log(req.file)
        // return res.send("test")
        
        let { firstname, lastname, email, password } = req.body;
        password = await bycrypt.hash(password, 8);

        let usercreate = await NEWUSER.create({
            firstname,
            lastname,
            email,
            password,
            profile: req.file.filename
        })

        res.status(201).json({
            status: "Success",
            message: "User Signup Successfully",
            data: usercreate,
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}


exports.LOGIN = async function (req, res, next) {
    try {
        let { email, password } = req.body;
        const userfind = await NEWUSER.findOne({ email });

        if (!userfind) throw new Error('user not found')

        let newpassword = await bycrypt.compare(password, userfind.password)

        if (!newpassword) throw new Error('password is not valid')

        const token = jwt.sign({ id: userfind._id }, "USER")

        res.status(201).json({
            status: "Success",
            message: "User login Successfully",
            Token: token,
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}

exports.READ = async function (req, res, next) {
    let DATA;
    try {
        if (req.query.search) {
            DATA = await NEWUSER.find({
                $or: [
                    { firstname: { $regex: req.query.search, $options: 'i' } },
                    { lastname: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } },
                ]
            });
        } else{
            // No search query, fetch all data
            DATA = await NEWUSER.find();
        }

        res.status(201).json({
            status: "Success",
            message: "Data Read Successfully",
            data: DATA,
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}


exports.UPDATE = async function (req, res, next) {
    try {

        const { firstname, lastname, email, password } = req.body;

        let updatedPassword = password; 

        if (password) {
            updatedPassword = await bycrypt.hash(password, 8); 
        }
        
        const DATA = await NEWUSER.findByIdAndUpdate(req.params.id, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: updatedPassword
        }, {
            new: true // This should be inside the options object
        });


        res.status(201).json({
            status: "Success",
            message: "Data Update Successfully",
            data: DATA,
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}



exports.DELETE = async function (req, res, next) {
    try {

        const DATA = await NEWUSER.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: "Success",
            message: "Data Delete Successfully",
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}

