const passport=require('passport');
const Localstrategy=require('passport-local').Strategy;

const User= require('../modelos/user')

passport.use('adminLocal',new Localstrategy({
    usernameField:'username'    
},async(username,password,done)=>{
    
    const user = await User.findOne({username:username});
    if (!user){
        return done(null,false,{message:"usuario no encontrado"});   //ver si se cambia por req.flash
    }else{
        const match=await user.matchPassword(password);
        if(match){
            
            if(user.tipo=="ADMIN"){
                
                return done(null, user);
            }else{
                return done(null,false,{message:"contraseña incorrecta"});
            }
        }else{
            done(null,false,{message:"contraseña incorrecta"});
        }
    }
}));

passport.use('vendLocal',new Localstrategy({
    usernameField:'username'    
},async(username,password,done)=>{
    const user = await User.findOne({username:username});
    if (!user){
        return done(null,false,{message:"usuario no encontrado"});   //ver si se cambia por req.flash
    }else{
        const match=await user.matchPassword(password);
        if(match){
    
            if(user.tipo=="VENDEDOR"){
        
                return done(null, user);
            }else{
                done(null,false,{message:"contraseña incorrecta"});
            }
        }else{
            done(null,false,{message:"contraseña incorrecta"});
        }
    }
}));

passport.serializeUser((user,done)=>{
    console.log("pasé por aquí")
    done(null,user.id);
});

passport.deserializeUser((user,done)=>{   //cambié user por user
    User.findById(user,(err,user)=>{
        done(err,user)
    })
})