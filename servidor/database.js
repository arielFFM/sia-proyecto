//const MongoClient=require('mongodb').MongoClient;
const mongoose= require('mongoose');

const uri='mongodb://localhost/primeraBase';

mongoose.connect(uri,{useNewUrlParser:true})
    .then(db=> console.log('DB is conected'))
    .catch(err=> console.error(err));



module.exports=mongoose;