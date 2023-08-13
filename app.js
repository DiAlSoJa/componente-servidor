const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {dbConect} = require("./config/db");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));


app.use("/admin",require("./routes/admin"));
app.use("/categoria",require("./routes/categoria"));
app.use("/componente",require("./routes/componente"));


dbConect();

console.clear();
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
