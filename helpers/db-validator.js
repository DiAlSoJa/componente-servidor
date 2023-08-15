const Categoria = require("../models/categoria");
const Admin = require("../models/admin");
const Componente = require("../models/componente");
// const File = require("../models/file");


const existeCategoriaPorId = async(id)=>{
    const existeCategoria = await Categoria.findById(id);
    
    if(!existeCategoria) throw new Error(`La categoria id=${existeCategoria}`);
}

const existeCategoriaPorCate = async(cate="")=>{

    const existeCategoria = await Categoria.findOne({nombre: cate.toUpperCase()});
    if(existeCategoria.length===0)throw new Error(`La categoria=${cate} no existe pendejo`);
}




const existeAdminPorId = async(id)=>{
    const existeAdmin = await Admin.findById(id);

    if(!existeAdmin) throw new Error(`El admin id=${id} no existe`);
}


const existeComponentePorId = async(id)=>{
    const existeComponente = await Componente.findById(id);

    if(!existeComponente) throw new Error(`El componente id=${id} no existe`);
}
// const existeImagenPorId = async(id)=>{
//     const existeImagen = await File.find({componente:id});
    
//     if(!existeImagen) throw new Error(`El componente id=${id} no existe`);
// }
module.exports = {
    existeCategoriaPorId,
    existeAdminPorId,
    existeComponentePorId,
    existeCategoriaPorCate
}