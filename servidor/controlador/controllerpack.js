const pack= require('../modelos/pack');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);

const packCtrl={};

packCtrl.createPack= async (req, res) =>{
    const nInsumo=new pack(req.body);
    await nInsumo.save();
    res.redirect('/funciones/listaPack');
}

packCtrl.editPack=async(req,res)=>{
    const { id }=req.params;
    const bPack=await pack.findById(id);
    const aPack={
        nombre: req.body.nombre||bPack.nombre,
        precio: req.body.precio||bPack.precio,
        producto:req.body.product||bPack.product,
        cantidad: req.body.cant||bPack.cant
    }
    await insumo.findByIdAndUpdate(id, aPack,{new:true});
    res.redirect('/funciones/listaPack');
}
packCtrl.deletePack=async(req,res)=>{
    await pack.findByIdAndDelete(req.params.id);
    res.redirect('/funciones/listaPack');
}
module.exports=packCtrl;