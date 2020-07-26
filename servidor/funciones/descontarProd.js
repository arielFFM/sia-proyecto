const insumo= require('../modelos/insumos');
const producto= require('../modelos/productos');
const promo=require('../modelos/pack');
const mongoose=require('mongoose');
const _ = require('lodash');    

const prod={}
//____________________DESC PROMOCION_________// mod estado "entregado" pedido
prod.descPromocion=async function (cant,nom){
    var nombre=nom,
        canti=cant;
    var lPromo=[];

    await promo.findOne({nombre:nombre},(err,pack)=>{
        if(err) throw err;
        if(_.isEmpty(pack)){
            console.log("está vacio");
        }else{
            lPromo=pack;
        }
    });
    
    for(j=0;j<lPromo.producto.length;j++){
        cantTot=canti*lPromo.cantidad[j];
        await prod.descProd(cantTot,lPromo.producto[j],false);
    }
    for(j=0;j<lPromo.producto.length;j++){
        cantTot=canti*lPromo.cantidad[j];
        await prod.descIns(cantTot,lPromo.producto[j]);
    }

}
//_________________AGRE PROMOCION_________// mod estado "no entregado" pedido
prod.agrPromocion=async function (cant,nom){
    var nombre=nom,
        canti=cant;
    var lPromo=[];

    await promo.findOne({nombre:nombre},(err,pack)=>{
        if(err) throw err;
        if(_.isEmpty(pack)){
            console.log("está vacio");
        }else{
            lPromo=pack;
        }
    });
    
    for(j=0;j<lPromo.producto.length;j++){
        cantTot=canti*lPromo.cantidad[j];
        await prod.agrProd(cantTot,lPromo.producto[j],false);
    }
    for(j=0;j<lPromo.producto.length;j++){
        cantTot=canti*lPromo.cantidad[j];
        await prod.agrIns(cantTot,lPromo.producto[j]);
    }

}

//__________restar producto de pedido____________//mod estado "entregado" pedido
prod.descProd= async function(cant,nom,bool){
    var lMin=nom,
        lCant=cant;
    var lProd;
    
    await producto.findOne({nombre:lMin},(err,prod)=>{
        if (err) throw err;
        if(_.isEmpty(prod)){
            console.log('no se encontro prod');
        }else{
            lProd=prod;
        }
    })

    lProd.cantidadProd=lProd.cantidadProd-lCant;
    await producto.updateOne({_id:lProd._id},{
        cantidadProd:lProd.cantidadProd
    });
    if(bool){
        if(lProd.retornable=="true"){
            for(i=0;i<lProd.insRetorn.length;i++){
                canTot=Number(lCant)*Number(lProd.cantRetorn[i])
                await prod.agrInsRetorn(canTot,lProd.insRetorn[i])
            }
        }
    }
}
//______________sumar producto de pedido_______________//mod estado "no entregado" pedido
prod.agrProd= async function(cant,nom,bool){
    var lMin=nom,
        lCant=cant;
    var lProd;
    
    await producto.findOne({nombre:lMin},(err,prod)=>{
        if (err) throw err;
        if(_.isEmpty(prod)){
            console.log('no se encontro prod');
        }else{
            lProd=prod;
        }
    })

    lProd.cantidadProd=lProd.cantidadProd+lCant;
    await producto.updateOne({_id:lProd._id},{
        cantidadProd:lProd.cantidadProd
    });
    if(bool){
        if(lProd.retornable=="true"){
            for(i=0;i<lProd.insRetorn.length;i++){
                canTot=Number(lCant)*Number(lProd.cantRetorn[i])
                await prod.desInsRetorn(canTot,lProd.insRetorn[i])
            }
        }
    }
}
//_____________sumar insumo promo______________//mod estado "no entregado" pedido
prod.agrIns= async function(cant,nom){
    var lMin=nom,
        lCant=cant;
    var lInsu;

    await insumo.findOne({nombre:lMin},async(err,insu)=>{
        if (err) throw err;
        if(_.isEmpty(insu)){
            console.log('está vacio');
        }else{
            lInsu=insu;
            lInsu.cantidad=lInsu.cantidad+lCant;
            await insumo.updateOne({_id:lInsu._id},{
            cantidad:lInsu.cantidad});
        }
    });    
}
//_________________________restar insumo promo__________________// mod estado "entregado" pedido
prod.descIns= async function(cant,nom){
    var lMin=nom,
        lCant=cant;
    var lInsu;

    await insumo.findOne({nombre:lMin},async(err,insu)=>{
        if (err) throw err;
        if(_.isEmpty(insu)){
            console.log('está vacio');
        }else{
            lInsu=insu;
            lInsu.cantidad=lInsu.cantidad-lCant;
            await insumo.updateOne({_id:lInsu._id},{
            cantidad:lInsu.cantidad});
        }
    });    
}
//_____________________sumar insumo que retorna________________//mod estado "no entregado" pedido
prod.agrInsRetorn=async function(cant,nom){
    var lNom=nom,
        lCant=cant;
    var lInsu;

    await insumo.findOne({nombre:lNom},(err,insu)=>{
        if(err) throw err;
        if(_.isEmpty(insu)){
            console.log("no hay insumo")
        }else{
            lInsu=insu
        }
    });
    
    nCant=lInsu.cantidad+lCant
    lInsu=await insumo.updateOne({nombre:lNom},{
        cantidad:nCant
    });
}

//______________restar insumo retorn_____________//mod estado "no entregado" pedido
prod.desInsRetorn=async function(cant,nom){
    var lNom=nom,
        lCant=cant;
    var lInsu;

    await insumo.findOne({nombre:lNom},(err,insu)=>{
        if(err) throw err;
        if(_.isEmpty(insu)){
            console.log("no hay insumo")
        }else{
            lInsu=insu
        }
    });
    
    nCant=lInsu.cantidad-lCant
    lInsu=await insumo.updateOne({nombre:lNom},{
        cantidad:nCant
    });
}


module.exports=prod;