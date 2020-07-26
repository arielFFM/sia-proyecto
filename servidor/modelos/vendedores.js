const mongoose= require('mongoose');
const { Schema }=mongoose;

const vendedorSquema= new Schema({
    nombre:{type: String, required: true},
    user:{type:String, required:true},
    comuna:{type: String, required: true},  
    calle:{type: String, required: true},
    nCasa:{type: Number, required: true}, //idealmente tipo objeto
    telefono: {type: String, required: true},  //puede cambiar
    rut: {type: Number, required: true}        //puede cambiar
});

module.exports=mongoose.model('Vendedor', vendedorSquema);

//pendiente posible objeto direccion