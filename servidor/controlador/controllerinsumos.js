const insumo= require('../modelos/insumos');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);

const insuCtrl={};

insuCtrl.getInsumos= async (req,res)=>{
    const lInsumos= await insumo.find();
    res.json(lInsumos);
}

insuCtrl.createInsumos= async (req, res) =>{
    const nInsumo=new insumo(req.body);
    await nInsumo.save();
    res.redirect('/funciones/listaInsumo');
}
insuCtrl.getInsumo= async (req,res)=>{
    const bInsumo= await insumo.findById(req.params.id);
    res.redirect('/funciones/listaInsumo');
}
insuCtrl.editInsumo=async(req,res)=>{
    const { id }=req.params;
    const bInsumo=await insumo.findById(id);
    const aInsumo={
        nombre: req.body.nombre||bInsumo.nombre,
        cantidad: req.body.cantidad||bInsumo.cantidad,
        precio: req.body.precio||bInsumo.precio
    }
    await insumo.findByIdAndUpdate(id, aInsumo,{new:true});
    res.redirect('/funciones/listaInsumo');
}
insuCtrl.deleteInsumo=async(req,res)=>{
    await insumo.findByIdAndDelete(req.params.id);
    res.redirect('/funciones/listaInsumo');
}
module.exports=insuCtrl;