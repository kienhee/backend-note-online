const jwt = require("jsonwebtoken");
function getIdUser(req) {
    let getTokenFromRequest = req.headers["authorization"];
    let token = getTokenFromRequest.split(" ")[1];
    console.log(token);
    const userId = jwt.verify(
        token,
        process.env.PRIVATE_KEY,
        function (err, res) {
            return res;
        }
    );
    console.log(userId);
    return userId.id;
}

module.exports = getIdUser;
