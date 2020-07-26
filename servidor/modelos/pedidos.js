const mongoose= require('mongoose');
const { Schema }=mongoose;

const pedidoSquema= new Schema({
    vendedor: {type: String, required: true},    
    cliente: {type: String, required: false},
    comuna:{type: String, required: true},  
    calle:{type: String, required: true},
    nCasa:{type: Number, required: true},  
    estado: {type: String, required: true},
    fecha:{type: Date, required: true},
    producto: {type: Array, required: true},
    cantidad: {type: Array, required: true},
    metPago:{type: String, required:true},
    total:{type: Number, required:true}
});
module.exports=mongoose.model('Pedido', pedidoSquema);