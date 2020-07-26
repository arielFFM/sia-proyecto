const pedido= require('../modelos/pedidos');
const producto= require('../modelos/productos');
const pack= require('../modelos/pack');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const prod= require('../funciones/descontarProd');
const calcVal = require('../funciones/fPedidos');
const _ = require('lodash');

const pedCtrl={};

pedCtrl.getPedidos= async (req,res)=>{
    const lPedidos= await pedido.find();
    res.redirect('/funciones/listaPedido')
}

pedCtrl.createPedidos= async (req, res) =>{
    const nPedidos=new pedido(req.body);
    if(req.body.vendedor!="LOCAL"){
        precio= await calcVal.precio(req.body.producto,req.body.cantidad,true);
    }else{
        precio= await calcVal.precio(req.body.producto,req.body.cantidad,false);
    }
    nPedidos.total= await Number(precio);
    
    if (nPedidos.estado=="entregado"){
        if(!Array.isArray(req.body.cantidad)){
            await pack.findOne({nombre:req.body.producto}, async (err,product)=>{
                if(err) throw err;
                if(_.isEmpty(product)){
                    console.log("está vacio")
                }else{
                    await prod.descPromocion(req.body.cantidad,req.body.producto,false);
                }
            });
            await producto.findOne({nombre:req.body.producto}, async (err,productA)=>{
                if(err) throw err;
                if(_.isEmpty(productA)){
                    console.log("miraremos después")
                }else{
                    await prod.descProd(req.body.cantidad,req.body.producto,true);            
                }
            });
        }else{
        for(i=0;i<req.body.cantidad.length;i++){
            await pack.findOne({nombre:req.body.producto[i]}, async (err,product)=>{
                if(err) throw err;
                if(_.isEmpty(product)){
                    console.log("está vacio")
                }else{
                    await prod.descPromocion(req.body.cantidad[i],req.body.producto[i],false);
                }
            });
            await producto.findOne({nombre:req.body.producto[i]}, async (err,productA)=>{
                if(err) throw err;
                if(_.isEmpty(productA)){
                    console.log("miraremos después")
                }else{
                    await prod.descProd(req.body.cantidad[i],req.body.producto[i],true);            
                }
            });
        }
    }
    }
    await nPedidos.save();
    if (req.user.tipo=="ADMIN"){
        res.redirect('/funciones/listaPedido')
    }else{
        res.redirect('/vendedor/pedNoEntregados')
    }
}

pedCtrl.getPedido= async (req,res)=>{
    const bpedido= await pedido.findById(req.params.id);
    res.redirect('/funciones/listaPedido')
}

pedCtrl.editPedido=async(req,res)=>{
    const { id }=req.params;
    const bPedido=await pedido.findById(id);
    const precio= await calcVal.precio(req.body.producto,req.body.cantidad); 
    const aPedido={
        vendedor: req.body.vendedor||bPedido.vendedor,
        cliente: req.body.cliente||bPedido.cliente,
        comuna: req.body.comuna||bPedido.comuna,
        calle: req.body.calle||bPedido.calle,
        nCasa: req.body.nCasa||bPedido.nCasa,
        estado: req.body.estado||bPedido.estado,
        fecha: req.body.fecha||bPedido.fecha,
        producto: req.body.producto||bPedido.producto,
        cantidad: req.body.cantidad||bPedido.cantidad,
        metPago:req.body.metPago||bPedido.metPago,
        total:precio
    }
    if(req.body.estado!=bPedido.estado){
        if(req.body.estado=="entregado"){
            for(i=0;i<req.body.cantidad.length;i++){
                await pack.findOne({nombre:req.body.producto[i]}, async (err,product)=>{
                    if(err) throw err;
                    if(_.isEmpty(product)){
                        console.log("está vacio")
                    }else{
                        await prod.descPromocion(req.body.cantidad[i],req.body.producto[i],false);
                    }
                });
                await producto.findOne({nombre:req.body.producto[i]}, async (err,productA)=>{
                    if(err) throw err;
                    if(_.isEmpty(productA)){
                        console.log("hay un error")
                    }else{
                        await prod.descProd(req.body.cantidad[i],req.body.producto[i],true);            
                    }
                });
            }
        }else{
            for(i=0;i<req.body.cantidad.length;i++){
                await pack.findOne({nombre:req.body.producto[i]}, async (err,product)=>{
                    if(err) throw err;
                    if(_.isEmpty(product)){
                        console.log("está vacio")
                    }else{
                        await prod.agrPromocion(req.body.cantidad[i],req.body.producto[i],false);
                    }
                });
                await producto.findOne({nombre:req.body.producto[i]}, async (err,productA)=>{
                    if(err) throw err;
                    if(_.isEmpty(productA)){
                        console.log("hay un error")
                    }else{
                        await prod.agrProd(req.body.cantidad[i],req.body.producto[i],true);            
                    }
                });
            }
            
        }
    }
    await pedido.findByIdAndUpdate(id, aPedido,{new:true});
    res.redirect('/funciones/listaPedido')

}
pedCtrl.deletePedido=async(req,res)=>{
    await pedido.findByIdAndDelete(req.params.id);
    res.redirect('/funciones/listaPedido')
}
pedCtrl.entregarPedido=async(req,res)=>{
    const { id }=req.params;
    const bPedido=await pedido.findById(id); 
    const aPedido={
        vendedor: req.body.vendedor||bPedido.vendedor,
        cliente: req.body.cliente||bPedido.cliente,
        estado: "entregado",
        fecha: req.body.fecha||bPedido.fecha,
        producto: req.body.producto||bPedido.producto,
        cantidad: req.body.cantidad||bPedido.cantidad,
        metPago:req.body.metPago||bPedido.metPago,
        total:req.body.total||bPedido.total
    }
    for(i=0;i<bPedido.cantidad.length;i++){
        await pack.findOne({nombre:bPedido.producto[i]}, async (err,product)=>{
            if(err) throw err;
            if(_.isEmpty(product)){
                console.log("está vacio")
            }else{
                await prod.descPromocion(bPedido.cantidad[i],bPedido.producto[i],false);
            }
        });
        await producto.findOne({nombre:bPedido.producto[i]}, async (err,productA)=>{
            if(err) throw err;
            if(_.isEmpty(productA)){
                console.log("hay un error")
            }else{
                await prod.descProd(bPedido.cantidad[i],bPedido.producto[i],true);            
            }
        });
    }
    
    await pedido.findByIdAndUpdate(id, aPedido,{new:true});
    res.redirect('/vendedor/pedNoEntregados')

}


module.exports=pedCtrl;