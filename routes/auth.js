const { Router } = require("express");
const { crearUsuario, deleteUsuario, updateUsuario, loginUsuario, allUsuario } = require("../controllers/auth");
const { validarDatosUsuario, validarDatosUsuario2 } = require("../controllers/validations/crearUsuarios")
const { requireCodigo, requireLogin } = require("../controllers/validations/login")
const router = Router();

router.post("/new", validarDatosUsuario, crearUsuario);
router.delete("/delete", requireCodigo, deleteUsuario);
router.put("/update", validarDatosUsuario2, updateUsuario);
router.post("/", requireLogin, loginUsuario);
router.get("/",  allUsuario);



module.exports = router