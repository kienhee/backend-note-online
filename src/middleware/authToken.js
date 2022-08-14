const jwt = require("jsonwebtoken");
class authToken {
    verifyToken(req, res, next) {
        try {
            let getTokenFromRequest = req.headers["authorization"];
            let token = getTokenFromRequest.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "token is valid", status: false });
            } else {
                jwt.verify(token, process.env.PRIVATE_KEY, function (err, res) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            message: "invalid token",
                            status: false,
                        });
                    } else {
                        return res;
                    }
                });
                next();
            }
        } catch (error) {
            console.log(error);
            return res.json({
                message: "invalid token",
                status: false,
            });
        }
    }
}
module.exports = new authToken();
