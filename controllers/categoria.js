const {request,response} = require("express");
const Categoria = require("../models/categoria");



const crearCategoria = async(req,res=response)=>{
    
    const {nombre} = req.body;
    const nombreFinal = nombre.toUpperCase();
    const categoria = new Categoria({nombre:nombreFinal});
    
    await categoria.save();
    res.json({
        categoria
    });
}

const getCategoriaId = async(req,res=response)=>{
    const {id} = req.params;

    try {
        const categoria = await Categoria.findById(id);
    
        res.json({
            categoria
        });
        
    } catch (error) {
        res.status(401).json(error);
    }
  
}


const getCategoria = async(req,res=response)=>{
    try {
        const categorias = await Categoria.find();
    
        res.status(200).json({
      
            categorias
        });
        
    } catch (error) {
        res.status(400).json(error);
    }
  
}


const actualizarCategoria = async(req=request,res=response)=>{
    const {id} = req.params;
    const {nombre} = req.body;
    const nombreFinal = nombre.toUpperCase();

    const categoria = await Categoria.findByIdAndUpdate(id,{nombre: nombreFinal});

    res.json({
        id,
        categoria
    });
}


const eliminarCategoria = async(req,res=response)=>{
    const {id} = req.params;

    const categoria = await Categoria.findByIdAndDelete(id);
    res.json({
        categoria
    });
}


module.exports={
    crearCategoria,
    getCategoriaId,
    getCategoria,
    eliminarCategoria,
    actualizarCategoria
}