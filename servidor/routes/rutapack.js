const express=require('express');
const router=express.Router();

const packCtrl=require('../controlador/controllerpack');

router.post('/',packCtrl.createPack);
router.post('/put/:id',packCtrl.editPack);
router.get('/delete/:id',packCtrl.deletePack);

module.exports=router;