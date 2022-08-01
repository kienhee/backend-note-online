const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    title: { type: String, required: true },
    content: { type: String, required: true }
}, { collection: 'notes' });
const Notes = mongoose.model('notes', notesSchema);

module.exports = Notes