const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course: {type: String, required: true},
    title: {type: String, required: true},
    instName: {type: String, required: true},
    CrHour: {type: Number, required: true},
    code: {type: String, required: true},
    description: {type: String, required: true},
    credits: {type: Number, required: true},
    stdId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true} // Ensure `Student` model is correctly referenced
});

module.exports = mongoose.model('Course', courseSchema);
