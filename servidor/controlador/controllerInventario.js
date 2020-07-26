const insumo= require('../modelos/insumos');
const producto= require('../modelos/productos')
const mongoose=require('mongoose');
const _ = require('lodash');    

mongoose.set('useFindAndModify', false);

const invenCtrl={};

//---------------------------------ACTUALIZAR INVENTARIO---------------------------------------------------------
invenCtrl.actInventarioProd= async (req,res)=>{
    const cantProd=req.body;
    const iter=req.params.len;
    console.log(iter);
    const lProductos= await producto.find();
    
    for(i=0;i<iter;i++){
        if (iter==1){
            lProductos[i].cantidadProd=cantProd.cantidadProd;
            console.log(lProductos[i].cantidadProd);
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
    console.log(iter);
    const lInsumos= await insumo.find();
    
    for(i=0;i<iter;i++){
        if (iter==1){
            lInsumos[i].cantidad=cantIns.cantidadIns;
            console.log(lInsumos[i].cantidad);
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
    lProducto= await producto.find({tipo:"true"});
    //lInsumos= await insumo.find();
    cantProd=req.body;
    insuMin=[];   //nombre de insumo
    cantMin=[];   //nombre de insumo
    iter=req.params.len;
    for(i=0;i<iter;i++){
        lProducto[i].cantidadProd=Number(lProducto[i].cantidadProd) + Number(cantProd.cant[i]);
        insuMin[i]=lProducto[i].nombreIns;
        cantMin[i]=lProducto[i].cantidadIns;
        await producto.update({_id:lProducto[i]._id},{
            cantidadProd:lProducto[i].cantidadProd
            })
    }
    lInsu=[];
    j=0
    for(i=0;i<insuMin.length;i++){
        await insumo.findOne({nombre:insuMin[i]},(err,ins)=>{   //seguramente for anidado
            if(err) throw err;
            if( _.isEmpty(ins)){
                //console.log("vacio");
                
            }else{
                lInsu[j]= ins;
                //console.log("por aquí pasé")
                j=j+1;
        }
        })
        }
    
    console.log(lInsu.length);  
    for(k=0;k<lInsu.length;k++){
        for (i=0;i<iter;i++){
            for (j=0;j<cantMin[i].length;j++){
                
                if(lInsu[k].nombre!=insuMin[i][j]){
                    continue;
                }
                console.log("por aquí pasé")
                cantMin[i][j]=(cantMin[i][j]*cantProd.cant[i]);
                console.log(cantMin[i][j])
                lInsu[k].cantidad=lInsu[k].cantidad-cantMin[i][j]
                await insumo.update({nombre:insuMin[i][j]},{
                    cantidad:lInsu[k].cantidad
                })
            }
        }
    }
    res.redirect('/funciones/listaProducto');
}
//-----------------------------------------VENTA-----------------------------------------------------//
invenCtrl.venta= async (req,res)=>{
    lProducto= await producto.find();
    lRetor= await producto.find({retornable:"true"});
    cantProd=req.body;
    subCant=[];
    insuPlus=[];   //nombre de insumo
    cantPlus=[];
    iter=req.params.len;
    for(i=0;i<iter;i++){
        lProducto[i].cantidadProd=Number(lProducto[i].cantidadProd) - Number(cantProd.cant[i]);
        await producto.update({_id:lProducto[i]._id},{
            cantidadProd:lProducto[i].cantidadProd
            })
        if(lProducto[i].retornable=="true"){           //ojo acá
            j=0;
            subCant[j]=cantProd.cant[i];
            j=j+1;
        }
        }
    
    for(i=0;i<lRetor.length;i++){
        insuPlus[i]=lRetor[i].insRetorn;
        cantPlus[i]=lRetor[i].cantRetorn;
    }
    lInsu=[];
    for(i=0;i<insuPlus.length;i++){
        lInsu=await insumo.findOne({nombre:insuPlus[i]})
    }
    
    //___ojo___//
    for(k=0;k<lInsu.length;k++){
        for (i=0;i<lRetor.length;i++){
            for (j=0;j<cantPlus[i].length;j++){         //seguramente for anidado
                
                if(lInsu[k].nombre!=insuPlus[i][j]){
                    continue;   
                }
                console.log(subCant);
                
                cantPlus[i][j]=(cantPlus[i][j]*subCant[i]);
                console.log(cantPlus[i][j]);
                lInsu[k].cantidad=lInsu[k].cantidad+cantPlus[i][j]
                await insumo.update({nombre:insuPlus[i][j]},{
                    cantidad:lInsu[k].cantidad
                })
            }
        }
    }
    res.redirect('/funciones/listaProducto');
}
//----------------------------------------FIN VENTA---------------------------------------------------//
//------------------------------------------COMPRA----------------------------------------------------//
invenCtrl.compraProd= async (req,res)=>{
    lProducto= await producto.find({tipo:"false"});
    cantCompra=req.body;
    iter=req.params.len;
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
    lInsumo= await insumo.find();
    cantCompra=req.body;
    iter=req.params.len;
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