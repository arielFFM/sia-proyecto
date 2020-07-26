const { Schema, model }= require('mongoose');
const bcrypt=require('bcryptjs')
const userSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    tipo: {type:String, required:true}
});

userSchema.methods.encryptPassword= async (password)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=bcrypt.hash(password,salt);
    return hash
};
userSchema.methods.matchPassword= async function (password){
    return await bcrypt.compare(password,this.password)
}

module.exports = model('User',userSchema);