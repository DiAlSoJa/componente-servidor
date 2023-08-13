const multer = require("multer");
const path = require("path");

//posiblemente tenga que dejar vacio el diskstorage
const diskStorage = multer.diskStorage({
    // destination: (req,file,callback)=>{
    //     const filePath = path.resolve(__dirname,"../img");
        
    //     callback(null,filePath);
    // },
    // filename: (req,file,callback)=>{
    //     const fileName =req.params.titulo.replaceAll(" ","-").toLowerCase();
    //     const fileExtension = path.extname(file.originalname);

    //     // const fileExtension = path.extname(file.originalname);
    //     callback(null,`${fileName}-${Date.now()}${fileExtension}`);
    // }
});

const uploadFiles = multer({
    storage:diskStorage,
    fileFilter:(req,file,cb)=>{
        const acceptedExtensions = [".jpg",".png",".mp4"];
        const fileExtension= path.extname(file.originalname);
        const isAnAcceptedExtension = acceptedExtensions.includes(fileExtension);
        if(isAnAcceptedExtension){
            cb(null,true);
        }else{
            cb(null,false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB en bytes
    }
});

module.exports={
    uploadFiles
}