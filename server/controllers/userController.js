const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;

        const checkUsername = await User.findOne({
            username
        });
        if (checkUsername) {
            return res.json({
                status: false,
                message: "Username is already registered"
            })
        }

        const checkEmail = await User.findOne({
            email
        });
        if (checkEmail) {
            return res.json({
                status: false,
                message: "Email is already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.json({
            status: true,
            user: {
                username,
                email
            }
        });

    } catch (ex) {
        next(ex);
    }
}

module.exports.login = async (req, res, next) => {

    try {

        const {
            username,
            password
        } = req.body;

        const user = await User.findOne({
            username
        });

        if (!user) {
            return res.json({
                status: false,
                message: "Please validate your credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        return res.json({
            status: true,
            user: {
                username: user.username,
                username: user.email
            }
        });

    } catch (ex) {
        next(ex);
    }
}