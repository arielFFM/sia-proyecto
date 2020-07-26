const producto= require('../modelos/productos');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);

const prodCtrl={};

prodCtrl.getProductos= async (req,res)=>{
    const lProductos= await producto.find();
    res.redirect('/funciones/listaProducto');
}

prodCtrl.createProducto= async (req, res) =>{
    console.log(req.body);
    const nProducto=new producto(req.body);
    console.log(nProducto);
    await nProducto.save();
    res.redirect('/funciones/listaProducto');
}
prodCtrl.getProducto= async (req,res)=>{
    const bProducto= await producto.findById(req.params.id);
    res.redirect('/funciones/listaProducto');
}
prodCtrl.editProducto=async(req,res)=>{
    const { id }=req.params;
    const bProducto=await producto.findById(id);
    const aProducto={
        nombre: req.body.nombre||bProducto.nombre,
        tipo: req.body.tipo||bProducto.tipo,
        cantidadProd: req.body.cantidadProd||bProducto.cantidadProd,
        comis:req.body.comis|| bProducto.comis,
        nombreIns: req.body.nombreIns||bProducto.nombreIns,
        cantidadIns: req.body.cantidadIns||bProducto.cantidadIns,
        retornable:req.body.retornable||bProducto.retornable,
        insRetorn: req.body.insRetorn||bProducto.insRetorn,
        cantRetorn: req.body.cantRetorn||bProducto.cantRetorn,
        precio: req.body.precio||bProducto.precio
    }
    await producto.findByIdAndUpdate(id, aProducto,{new:true});
    res.redirect('/funciones/listaProducto');

}
prodCtrl.deleteProducto=async(req,res)=>{
    await producto.findByIdAndDelete(req.params.id);
    res.redirect('/funciones/listaProducto');
}
module.exports=prodCtrl;