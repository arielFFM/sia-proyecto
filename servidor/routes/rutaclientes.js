const express=require('express');
const router=express.Router();

const clienCtrl=require('../controlador/controllerclientes');

router.get('/',clienCtrl.getClientes);
router.post('/',clienCtrl.createCliente);
router.get('/:id',clienCtrl.getCliente);
router.post('/put/:id',clienCtrl.editCliente);
router.get('/delete/:id',clienCtrl.deleteCliente);

module.exports=router;