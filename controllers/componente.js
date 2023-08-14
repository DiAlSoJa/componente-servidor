const {response} = require("express");
const cloudinary = require("../config/cloudinary");
const Componente = require("../models/componente");
// const Categoria = require("../models/categoria");

const crearComponente = async(req,res=response)=>{

    
    if(req.file){
        const {path,size} = req.file;
        
        if(size>=10485760){
            return res.status(400).json({msg: "No se pudo enviar porque es muy largo"});
        }
        try {
            const {public_id,secure_url} = await cloudinary.uploader.upload(path,{
                resource_type: "auto"
            });
            
            const {titulo,categorias,description,codigo} = req.body;
            
            const cloudinary_id=public_id;
            const destination=secure_url;
            const {html,style,script} = JSON.parse(codigo);
            const htmlFinal= html.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

            const componente = new Componente({titulo,categorias,description,codigo:{html:htmlFinal,style,script},cloudinary_id,destination});
            console.log(componente)
            await componente.save();

            
            return res.status(200).json({
                componente
            });

        } catch (error) {
            console.log(error);
            return res.status(400).json({msg: "No se pudo enviar"});
        }
        
    }
    return res.status(401).json({msg: "Formato no permitido"});


}


const getComponentes = async(req,res=response) =>{
    const {limite=8,desde=0} = req.query;
    
    const [ total,  componentes ] = await Promise.all([
        Componente.countDocuments(),
        Componente.find()
            .populate("categorias","nombre")
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        componentes
    });
}

const getComponente = async(req,res)=>{
    const {id} = req.params;

    const componente = await Componente.findById(id).populate("categorias","nombre");
    res.json(componente);
}

const actualizarComponente = async(req,res)=>{
    
    const {id} = req.params;
    const {titulo,categorias,description} = req.body;

    const componente= await Componente.findOne({_id:id});
    
    if(req.file){   
        const {path,size} = req.file;
        if(size>=10485760){
            return res.status(400).json({msg: "No se pudo enviar porque es muy largo"});
        }
        try {
            const {public_id,secure_url} = await cloudinary.uploader.upload(path,{
                resource_type: "auto"
            });
            if(public_id){
                await cloudinary.uploader.destroy(componente.cloudinary_id,{
                    resource_type: "image"
                });
            }

            
            componente.cloudinary_id=public_id;
            componente.destination=secure_url;

        } catch (error) {
            console.log(error);
            return res.status(400).json({msg: "fallo al actualizar imagen"});
        }
        
    }
   
    try {
        if(titulo){

            componente.titulo=titulo;
        }

        if(categorias){


            componente.categorias=categorias;
        }

        if(description){

            componente.description=description;
        }

        await componente.save();

        res.status(200).json({
            componente
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:"fallo al actualizar campos"});
    }

}

const eliminarComponente = async(req,res)=>{
    const {id} = req.params;

    try {
        const {cloudinary_id} = await Componente.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(cloudinary_id,{
            resource_type: "image"
        });
    
        res.json({
            msg: "Imagen eliminada y componentes eliminados"
        });
    
    } catch (error) {
        console.log(error);
        res.json({
            msg: "No habia imagen"
        })
    }
}

// const getComponentesPorCategoria = async(req,res=response) =>{
//     const cate = req.params.cate.toUpperCase();
//     const categorias = await Categoria.find({nombre: cate});
//     const categoria = categorias[0]._id.toString();
//     const componentes = await Componente.find({categorias: categoria}).populate("categorias","nombre");
    
    
//     res.json({
//         componentes
//     })
// }

//aqui tengo que actualizar para que actualice el la imagen en cloudinary


module.exports={
    crearComponente,
    getComponentes,
    // getComponentesPorCategoria,
    actualizarComponente,
    eliminarComponente,
    getComponente
}