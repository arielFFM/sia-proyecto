const express=require('express');
const router=express.Router();
const modeloCliente=require('../modelos/clientes');
const modeloVendedor=require('../modelos/vendedores');
const modeloProductos=require('../modelos/productos');
const modeloInsumos=require('../modelos/insumos');
const modeloPedidos=require('../modelos/pedidos');
const modeloUser=require('../modelos/user');
const modeloPack=require('../modelos/pack');
const funPedidos=require('../funciones/fPedidos');
const _ = require('lodash');
const passport=require('passport');
const {adminAuthenticated}=require('../funciones/auth');
const {vendAuthenticated}=require('../funciones/auth');

router.get('/',(req,res)=>{
    res.render('index');
});
//-------------
router.post('/',passport.authenticate(['adminLocal','vendLocal'],
    {
        failureRedirect:'/',
        failureFlash:true
    }
),
    function(req,res){
        if(req.user.tipo=="ADMIN"){
            res.redirect('/funciones');
        }
        if(req.user.tipo=="VENDEDOR"){
            res.redirect('/vendedor/index');
        }
    }
);

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
});
//-------------
router.get('/funciones',adminAuthenticated,(req,res)=>{
    res.render('otrasRutas/funciones');
});
router.get('/funciones/pedNuevo',adminAuthenticated,(req,res)=>{
    modeloProductos.find({},(err,productos)=>{
        if (err){
            throw err;
        }else{
            modeloVendedor.find({},(err,vendedor)=>{
                if(err){
                    throw err;
                }else{
                    modeloCliente.find({}, async (err,clientes)=>{
                        pack=await modeloPack.find();
                        if(err) throw err;
                        res.render('otrasRutas/pedidoNuevo/pedNuevo',{
                        producto:productos,
                        vendedor:vendedor,
                        cliente:clientes,
                        pack:pack,
                        redic:"/funciones/menuColeccion",
                        bool:true
                    })
                })
                }
                }
            );
    }})    
});
router.get('/funciones/menuColeccion',adminAuthenticated,(req,res)=>{
    res.render('otrasRutas/colleciones/collecion');
});
//-------------------CLIENTES-----------------------------------------
router.get('/funciones/listaCliente/',adminAuthenticated,(req,res)=>{
    
    modeloCliente.find({},(err, clientes)=>{
        if (err) throw err;
        var fecha=[]
        for(i=0;i < clientes.length;i++){
            if (clientes[i].fechaNac!=null){
                fecha[i]=String(clientes[i].fechaNac.getDate())+"/"+
                String(clientes[i].fechaNac.getMonth()+1)+"/"+
                String(clientes[i].fechaNac.getFullYear());
            }
        }
        res.render('otrasRutas/colleciones/clientes/listado',{
            cliente:clientes,
            fecha:fecha
    });
});
});
router.post('/funciones/listaCliente/',adminAuthenticated,(req,res)=>{
    busq=req.body.nombre;
    modeloCliente.find({nombre:{$regex:`^${busq}`,$options:"i"}},(err, clientes)=>{
        if (err) throw err;
        var fecha=[]
    for(i=0;i < clientes.length;i++){
        if (clientes[i].fechaNac!=null){
            fecha[i]=String(clientes[i].fechaNac.getDate())+"/"+
            String(clientes[i].fechaNac.getMonth()+1)+"/"+
            String(clientes[i].fechaNac.getFullYear());
        }
    }
        res.render('otrasRutas/colleciones/clientes/listado',{
            cliente:clientes,
            fecha:fecha
    });
});

});
router.get('/funciones/crearCliente/',vendAuthenticated,(req,res)=>{
    var redic;
    if (req.user.tipo=="ADMIN"){
        redic="/funciones/menuColeccion";
    }else{
        redic='/vendedor/index';
    }
    res.render('otrasRutas/colleciones/clientes/crearCliente',{
        redic:redic
    });
});
router.get('/funciones/modifCliente/:id',adminAuthenticated,(req,res)=>{
    modeloCliente.findById(req.params.id,(err, cliente)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/clientes/modifCliente',{
            cliente:cliente,
            prueba:"lalal"
        });
});
});
//--------------------USERS---------------------------------------------
router.get('/funciones/listaUser/',adminAuthenticated,(req,res)=>{
    
    modeloUser.find({},(err, user)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/user/listado',{
            user:user
    });
});
});
router.get('/funciones/crearUser',adminAuthenticated,(req,res)=>{
    modeloVendedor.find({},(err,vend)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/user/crearUser',{
            vend:vend
        });
});
});
//------------------VENDEDORES------------------------------------------
router.get('/funciones/listaVendedor',adminAuthenticated,(req,res)=>{
    modeloVendedor.find({},(err, vendedores)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/vendedor/listaVendedor',{
            vendedor:vendedores,
            prueba:"lalal"
    });
});
});
router.get('/funciones/crearVendedor',adminAuthenticated,(req,res)=>{
    res.render('otrasRutas/colleciones/vendedor/vendedor');
});

router.get('/funciones/modifVendedor/:id',adminAuthenticated,(req,res)=>{
    modeloVendedor.findById(req.params.id,(err, vendedor)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/vendedor/modifVendedor',{
            vendedor:vendedor,
            prueba:"lalal"
        });
});
});
//------------------------PRODUCTOS-------------------------------
router.get('/funciones/listaProducto',adminAuthenticated,(req,res)=>{
    modeloProductos.find({},(err, productos)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/producto/listaProducto',{
            producto:productos,
            prueba:"lalal"
    });
});
});

router.get('/funciones/crearProducto',adminAuthenticated,(req,res)=>{
    modeloInsumos.find({},(err,nombreIns)=>{
        if(err) throw err;
        res.render('otrasRutas/colleciones/producto/producto',{
            nombre:nombreIns
        });
});
});

router.get('/funciones/modifProducto/:id',adminAuthenticated,(req,res)=>{
    modeloProductos.findById(req.params.id,(err, producto)=>{
        if (err) throw err;
        modeloInsumos.find({},(err,nombreIns)=>{
        res.render('otrasRutas/colleciones/producto/modifProducto',{
            producto:producto,
            insumo:nombreIns
        });
    });
});
});
//---------------------PACK-------------------------------
router.get('/funciones/crearPack',adminAuthenticated, async (req,res)=>{
    const listIns=await modeloInsumos.find();
    const listProd= await modeloProductos.find();
    res.render('otrasRutas/colleciones/pack/nuevoPack',{
        producto:listProd,
        insumo:listIns
    })
});

router.get('/funciones/listaPack',adminAuthenticated,(req,res)=>{
    modeloPack.find({},(err, pack)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/pack/listaPack',{
            pack:pack
    });
});
});
//--------------------INSUMOS-----------------------------
router.get('/funciones/listaInsumo',adminAuthenticated,(req,res)=>{
    modeloInsumos.find({},(err, insumos)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/insumo/listaInsumo',{
            insumo:insumos,
            prueba:"lalal"
    });
});
});
router.get('/funciones/crearInsumo',adminAuthenticated,(req,res)=>{
    res.render('otrasRutas/colleciones/insumo/insumo');
});
router.get('/funciones/modifInsumo/:id',adminAuthenticated,(req,res)=>{
    modeloInsumos.findById(req.params.id,(err, insumo)=>{
        if (err) throw err;
        res.render('otrasRutas/colleciones/insumo/modifInsumo',{
            insumo:insumo,
            prueba:"lalal"
        });
});
});
//---------------------PEDIDOS----------------------
router.get('/funciones/pedNuevo/:id',adminAuthenticated,(req,res)=>{
    const {id}=req.params;
    modeloProductos.find({},(err,productos)=>{
        if (err){
            throw err;
        }else{
            modeloVendedor.find({},(err,vendedor)=>{
                if(err){
                    throw err;
                }else{
                    modeloCliente.find({_id:id}, async (err,clientes)=>{
                        pack=await modeloPack.find();
                        if(err) throw err;
                        res.render('otrasRutas/pedidoNuevo/pedNuevo',{
                        producto:productos,
                        vendedor:vendedor,
                        cliente:clientes,
                        pack:pack,
                        redic:"/funciones/listaCliente",
                        bool:false
                    })
                })
                }
                }
            );
    }})    
});
router.get('/funciones/listaPedido',adminAuthenticated,(req,res)=>{
    var fechaHoy= new Date();
    var fechaIn=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()-1
        ,0,59,59);  
    var fechaTer=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()
        ,23,59,59);
    modeloPedidos.find({fecha:{$lte:fechaTer,$gte: fechaIn}},(err, pedidos)=>{
        if (err) throw err;
        var fecha=[]
        for(i=0;i < pedidos.length;i++){
            fecha[i]=String(pedidos[i].fecha.getDate()+1)+"/"+
            String(pedidos[i].fecha.getMonth()+1)+"/"+
            String(pedidos[i].fecha.getFullYear());
        }
        res.render('otrasRutas/colleciones/pedido/listaPedido',{
            pedido:pedidos,
            fecha:fecha
    });
});
});
router.post('/funciones/listaPedido',adminAuthenticated,(req,res)=>{
    console.log(req.body)
    var fechaIn=req.body.fechaIn; 
    var fechaTer=req.body.fechaTer;
    modeloPedidos.find({fecha:{$lte:fechaTer,$gte: fechaIn}},(err, pedidos)=>{
        if (err) throw err;
        var fecha=[]
        for(i=0;i < pedidos.length;i++){
            fecha[i]=String(pedidos[i].fecha.getDate())+"/"+
            String(pedidos[i].fecha.getMonth()+1)+"/"+
            String(pedidos[i].fecha.getFullYear());
        }
        res.render('otrasRutas/colleciones/pedido/listaPedido',{
            pedido:pedidos,
            fecha:fecha
    });
});
});

router.post('/funciones/listaPedido/direccion',adminAuthenticated,(req,res)=>{
    modeloPedidos.find({comuna:req.body.comuna,calle:req.body.calle,nCasa:req.body.nCasa},(err, pedidos)=>{
        if (err) throw err;
        var fecha=[]
        for(i=0;i < pedidos.length;i++){
            fecha[i]=String(pedidos[i].fecha.getDate())+"/"+
            String(pedidos[i].fecha.getMonth()+1)+"/"+
            String(pedidos[i].fecha.getFullYear());
        }
        res.render('otrasRutas/colleciones/pedido/listaPedido',{
            pedido:pedidos,
            fecha:fecha
    });
});
});

router.get('/funciones/modifPedido/:id',adminAuthenticated,(req,res)=>{
    modeloPedidos.findById(req.params.id,async (err, pedido)=>{
        if (err) throw err;
        productos= await modeloProductos.find();
        vendedor= await modeloVendedor.find();
        clientes= await modeloCliente.find();
        res.render('otrasRutas/colleciones/pedido/modifPedido',{
            pedido:pedido,
            producto:productos,
            vendedor:vendedor,
            cliente:clientes
        });
});
});
//------------------------------INVENTARIO-----------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//---------------------------CONTADOR INVENTARIO---------------------------------------------------------------------
router.get('/funciones/contInventario',adminAuthenticated,(req,res)=>{
    modeloProductos.find({},(err,productos)=>{
        if (err){
            throw err;
        }else{
            modeloInsumos.find({},(err,insumos)=>{
                if(err){
                    throw err;
                }else{
                    res.render('otrasRutas/inventario/contInv',{
                        producto:productos,
                        insumo:insumos,
                        prueba:"lala"
                    })
                }
                }
            );
    }})})
//------------------------------------PRODUCCION------------------------------------------------------
router.get('/funciones/produccion',adminAuthenticated,(req,res)=>{
    modeloProductos.find({tipo:"true"},(err, productos)=>{
        if (err) throw err;
        res.render('otrasRutas/inventario/produccion',{
            producto:productos,
            prueba:"lalal"
    });
});
});
//--------------------------------------VENTA------------------------------------------------------//
router.get('/funciones/venta',adminAuthenticated,(req,res)=>{
    modeloProductos.find({},(err, productos)=>{
        if (err) throw err;
        res.render('otrasRutas/inventario/venta',{
            producto:productos,
            prueba:"lalal"
    });
});
});
//------------------------------------FIN VENTA----------------------------------------------------//
//-------------------------------------COMPRA------------------------------------------------------//
router.get('/funciones/compra',adminAuthenticated,(req,res)=>{
    modeloProductos.find({tipo:'false'},(err,productos)=>{  //aquí cambiaría la busqueda
        if (err){
            throw err;
        }else{
            modeloInsumos.find({},(err,insumos)=>{
                if(err){
                    throw err;
                }else{
                    res.render('otrasRutas/inventario/compra',{
                        producto:productos,
                        insumo:insumos,
                        prueba:"lala"
                    })
                }
                }
            );
    }})})
//------------------------------------FIN COMPRA---------------------------------------------------//
//----------------------------------FIN INVENTARIO-------------------------------------------------//
//-------------------------------------------------------------------------------------------------//
//------------------------------------CONSULTAS----------------------------------------------------//
router.get('/consultas/reporte',adminAuthenticated, async(req,res)=>{
    var fechaHoy= new Date();
    var fechaIn=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()-1
        ,0,59,59);  
    var fechaTer=new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate()
        ,23,59,59);
    var pedObj= await funPedidos.vendedor(fechaIn,fechaTer);
    res.render('otrasRutas/consultas/reporte',{
        pedObj:pedObj
    });
});
router.post('/consultas/reporte',adminAuthenticated, async(req,res)=>{
    var fechaIn=new Date(req.body.fechaIn);
    var fechaTer=new Date(req.body.fechaTer);
    console.log(fechaIn)
    console.log(fechaTer)
    var pedObj= await funPedidos.vendedor(fechaIn,fechaTer);
    res.render('otrasRutas/consultas/reporte',{
        pedObj:pedObj
    });
});

module.exports=router;