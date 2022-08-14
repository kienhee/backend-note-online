const authRouter = require("./authRouter");
const noteRouter = require("./noteRouter");
const Routes = (app) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/notes", noteRouter);

    app.get("/", (req, res) => res.send("This is Kien's server 😘"));
};

module.exports = Routes;
