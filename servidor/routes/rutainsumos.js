const express=require('express');
const router=express.Router();

const insCtrl=require('../controlador/controllerinsumos');

router.get('/',insCtrl.getInsumos);
router.post('/',insCtrl.createInsumos);
router.get('/:id',insCtrl.getInsumo);
router.post('/put/:id',insCtrl.editInsumo);
router.get('/delete/:id',insCtrl.deleteInsumo);

module.exports=router;