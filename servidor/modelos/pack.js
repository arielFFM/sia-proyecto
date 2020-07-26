const mongoose= require('mongoose');
const { Schema }=mongoose;

const packSquema= new Schema({
    nombre:{type:String, required:true},
    precio:{type:Number, required:true},
    producto:{type:Array, required: true},
    cantidad:{type:Array, required:true}
});

module.exports=mongoose.model('Pack',packSquema);