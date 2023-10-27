require('dotenv').config();

const Server = require('./models/server');

const serverInit = new Server();

serverInit.listen();