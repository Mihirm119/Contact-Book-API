var NEWUSER = require("../Model/contact");
let USERS = require("../Model/user");
let ADMIN = require("../Model/admin");
const jwt = require('jsonwebtoken');

// exports.SECURE = async function (req, res, next) {
//     try {

//         const token = req.headers.authorization;
//         if (!token) throw new Error("PLease Attche Token");

//         const isvalidtoken = jwt.verify(token, "USER");
//         const tokenndata = await USERS.findById(isvalidtoken.id);

//         if (!tokenndata) throw new Error("USER is not valid");

//         req.user = tokenndata._id

//         next()

//     } catch (error) {
//         res.status(404).json({
//             status: "Fail",
//             message: error.message,
//         })
//     }
// }

exports.SECURE = async function (req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("Please attach a token");

        let isvalidtoken, userData;

        try {
            isvalidtoken = jwt.verify(token, "USER");
            userData = await USERS.findById(isvalidtoken.id);
        } catch (err) {
            try {

                isvalidtoken = jwt.verify(token, "TEST");
                userData = await ADMIN.findById(isvalidtoken.id);
            } catch (adminErr) {
                throw new Error("Invalid token: Authentication failed");
            }
        }

        if (!userData) throw new Error("User/Admin is not valid");

        req.user = userData._id;
        req.role = userData.role || "user";

        next();
    } catch (error) {
        res.status(401).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.CREATE = async function (req, res, next) {
    try {
        let { name, phone, email, address } = req.body;

        let usercreate = await NEWUSER.create({
            name,
            phone,
            email,
            address,
            userId: req.user,
        })

        res.status(201).json({
            status: "Success",
            message: "User Create Successfully",
            data: usercreate,
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
        let DATA;
        if (req.role == 'User') {
            if (req.query.search) {
                DATA = await NEWUSER.find({
                    userId: req.user,
                    $or: [
                        { name: { $regex: req.query.search, $options: 'i' } },
                        { phone: { $regex: req.query.search, $options: 'i' } },
                        { email: { $regex: req.query.search, $options: 'i' } },
                        { address: { $regex: req.query.search, $options: 'i' } },
                    ]
                });
            } else {
                DATA = await NEWUSER.find({ userId: req.user })
            }
        }

        else if (req.role == 'Admin') {
            if (req.query.search) {
                DATA = await NEWUSER.find({
                    $or: [
                        { name: { $regex: req.query.search, $options: 'i' } },
                        { phone: { $regex: req.query.search, $options: 'i' } },
                        { email: { $regex: req.query.search, $options: 'i' } },
                        { address: { $regex: req.query.search, $options: 'i' } },
                    ]
                });
            } else {
                DATA = await NEWUSER.find().populate('userId')
            }
        }

        res.status(201).json({
            status: "Success",
            message: "Data FIND Successfully",
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

        const {name,phone,email,address} = req.body;
        if (!name && !phone && !email && !address) throw new Error("Please enter at least one field if you want to update.");

        const checkid = await NEWUSER.findById(req.params.id)
        if (!checkid) throw new Error("Id not found");
        
        if (req.user.toString() !== checkid.userId.toString()) throw new Error("UnauthorizedError: ID does not match");

        const DATA = await NEWUSER.findByIdAndUpdate(req.params.id, req.body, {
            new: true
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

        const idcheck = await NEWUSER.findById(req.params.id);
        if(!idcheck) throw new Error("Id is not valid");

        if(idcheck.userId.toString()  !== req.user.toString()) throw new Error("UnauthorizedError: ID does not match");

        const Deltecontact = await NEWUSER.findByIdAndDelete(req.params.id)

        res.status(201).json({
            status: "Success",
            message: "Data Delete Successfully",
            DeltedData:Deltecontact,
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}

