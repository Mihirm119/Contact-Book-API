var ADMIN = require("../Model/admin");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.SECURE = async function (req, res, next) {
    try {

        const token = req.headers.authorization;
        if (!token) throw new Error("PLease Attche Token");

        const isvalidtoken = jwt.verify(token, "TEST");
        const tokenndata = await ADMIN.findById(isvalidtoken.id);

        if (!tokenndata) throw new Error("USER is not valid");

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}

exports.SIGNUP = async function (req, res, next) {
    try {
        let { email, password } = req.body;
        password = await bycrypt.hash(password, 8);

        let usercreate = await ADMIN.create({
            email,
            password
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
        const userfind = await ADMIN.findOne({ email });

        if (!userfind) throw new Error('user not found')

        let newpassword = await bycrypt.compare(password, userfind.password)

        if (!newpassword) throw new Error('password is not valid')

        const token = jwt.sign({ id: userfind._id }, "TEST")

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
    try {
        const DATA = await ADMIN.find();

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


// exports.UPDATE = async function (req, res, next) {
//     try {
//         const {newemail, newpassword } = req.body;
//         Password = await bycrypt.hash(newpassword, 8);

//         if (!newemail) throw new Error("PLease Enter newemail");
//         if (!newpassword) throw new Error("PLease Enter newpassword");


//         const DATA = await ADMIN.findByIdAndUpdate(req.params.id, {
//             email: newemail,
//             password: Password
//         }, {
//             new: true // This should be inside the options object
//         });

//         res.status(201).json({
//             status: "Success",
//             message: "Data Update Successfully",
//             data: DATA,
//         })

//     } catch (error) {
//         res.status(404).json({
//             status: "Fail",
//             message: error.message,
//         })
//     }
// }



// exports.DELETE = async function (req, res, next) {
//     try {

//         const DATA = await ADMIN.findByIdAndDelete(req.params.id);

//         res.status(201).json({
//             status: "Success",
//             message: "Data Delete Successfully",
//         })

//     } catch (error) {
//         res.status(404).json({
//             status: "Fail",
//             message: error.message,
//         })
//     }
// }

