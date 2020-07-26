const express=require('express');
const router=express.Router();

const userCtrl=require('../controlador/controlleruser')

router.get('/',userCtrl.getUser);
router.post('/',userCtrl.createUser);
router.get('/:id',userCtrl.getUser);
router.get('/delete/:id',userCtrl.deleteUser);

module.exports=router;