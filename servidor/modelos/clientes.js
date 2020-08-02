const mongoose= require('mongoose');
const { Schema }=mongoose;

const clienteSquema= new Schema({
    nombre:{type: String, required: false},
    comuna:{type: String, required: true},  
    calle:{type: String, required: true},
    nCasa:{type: Number, required: true},
    fechaNac: {type: Date, required: false},     //cambiar a tipo date
    telefono: {type: Number, required: false},   //puede variar
    rut: {type: Number, required: false},        //puede varia
    bidones: {type: Number, required: false},    //idealmente tipo objeto o array
    correo: {type: String, required: false},
    tipoCliente: {type: String, required: true}
});

module.exports=mongoose.model('Cliente', clienteSquema);

//pendiente posible direccion y bidon