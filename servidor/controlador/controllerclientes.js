const cliente= require('../modelos/clientes');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const clienCtrl={};

clienCtrl.getClientes= async (req,res)=>{
    const lClientes= await cliente.find();
    res.redirect('/funciones/listaCliente');
}

clienCtrl.createCliente= async (req, res) =>{
    const nCliente=new cliente(req.body);
    await nCliente.save();
    res.redirect('/funciones/listaCliente');
}
clienCtrl.getCliente= async (req,res)=>{
    const bCliente= await cliente.findById(req.params.id);
    res.redirect('/funciones/listaCliente');
}
clienCtrl.editCliente=async(req,res)=>{
    const { id }=req.params;
    console.log(id);
    const bCliente=await cliente.findById(id);
    const aCliente={
        nombre: req.body.nombre||bCliente.nombre,
        comuna: req.body.comuna||bCliente.comuna,
        calle: req.body.calle||bCliente.calle,
        nCasa: req.body.nCasa||bCliente.nCasa,
        fechaNac: req.body.fechaNac||bCliente.fechaNac,
        telefono: req.body.telefono||bCliente.telefono,
        rut: req.body.rut||bCliente.rut,
        bidones: req.body.bidones||bCliente.bidones,
        correo: req.body.correo||bCliente.correo,
        tipoCliente: req.body.tipoCliente||bCliente.tipoCliente
    }
    await cliente.findByIdAndUpdate(id, aCliente,{new:true});
    res.redirect('/funciones/listaCliente');
}
clienCtrl.deleteCliente=async(req,res)=>{
    await cliente.findByIdAndDelete(req.params.id);
    res.redirect('/funciones/listaCliente');
    
    }
module.exports=clienCtrl;