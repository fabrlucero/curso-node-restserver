const {response, request} = require('express')

const usuarioGet = (req= request, res = response) => {
    const {nombre, apellido='No name',page='1', limit="10"} = req.query
    res.json({
        msg: 'Get API - Controllador',
        nombre,
        apellido,
        page,
        limit
    });
}

const usuarioPost = (req, res = response) => {
    const {data} = req.body;
    res.json({
        msg: 'Post API - Controllador',
        data
    });
} 

const usuarioPatch = (req, res = response) => {
    // res.send('Hello world')
    res.json({
        ok: true,
        msg: 'Patch API - Controllador'
    });
}

const usuarioPut = (req, res = response) => {
    const id = req.params.id
    
    res.json({
        msg: 'Put API - Controllador',
        id
    });
}

const usuarioDelete = (req, res = response) => {
    // res.send('Hello world')
    res.json({
        ok: true,
        msg: 'Delete API - Controllador'
    });
}


module.exports = {
    usuarioGet, 
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete
}