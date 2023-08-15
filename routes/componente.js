const {Router} = require("express");
const router = Router();
const {check} = require("express-validator");
const {uploadFiles} =require("../config/multer");
const {
    crearComponente,
    getComponentes,
    actualizarComponente,
    eliminarComponente,
    getComponente
    ,getComponentesPorCategoria} = require("../controllers/componente");

const { validarCampos} = require("../helpers/validar-campos");
const { validarJwt} = require("../helpers/validar-jwt");

const {existeCategoriaPorId,
    existeComponentePorId,
    existeCategoriaPorCate} = require("../helpers/db-validator");

const {validarImagen} =require("../helpers/validar-imagen");
// crear componentes

router.post("/",uploadFiles.single("imagenxd"),[
    validarImagen,
    check("titulo","El titulo es obligatorio").not().isEmpty(),
    check("categorias","No hay valores").isArray().custom(existeCategoriaPorId),
    check("description","Description minimo 20 maximo 100").isLength({min: 20}),
    validarJwt,
    validarCampos
],crearComponente);


//obtener componenetes
router.get("/",getComponentes);

router.get("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeComponentePorId ),
    validarCampos
],getComponente);

router.get("/c/:cate",[
    check("cate","no existe paps").custom(existeCategoriaPorCate),
    validarCampos
],getComponentesPorCategoria);



router.put("/:id",uploadFiles.single("imagenxd"),[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeComponentePorId ),
    validarJwt,
    validarCampos
],actualizarComponente);



router.delete("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeComponentePorId ),
    validarJwt,
    validarCampos
],eliminarComponente);


module.exports=router;