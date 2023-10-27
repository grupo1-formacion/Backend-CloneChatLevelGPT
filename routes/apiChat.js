const { Router } = require('express');
const { check } = require('express-validator');
const generateDocument = require('../Controllers/apiChat');

const router = Router();

router.post('/prompt', [
    check('solicitud', 'La solicitud es necesaria').not().isEmpty(),
    check('contexto', 'El lenguaje de programación es necesaria').not().isEmpty() 
], generateDocument);


module.exports = router;