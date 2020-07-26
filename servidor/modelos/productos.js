const mongoose= require('mongoose');
const { Schema }=mongoose;

const productoSquema= new Schema({
    nombre:{type: String, required: true},
    tipo: {type: String, required: true},    //ESTO SE IRÁ
    cantidadProd: {type: Number, required: true},
    comis:{type:Number, required:false},
    nombreIns:{type: Array, required: false},              //AQUI HAY QUE CAMBIAR
    cantidadIns: {type: Array, required: false},
    retornable:{type:String, required: true},
    insRetorn:{type: Array, required: false},              //AQUI HAY QUE CAMBIAR
    cantRetorn: {type: Array, required: false},
    precio:{type:Number, required: true}
});

module.exports=mongoose.model('Producto', productoSquema);

//pendiente posible entidad ----____-----