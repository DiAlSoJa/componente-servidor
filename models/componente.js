const {model,Schema} = require("mongoose");

const componenteSchema = new Schema({
    titulo:{type:String,required:true},
    categorias:[{type:Schema.Types.ObjectId,required:true,ref:"Categoria"}],
    codigo:{
        html:{type:String,default:null},
        style: {type:String,default:null},
        script:{type:String,default:null}
    },
    description: {type:String,required:true},
    destination:{type:String},
    cloudinary_id:{type:String}
},{
    timestamps:true
});


module.exports = model("Componente",componenteSchema);