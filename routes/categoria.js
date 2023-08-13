const {Router} = require("express");
const router = Router();
const {check} = require("express-validator");
const {existeCategoriaPorId} = require("../helpers/db-validator");
const {crearCategoria,getCategoria,getCategoriaId,eliminarCategoria,actualizarCategoria} = require("../controllers/categoria");
const {validarCampos} = require("../helpers/validar-campos");
const { validarJwt } = require("../helpers/validar-jwt");
//crear componentes


//tambien ver que no se repita el nombre
router.post("/",
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    validarJwt,
    validarCampos
,crearCategoria);


router.put("/:id",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarJwt,
    validarCampos
],actualizarCategoria);



router.delete("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarJwt,
    validarCampos
],eliminarCategoria);

router.get("/",[
    
],getCategoria);



router.get("/:id",[
    check('id').custom( existeCategoriaPorId),
    validarCampos
],getCategoriaId);



module.exports=router;