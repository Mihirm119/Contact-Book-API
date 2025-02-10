var NEWUSER = require("../Model/user");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('profile'); // Temp storage


exports.SECURE = async function (req, res, next) {
    try {

        const token = req.headers.authorization;
        if (!token) throw new Error("PLease Attche Token");

        const isvalidtoken = jwt.verify(token, "USER");
        const tokenndata = await NEWUSER.findById(isvalidtoken.id);

        if (!tokenndata) throw new Error("USER is not valid");

        req.user = tokenndata._id

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
        let { email, password, role } = req.body;
        password = await bycrypt.hash(password, 8);

        let usercreate = await NEWUSER.create({
                email,
                password,
                profile:  req.file?.filename,
                role
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
        } else {
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

        let DATA;
        const idcheck = await NEWUSER.findById(req.params.id)
        if (!idcheck) throw new Error("Id is not exist");

        const usercheck = await NEWUSER.findOne({ _id: req.user })
        if (usercheck._id.toString() !== idcheck._id.toString()) throw new Error("UnauthorizedError: ID does not match");

        let updateFields = {};

        if (req.body.email) {
            updateFields.email = req.body.email;
        }

        if (req.body.password) {
            updateFields.password = req.body.password;
        }

        if (req.file && req.file.filename) {
            updateFields.profile = req.file.filename;
        }

        if (req.file && req.file.filename) {
            const directoryPath = path.join("..", 'CONATCT API', 'public', 'images');
            const oldImagePath = path.join(directoryPath, idcheck.profile);

            if (idcheck.profile && fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, err => {
                    if (err) console.error(`Error deleting old profile image:`, err);
                    else console.log(`Deleted old profile image: ${idcheck.profile}`);
                });

                // let updatedPassword = password;
                // if (password) {
                //     updatedPassword = await bycrypt.hash(password, 8);
                // }
            }
        }

        if (Object.keys(updateFields).length > 0) {
            DATA = await NEWUSER.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        } else {
            throw new Error("No valid fields provided for update");
        }

        res.status(200).json({
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

        let DATA;

        const idcheck = await NEWUSER.findById(req.params.id)
        if (!idcheck) throw new Error("User not found");

        const usercheck = await NEWUSER.findOne({ _id: req.user })
        if (usercheck._id.toString() !== idcheck._id.toString()) throw new Error("UnauthorizedError: ID does not match");

        const directoryPath = path.join("..", 'CONATCT API', 'public', 'images');
        const oldImagePath = path.join(directoryPath, idcheck.profile);
        if (idcheck.profile && fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, err => {
                if (err) console.error(`Error deleting old profile image:`, err);
                else console.log(`Deleted old profile image: ${idcheck.profile}`);
            });
        }

        DATA = await NEWUSER.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "Success",
            message: "Data Delete Successfully",
            data: DATA,
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        })
    }

}
