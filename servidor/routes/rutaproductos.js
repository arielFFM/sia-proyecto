const express=require('express');
const router=express.Router();

const prodCtrl=require('../controlador/controllerproductos');

router.get('/',prodCtrl.getProductos);
router.post('/',prodCtrl.createProducto);
router.get('/:id',prodCtrl.getProducto);
router.post('/put/:id',prodCtrl.editProducto);
router.get('/delete/:id',prodCtrl.deleteProducto);

module.exports=router;