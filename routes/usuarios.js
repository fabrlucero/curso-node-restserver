const { Router } = require('express');
const {check} = require('express-validator');

const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuarios.controllers');
const { validarCampos } = require('../middleware/validar-campos');
const { esRolValido, esEmailValido, existeUsuarioId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol').custom(esRolValido),
    check('correo').custom(esEmailValido), 
    //scheck('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
],usuarioPost);

router.delete('/:id',[
    check('id','No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuarioDelete);

module.exports = router