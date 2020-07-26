const express=require('express');
const router=express.Router();

const invenCtrl=require('../controlador/controllerInventario');

router.post('/prod/:len',invenCtrl.actInventarioProd);  //conteo inventario
router.post('/ins/:len',invenCtrl.actInventarioIns);    //conteo inventario
router.post('/produccion/:len',invenCtrl.produccion);   //produccion
router.post('/venta/:len',invenCtrl.venta);             //venta
router.post('/compra/prod/:len',invenCtrl.compraProd);
router.post('/compra/ins/:len',invenCtrl.compraIns);

module.exports=router;