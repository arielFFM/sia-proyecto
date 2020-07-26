const producto= require('../modelos/productos');
const pedidos= require('../modelos/pedidos');
const promocion=require('../modelos/pack');
const mongoose=require('mongoose');
const _ = require('lodash');   
const calPedido={}

calPedido.precio= async (prod,cant,bool)=>{
    if(!Array.isArray(prod)){
        await producto.findOne({nombre:prod}, async (err,preProd)=>{
            if (err) throw err;
            if(_.isEmpty(preProd)){
                console.log("producto no es");
                await promocion.findOne({nombre:prod},async (err,preProm)=>{
                    if (err) throw err;
                    if(_.isEmpty(preProm)){
                        console.log("promo no es")
                    }else{
                        prec= await preProm.precio;
                        console.log(prec)
                    }
                });
            }else{
                if(bool == true){
                    if( preProd.comis == null ){
                        preProd.comis=0;
                    }
                    prec= await Number(preProd.precio)+Number(preProd.comis);
                }else{
                    prec= await Number(preProd.precio);
                }
            }
        });
        prePed=prec*cant;
        console.log(prePed)
    }else{
        iter=prod.length
        var sum=0;
        console.log(iter)
        for(j=0;j< iter ;j++){
            await producto.findOne({nombre:prod[j]},async(err,preProd)=>{
                if (err) throw err;
                if(_.isEmpty(preProd)){
                    await promocion.findOne({nombre:prod[j]},async (err,preProm)=>{
                        if(err) throw err;
                        prec= await preProm.precio
                    })
                }else{
                    if( bool == true ){
                        if(preProd.comis==null){
                            preProd.comis=0;
                        }
                        prec= await Number(preProd.precio)+Number(preProd.comis);
                    }else{
                        prec=await  Number(preProd.precio)
                    }
                }
            });
            sum+=prec*cant[j];
        }
        prePed=sum;
    }
    return prePed;
}
calPedido.vendedor= async function(fechaIn,fechaTer){
    var lisVendPed=await pedidos.aggregate([
        {$match:{
            fecha:{$lte:fechaTer}}},
        {$match:{
            fecha:{$gte:fechaIn}
        }},
        {$match:{
            estado:"entregado"
        }},
        {$group:{
            _id:{vend:"$vendedor", pago:"$metPago"},
            venTot:{$sum:"$total"},
            cantVen:{$sum: 1}
        }},
        {$addFields:{
            comXVenta:{$trunc:[{$multiply:[{$divide:["$venTot",119]},10]}, 0]}
        }},
        {$sort:{ _id:1 }

        }


    ])
    
    return lisVendPed;
}

calPedido.fecha= async function(fechaIn,fechaFin){
    var fecIn=new Date("2020, 06 , 21");
    var fecTer=new Date();
    var lped=await pedidos.find({fecha:{$lte:fecTer,$gte: fecIn}});
    //console.log(lped);
    return lped;
}

module.exports=calPedido;