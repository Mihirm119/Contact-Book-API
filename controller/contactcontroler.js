var NEWUSER = require("../Model/contact");
let USERS = require("../Model/user");
const jwt = require('jsonwebtoken');

exports.SECURE = async function (req, res, next) {
    try {

        const token = req.headers.authorization;
        if (!token) throw new Error("PLease Attche Token");

        const isvalidtoken = jwt.verify(token, "USER");
        const tokenndata = await USERS.findById(isvalidtoken.id);

        if (!tokenndata) throw new Error("USER is not valid");
        
        next()

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}

exports.CREATE = async function (req, res, next) {
    try {
        let { name, phone, email, address } = req.body;

        let usercreate = await NEWUSER.create({
            name,
            phone,
            email,
            address
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
    let DATA;
    try {
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
            // No search query, fetch all data
            DATA = await NEWUSER.find();
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

        const { name, phone, email, address } = req.body;

        const DATA = await NEWUSER.findByIdAndUpdate(req.params.id, {
            name: name,
            phone: phone,
            email: email,
            address: address
        }, {
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

