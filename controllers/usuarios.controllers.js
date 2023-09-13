const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const Usuario = require('../models/usuario.model');

const usuarioGet = async(req= request, res = response) => {
    //const {nombre, apellido='No name',page='1', limit="10"} = req.query

    const {desde=0, limit=5} = req.query
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        await Usuario.find(query)
                     .skip(desde)
                     .limit(limit)
    ])

    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async (req, res = response) => {
   
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Verificar si el correo existe
   

    //Encriptar la contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'Post API - Controllador',
        usuario
    });
} 

const usuarioPatch = (req, res = response) => {
    // res.send('Hello world')
    res.json({
        ok: true,
        msg: 'Patch API - Controllador'
    });
}

const usuarioPut = async(req, res = response) => {
    const id = req.params.id
    const {_id, password, google, correo, ...resto} = req.body

    // TODO: Validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'Put API - Controllador',
        usuario
    });
}

const usuarioDelete = async (req, res = response) => {
    // res.send('Hello world')
    const {id} = req.params;

    // Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    });
}


module.exports = {
    usuarioGet, 
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete
}