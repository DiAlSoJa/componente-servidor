const {Router} = require("express");
const router = Router();
const {check} = require("express-validator");
const {existeAdminPorId} = require("../helpers/db-validator");
const {crearAdmin,getAdmin,getMe,iniciarSesion,actualizarAdmin,eliminarAdmin} = require("../controllers/admin");
const {validarCampos} = require("../helpers/validar-campos");
const {validarJwt} = require("../helpers/validar-jwt");



router.post("/crearadmin",
    check("username","el username es obligatorio").not().isEmpty(),
    check("correo","el correo no es valido").isEmail(),
    check("password","el password es obligatorio").not().isEmpty(),
    validarJwt,
    validarCampos
,crearAdmin);

router.post("/iniciarsesion",
    check("correo","el correo no es valido").isEmail(),
    check("password","el password es obligatorio").not().isEmpty(),
    validarCampos
,iniciarSesion);


//falta el get admins

router.get("/",
    validarJwt
,getAdmin);

/// get me admin
router.get("/me",[
    validarJwt
],getMe);

//falta jwt -----
router.put("/:id",[
    check("username","El nombre es obligatorio").not().isEmpty(),
    check("correo","El correo es obligatorio").isEmail(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeAdminPorId ),
    validarCampos
],actualizarAdmin);

//falta jwt
router.delete("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeAdminPorId ),
    validarCampos
],eliminarAdmin);



module.exports=router;