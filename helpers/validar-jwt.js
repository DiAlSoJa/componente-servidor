const jwt = require("jsonwebtoken");
const {response,request} = require("express");
const admin = require("../models/admin");

const validarJwt = async(req=request,res=response,next)=>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            mensage: "No hay token"
        });
    }

    try {
        const {uid} =  jwt.verify(token,process.env.JWT_SECRET);

        const usuarioAuth = await admin.findById(uid);
        
        if(!usuarioAuth){
            
            return res.status(401).json({
                mensage: "Token || usuario no es valido"
            });
        }

        req.body.user = usuarioAuth;
        next();

    } catch (error) {
        return res.status(401).json({
            mensage: "Token no es valido"
        });
    }
}

module.exports={
    validarJwt
}
