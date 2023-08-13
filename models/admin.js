const {model,Schema} = require("mongoose");

const adminSchema = new Schema({
    username:{type:String,required:true},
    correo:{type:String,required:true},
    password:{type:String,required:true}

},{
    timestamps:true
}
);


adminSchema.methods.toJSON= function(){
    const {password,_id,__v,...admin} = this.toObject();
    admin.uid=_id;
    return admin;
}
module.exports = model("Admin",adminSchema);