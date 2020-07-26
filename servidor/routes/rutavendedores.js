const express=require('express');
const router=express.Router();

const empleCtrl=require('../controlador/controllervendedores');

router.get('/',empleCtrl.getVendedores);
router.post('/',empleCtrl.createVendedor);
router.get('/:id',empleCtrl.getVendedor);
router.post('/put/:id',empleCtrl.editVendedor);
router.get('/delete/:id',empleCtrl.deleteVendedor);

module.exports=router;