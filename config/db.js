const mongoose = require("mongoose");

const dbConect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_KEY,{
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