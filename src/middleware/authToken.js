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
                    if (err)
                        return res.json({
                            message: "invalid token",
                            status: false,
                        });
                    return res;
                });
                next();
            }
        } catch (error) {
            return res.json({
                message: "invalid token",
                error: error,
                status: false,
            });
        }
    }
}
module.exports = new authToken();
