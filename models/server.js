const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuarioPath = '/api/usuarios'
        
        //Conectar a base de datos
        this.conectarDb();

        //Middleware
        this.middlewares();

        //Rutas de la aplicacion
        this.routes()
    }

    async conectarDb(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuarioPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        }) 
    }
}


module.exports = Server


