const helpers={};

helpers.adminAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.tipo=="ADMIN"){
            return next();
        }
    }
    req.flash('error_msg','No autorizado');
    res.redirect('/');
}

helpers.vendAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','No autorizado');
    res.redirect('/');
}
module.exports=helpers;