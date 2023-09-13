const Role = require('../models/role.model');
const Usuario = require('../models/usuario.model');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const esEmailValido = async (correo='') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error("El correo ya esta registrado");
    }
}

const existeUsuarioId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    esEmailValido,
    existeUsuarioId
}