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

        req.admin = tokenndata._id

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
        let { email, password, role } = req.body;
        password = await bycrypt.hash(password, 8);

        let usercreate = await ADMIN.create({
            email,
            password,
            role,
        })

        res.status(201).json({
            status: "Success",
            message: "Admin Signup Successfully",
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
            message: "Admin login Successfully",
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
        const DATA = await ADMIN.findOne({ _id: req.admin });

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
        const { email, password } = req.body;

        if (!email) throw new Error("PLease Enter newemail");
        if (!password) throw new Error("PLease Enter newpassword");

        const idcheck = await ADMIN.findById(req.params.id)
        if (!idcheck) throw new Error("Id is invalid");

        if (idcheck._id.toString() !== req.admin.toString()) throw new Error("UnauthorizedError: ID does not match.");

        const alreadexist = await ADMIN.findOne({ email })
        if (alreadexist) throw new Error("Email id is Already Exist");

        // Password = await bycrypt.hash(password, 8);

        const DATA = await ADMIN.findByIdAndUpdate(req.params.id, {
            email,
            password
        }, {
            new: true // This should be inside the options object
        });

        res.status(201).json({
            status: "Success",
            message: "Data Update Successfully",
            Updatedata: DATA,
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

        const idcheck = await ADMIN.findById(req.params.id)
        if (!idcheck) throw new Error("Id is not exist");

        if (idcheck._id.toString() !== req.admin.toString()) throw new Error("UnauthorizedError: ID does not match.");

        let Delete = await ADMIN.findByIdAndDelete(req.params.id)

        res.status(201).json({
            status: "Success",
            message: "Data Delete Successfully",
            DeleteData: Delete,
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }
}

