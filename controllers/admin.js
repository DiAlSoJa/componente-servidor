const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

const {generarJwt} = require("../helpers/generar-jwt");
//////////////////////////////////////////
const crearAdmin = async(req,res)=>{

    const {username,correo,password} = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const admin = new Admin({username,correo,password:hashedPassword});

    await admin.save();

    // por el momento los admins solo los voy a crear yo,
//Entonces no es necesario enviar un token

    res.json({
        admin
    });
}

//////////////////////////////////////////////////
const getAdmin = async(req,res)=>{
    const { limite = 8, desde = 0 } = req.query;

    const [ total,admins ] = await Promise.all([
        Admin.countDocuments(),
        Admin.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        admins
    });
}
//////////////////////////////////////////////////
const getMe = async(req,res)=>{
    const { _id,username,correo } = req.body.user;


    res.json({
        _id,
        username,
        correo
    });
}
/////////////////////////////////////7777
const iniciarSesion= async(req,res) =>{
    const {correo,password} = req.body;


    const user = await Admin.findOne({correo});
    
    if(!user  ){
        return res.status(400).json({
            mensage:"Credenciales invalidas"
        });
    }
    const validPassword = await bcrypt.compare(password,user.password);

    if( !validPassword){
        return res.status(400).json({
            mensage:"Credenciales invalidas"
        });
    }
    const token= await generarJwt(user._id);

    res.json({
        msg: "ok",
        user,
        token
    });
}

const actualizarAdmin = async(req,res)=>{
    const {id} = req.params;
    const {username,correo} = req.body;

    const admin = await Admin.findByIdAndUpdate(id,{username,correo});

    res.json({
        id,
        admin
    });
}

const eliminarAdmin = async(req,res)=>{
    const {id} = req.params;

    const admin= await Admin.findByIdAndDelete(id);
    res.json({
        admin
    });
}


module.exports={
    crearAdmin,getAdmin,getMe,iniciarSesion,actualizarAdmin,eliminarAdmin
}