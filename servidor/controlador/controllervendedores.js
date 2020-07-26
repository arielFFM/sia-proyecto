const vendedor= require('../modelos/vendedores');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);

const vendeCtrl={};

vendeCtrl.getVendedores= async (req,res)=>{
    const lVendedor= await vendedor.find();
    res.redirect('/funciones/listaVendedor')
}

vendeCtrl.createVendedor= async (req, res) =>{
    const nVendedor=new vendedor(req.body);
    console.log(nVendedor);
    await nVendedor.save();
    res.redirect('/funciones/listaVendedor')
}
vendeCtrl.getVendedor= async (req,res)=>{
    const bVendedor= await vendedor.findById(req.params.id);
    res.redirect('/funciones/listaVendedor')
}
vendeCtrl.editVendedor=async(req,res)=>{
    const { id }=req.params;
    const bVendedor=await vendedor.findById(id);
    const aVendedor={
        nombre: req.body.nombre||bVendedor.nombre,
        user:req.body.user||bVendedor.user,
        comuna: req.body.comuna||bVendedor.comuna,
        calle: req.body.calle||bVendedor.calle,
        nCasa: req.body.nCasa||bVendedor.nCasa,
        telefono: req.body.telefono||bVendedor.telefono,
        rut: req.body.rut||bVendedor.rut
    }
    await vendedor.findByIdAndUpdate(id, aVendedor,{new:true});
    res.redirect('/funciones/listaVendedor');

}
vendeCtrl.deleteVendedor=async(req,res)=>{
    await vendedor.findByIdAndDelete(req.params.id);
    res.redirect('/funciones/listaVendedor');
}
module.exports=vendeCtrl;