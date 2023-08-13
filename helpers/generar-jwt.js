const jwt = require("jsonwebtoken");
require("dotenv").config();

const generarJwt=(uid)=>{

    return new Promise( (resolve,reject)=>{
        
    
        jwt.sign({uid},process.env.JWT_SECRET,{
            expiresIn: "1d"
        },(err,token)=>{
            if(err){
                console.log(err);
                reject("No se pudo generar el token");
            }else{
                resolve(token);
            }
        });

    });
}
module.exports={
    generarJwt
}