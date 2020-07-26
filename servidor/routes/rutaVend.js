const express=require('express');
const router=express.Router();
const modeloCliente=require('../modelos/clientes');
const modeloProductos=require('../modelos/productos');
const modeloPedidos=require('../modelos/pedidos');
const {vendAuthenticated}=require('../funciones/auth')

router.get('/index',vendAuthenticated,(req,res)=>{
    prueba=req.user.username
    res.render('intVend/indVend',{
        prueba:prueba
    });
});
router.get('/pedNoEntregados',vendAuthenticated, async (req,res)=>{
    lPedidos=await modeloPedidos.aggregate([
        {$match:{vendedor:req.user.username}
        },
        {$match:{estado:"no entregado"}
        }
    ])   //debe hacer match con fecha, no entregado y user
    title="Pedidos no entregados"
    res.render('intVend/listaPedido',{
        pedido:lPedidos,
        title:title
    });
});
router.get('/pedEntregados',vendAuthenticated, async (req,res)=>{
    lPedidos=await modeloPedidos.aggregate([
        {$match:{vendedor:req.user.username}
        },
        {$match:{estado:"entregado"}
        }
    ])   //debe hacer match con fecha, no entregado y user 
    title="Pedidos entregados"
    res.render('intVend/pedEntre',{
        pedido:lPedidos,
        title:title
    });
});

router.get('/pedNuevo',vendAuthenticated,(req,res)=>{
    modeloProductos.find({},(err,productos)=>{
        if (err){
            throw err;
        }else{
            console.log(req.user.username)
            modeloCliente.find({},(err,clientes)=>{
                if(err) throw err;
                res.render('intVend/nuevoPed',{
                producto:productos,
                vendedor:req.user.username,
                cliente:clientes,
                prueba:"lala"
            })
        });
        }      
    })    
})
module.exports=router;