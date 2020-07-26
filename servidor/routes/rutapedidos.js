const express=require('express');
const router=express.Router();

const pedCtrl=require('../controlador/controllerpedidos');

router.get('/',pedCtrl.getPedidos);
router.post('/',pedCtrl.createPedidos);
router.get('/:id',pedCtrl.getPedido);
router.post('/put/:id',pedCtrl.editPedido);
router.get('/delete/:id',pedCtrl.deletePedido);
router.get('/entregar/:id',pedCtrl.entregarPedido);

module.exports=router;