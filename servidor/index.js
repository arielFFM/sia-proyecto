const path = require('path');
const express=require('express');
const morgan=require('morgan');
const app=express();
const bodyParser=require('body-parser');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');

require('./database');   //ojo con esto
require('./funciones/passport');
// Configuraciones
app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'views'))); //laborro
app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables gloables
app.use((req,res,next)=>{
    res.locals.succes_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})
// Routes
app.use('',require('./routes/rutaMain'));
app.use('/vendedor', require('./routes/rutaVend'))
// Routes fun abcm
app.use('/api/inventario',require('./routes/rutaInvetario'))
app.use('/api/vendedores',require('./routes/rutavendedores'));
app.use('/api/clientes',require('./routes/rutaclientes'));
app.use('/api/insumos',require('./routes/rutainsumos'));
app.use('/api/pedidos',require('./routes/rutapedidos'));
app.use('/api/productos',require('./routes/rutaproductos'));
app.use('/api/pack',require('./routes/rutapack'));
app.use('/api/user',require('./routes/rutaUser'));
//app.use('api/consultas',require('./routes/rutaConsulta')); //AUN NO LO USO PARA NADA
// Starting the server
app.listen(app.get('port'), () =>{
    console.log("server on port",app.get('port'));
});