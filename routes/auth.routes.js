import { Router} from 'express';
import { check } from 'express-validator';


import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth.controller.js'
import {  validarEmailExiste, validarEmailNoExiste, validarJwt, validarResultado } from '../middlewares/index.js';

const router = Router();


router.post('/new', [
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña espera 6 caracteres' ).isLength({ min: 6 }),
    validarEmailExiste,
    validarResultado,
],crearUsuario );

router.post('/', [
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña espera 6 caracteres' ).isLength({ min: 6 }),
    validarResultado,
    validarEmailNoExiste
],loginUsuario );


router.get('/renew', validarJwt, revalidarToken );


export default router;
