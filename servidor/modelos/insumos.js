const mongoose= require('mongoose');
const { Schema }=mongoose;

const insumoSquema= new Schema({
    nombre:{type: String, required: true},
    cantidad: {type: Number, required: true},
    precio: {type: Number, required: true}
});

module.exports=mongoose.model('Insumo', insumoSquema);