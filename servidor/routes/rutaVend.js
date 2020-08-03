const express=require('express');
const router=express.Router();
const modeloCliente=require('../modelos/clientes');
const modeloProductos=require('../modelos/productos');
const modeloPedidos=require('../modelos/pedidos');
const modeloPack=require('../modelos/pack');
const {vendAuthenticated}=require('../funciones/auth');

router.get('/index',vendAuthenticated,(req,res)=>{
    prueba=req.user.username
    res.render('intVend/indVend',{
        prueba:prueba
    });
});
router.get('/pedNoEntregados',vendAuthenticated, async (req,res)=>{
    var fechaHoy= new Date();
    var fechaIn=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()-1
        ,0,59,59);  
    var fechaTer=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()
        ,23,59,59);
    lPedidos=await modeloPedidos.aggregate([
        /*{$match:{fecha:{lte:fechaTer,gte:fechaIn}}},*/
        {$match:{vendedor:req.user.username}
        },
        {$match:{estado:"no entregado"}
        }
    ]) 
    title="Pedidos no entregados"
    res.render('intVend/listaPedido',{
        pedido:lPedidos,
        title:title
    });
});
router.get('/pedEntregados',vendAuthenticated, async (req,res)=>{
    var fechaHoy= new Date();
    var fechaIn=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()-1
        ,0,59,59);  
    var fechaTer=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()
        ,23,59,59);
    lPedidos=await modeloPedidos.aggregate([
        {$match:{fecha:{$gte:fechaIn}}},
        {$match:{fecha:{$lte:fechaTer}}},
        {$match:{vendedor:req.user.username}},
        {$match:{estado:"entregado"}
        }
    ]);
    title="Pedidos entregados"
    res.render('intVend/pedEntre',{
        pedido:lPedidos,
        title:title
    });
});


router.get('/listaCliente',vendAuthenticated,(req,res)=>{
    modeloCliente.find({},(err, clientes)=>{
        if (err) throw err;
        res.render('intVend/listaClien',{
            cliente:clientes
    });
});
});
router.post('/listaCliente',vendAuthenticated,(req,res)=>{
    busq=req.body.nombre;

    modeloCliente.find({nombre:{$regex:`^${busq}`,$options:"i"}},(err, clientes)=>{
        if (err) throw err;
        res.render('intVend/listaClien',{
            cliente:clientes
    });
});
});
router.get('/pedNuevo',vendAuthenticated, async (req,res)=>{
    modeloProductos.find({}, async (err,productos)=>{
        if (err){
            throw err;
        }else{
            modeloCliente.find({}, async (err,clientes)=>{
                pack= await modeloPack.find();
                if(err) throw err;
                res.render('intVend/nuevoPed',{
                producto:productos,
                vendedor:req.user.username,
                cliente:clientes,
                pack:pack,
                redic:"",
                bool:true
            })
        });
        }      
    })    
});
router.get('/pedNuevo/:id',vendAuthenticated, async (req,res)=>{
    const {id}=req.params
    modeloProductos.find({}, async (err,productos)=>{
        if (err){
            throw err;
        }else{
            modeloCliente.find({_id:id}, async (err,clientes)=>{
                pack= await modeloPack.find();
                if(err) throw err;
                res.render('intVend/nuevoPed',{
                producto:productos,
                vendedor:req.user.username,
                cliente:clientes,
                pack:pack,
                redic:"",
                bool:false
            })
        });
        }      
    })    
});
module.exports=router;