const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: 'users' });
const User = mongoose.model('users', userSchema);

module.exports = User