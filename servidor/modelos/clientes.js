const mongoose= require('mongoose');
const { Schema }=mongoose;

const clienteSquema= new Schema({
    nombre:{type: String, required: true},
    comuna:{type: String, required: true},  
    calle:{type: String, required: true},
    nCasa:{type: Number, required: true},
    fechaNac: {type: Date, required: true},     //cambiar a tipo date
    telefono: {type: Number, required: true},   //puede variar
    rut: {type: Number, required: true},        //puede varia
    bidones: {type: Number, required: true},    //idealmente tipo objeto o array
    correo: {type: String, required: true},
    tipoCliente: {type: String, required: true}
});

module.exports=mongoose.model('Cliente', clienteSquema);

//pendiente posible direccion y bidon