const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://kienhee:30102002@cluster0.tuuuw.mongodb.net/notepad`);
        console.log("Connect to db 🎉");
    } catch (error) {

        console.log("Connect faild to db 💔", error);
    }
}
module.exports = connection