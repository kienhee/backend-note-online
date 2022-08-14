require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const Routes = require("./routes");
const connectdb = require("./config/db");
const cors = require("cors");

connectdb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Routes(app);

app.listen(PORT, () => {
    console.log(`Your server running on ${PORT} 🎉`);
});
