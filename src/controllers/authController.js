const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
class userController {
    async signup(req, res) {
        try {
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;
            let checkEmail = await userModel.findOne({ email: email });

            if (checkEmail && checkEmail.email === email) {
                return res.json({
                    message: "Email already exists 💔",
                    status: false,
                });
            } else {
                const response = await userModel.create({
                    username,
                    email,
                    password: bcrypt.hashSync(password, salt),
                });
                return res.json({
                    message: "Create Account Success 🎉",
                    status: true,
                    email: response.email,
                    password: req.body.password,
                });
            }
        } catch (error) {
            return res.json(error);
        }
    }

    async signin(req, res) {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let user = await userModel.findOne({ email });
            if (user) {
                let comparePw = bcrypt.compareSync(password, user?.password);
                if (user?.email === email && comparePw) {
                    let username = user?.username;
                    let userId = user?.id;
                    let accessToken = jwt.sign(
                        { id: userId },
                        process.env.PRIVATE_KEY,
                        { expiresIn: "1h" }
                    );
                    return res.json({
                        message: "Login successfully 🎉",
                        status: true,
                        username,
                        accessToken,
                    });
                } else {
                    console.log(email, comparePw);
                    return res.json({
                        message: "Account or Password is incorrect 💔",
                        status: false,
                    });
                }
            } else {
                  
                return res.json({
                    message: "Account or Password is incorrect 💔",
                    status: false,
                });
            }
        } catch (error) {
            console.log({ error: error });
        }
    }
}

module.exports = new userController();
