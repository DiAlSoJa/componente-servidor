const {model,Schema} = require("mongoose");

const categoriaSchema = new Schema({
    nombre:{type: String,requied: [true,"El nombre es obligatorio"]}
});

module.exports = model("Categoria",categoriaSchema);