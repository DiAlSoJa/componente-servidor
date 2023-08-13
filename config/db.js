const mongoose = require("mongoose");

const dbConect = async() =>{
    try {
        await mongoose.connect("mongodb+srv://diegoalfredo83:contralocotaxd@electronicaxd.ofea1na.mongodb.net/tuFrontend",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("conectado a la base de datos");
    } catch (error) {
        console.log(error);
    }
    

}

module.exports ={
    dbConect
}