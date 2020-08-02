const insumo= require('../modelos/insumos');
const producto= require('../modelos/productos')
const mongoose=require('mongoose');
const _ = require('lodash');    
const dscProd= require('../funciones/descontarProd');
mongoose.set('useFindAndModify', false);

const invenCtrl={};

//---------------------------------ACTUALIZAR INVENTARIO---------------------------------------------------------
invenCtrl.actInventarioProd= async (req,res)=>{
    const cantProd=req.body;
    const iter=req.params.len;

    const lProductos= await producto.find();
    
    for(i=0;i<iter;i++){
        if (iter==1){
            lProductos[i].cantidadProd=cantProd.cantidadProd;
        
            await insumo.updateOne({_id:lProductos[i]._id},{
                cantidadProd:lProductos[i].cantidadProd
                })
        }else{
            lProductos[i].cantidadProd=cantProd.cantidadProd[i];
            await producto.update({_id:lProductos[i]._id},{
                cantidadProd:lProductos[i].cantidadProd
                })
        }
            
    } 
    res.redirect('/funciones/contInventario');
}
//_____\\
invenCtrl.actInventarioIns= async (req,res)=>{
    const cantIns=req.body;
    const iter=req.params.len;

    const lInsumos= await insumo.find();
    
    for(i=0;i<iter;i++){
        if (iter==1){
            lInsumos[i].cantidad=cantIns.cantidadIns;
        
            await insumo.updateOne({_id:lInsumos[i]._id},{
                cantidad:lInsumos[i].cantidad
                })
        }else{
            lInsumos[i].cantidad=cantIns.cantidadIns[i];
            await insumo.update({_id:lInsumos[i]._id},{
                cantidad:lInsumos[i].cantidad
                })
        }    
    } 
    res.redirect('/funciones/contInventario');
}
//-----------------------------------FIN ACTUALZAR iNVENTARIO--------------------------------------------------
/*-----------------------------------------PRODUCCION---------------------------------------------------------*/ 
invenCtrl.produccion=async (req,res)=>{
    var lProducto= await producto.find({tipo:"true"});
    var cantProd=req.body;
    var insuMin=[];   //nombre de insumo
    var cantMin=[];   //nombre de insumo
    var iter=req.params.len;
    for(i=0;i<iter;i++){
        lProducto[i].cantidadProd=Number(lProducto[i].cantidadProd) + Number(cantProd.cant[i]);
        insuMin[i]=lProducto[i].nombreIns;
        cantMin[i]=lProducto[i].cantidadIns;
        await producto.update({_id:lProducto[i]._id},{
            cantidadProd:lProducto[i].cantidadProd
            })
    }
    for(i=0;i<insuMin.length;i++){
        if(cantProd.cant[i]>0){
            for(j=0;j<insuMin[i].length;j++){
                canTot=cantProd.cant[i]*cantMin[i][j];
                await dscProd.descIns(canTot,insuMin[i][j]);
            }
        }
    }
    
    res.redirect('/funciones/produccion');
}
//-----------------------------------------VENTA-----------------------------------------------------//
invenCtrl.venta= async (req,res)=>{
    var lProducto= await producto.find();
    var cantProd=req.body;
    var subCant=[];
    var insuPlus=[];   //nombre de insumo
    var cantPlus=[];
    var iter=req.params.len;
    var j=0;
    for(i=0;i<iter;i++){
        lProducto[i].cantidadProd=Number(lProducto[i].cantidadProd) - Number(cantProd.cant[i]);
        if(lProducto[i].retornable=="true"){
            subCant[j]=cantProd.cant[i];
            insuPlus[j]=lProducto[i].insRetorn;
            cantPlus[j]=lProducto[i].cantRetorn;
            j=j+1;
        }
        await producto.update({_id:lProducto[i]._id},{
            cantidadProd:lProducto[i].cantidadProd
            });
    }
    for(i=0;i<insuPlus.length;i++){
        for(j=0;j<insuPlus[i].length;j++){
            console.log(insuPlus[i][j])
            canTot=subCant[i]*cantPlus[i][j];
            await dscProd.agrInsRetorn(canTot,insuPlus[i][j]);
        }
    }

    res.redirect('/funciones/listaProducto');
}
//----------------------------------------FIN VENTA---------------------------------------------------//
//------------------------------------------COMPRA----------------------------------------------------//
invenCtrl.compraProd= async (req,res)=>{
    var lProducto= await producto.find({tipo:"false"});
    var cantCompra=req.body;
    var iter=req.params.len;
    for(i=0;i<iter;i++){
        lProducto[i].cantidadProd=Number(lProducto[i].cantidadProd) + Number(cantCompra.cant[i]);

        await producto.update({_id:lProducto[i]._id},{
            cantidadProd:lProducto[i].cantidadProd
            })
    }
    res.redirect('/funciones/compra');
}
//___//
invenCtrl.compraIns= async (req,res)=>{
    var lInsumo= await insumo.find();
    var cantCompra=req.body;
    var iter=req.params.len;
    for(i=0;i<iter;i++){
        lInsumo[i].cantidad=Number(lInsumo[i].cantidad) + Number(cantCompra.cant[i]);

        await insumo.update({_id:lInsumo[i]._id},{
            cantidad:lInsumo[i].cantidad
            })
    }
    res.redirect('/funciones/compra');
} 
//----------------------------------------FIN COMPRA--------------------------------------------------//
module.exports=invenCtrl;