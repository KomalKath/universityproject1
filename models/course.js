
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log('Initializing Course Schema...');

const courseSchema = new Schema({
    course:{type:String, required:true},
    title:{type:String, require:true},
    instName:{type:String, required:true},
    CrHour:{type:Number, require:true},
    code:{type:String, required:true},
    description:{type:String, required:true},
    credits:{type:Number, require:true},
    // courseNumber: {type:Number, required:true},
    //instructorid: { type: mongoose.Types.ObjectId, ref: 'Instructor'},
    stdId:{ type:mongoose.Types.ObjectId,ref:'student'}

//    stdId:{ type: mongoose.Types.ObjectId,ref:'instructor',required:true},
});

console.log('Course Schema initialized:', courseSchema);

module.exports = mongoose.model('course',courseSchema);
