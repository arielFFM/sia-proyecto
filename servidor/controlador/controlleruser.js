const user= require('../modelos/user');
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const userCtrl={};

userCtrl.getUser= async (req,res)=>{
    const lUser= await user.find();
    res.redirect('/funciones/listaUser');
}

userCtrl.createUser= async (req, res) =>{
    const nUser=new user(req.body);
    nUser.password=await nUser.encryptPassword(req.body.password)
    console.log(nUser);
    await nUser.save();
    res.redirect('/funciones/listaUser');
}
userCtrl.getUser= async (req,res)=>{
    const bUSer= await user.findById(req.params.id);
    res.redirect('/funciones/listaUser');
}

userCtrl.deleteUser=async(req,res)=>{
    await user.findByIdAndDelete(req.params.id);
    res.redirect('/funciones/listaUser');
    
    }
module.exports=userCtrl;