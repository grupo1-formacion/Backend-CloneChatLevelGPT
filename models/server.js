const express = require('express');
const cors = require('cors');

class server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            chat: '/api/chat',
        }

        this.middlewares();

        this.routes();

    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.chat , require('../routes/apiChat'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo en puerto ', this.port);
        })
    }

}

module.exports = server;
