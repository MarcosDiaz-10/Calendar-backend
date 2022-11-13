import { Router} from 'express';
import { check } from 'express-validator';
import { getEventos, crearEvento, actualizarEvento, eliminarEvento } from '../controllers/events.controller.js';
import { isDate } from '../helpers/isDate.js';
import { validarJwt, validarResultado } from '../middlewares/index.js';



const router = Router();

router.use( validarJwt )

router.get('/',  getEventos )

router.post('/',[
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
    validarResultado
],  crearEvento  )


router.put('/:id', [
    check('id', 'tiene que ser un id de mongo').isMongoId(),
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
    validarResultado
],actualizarEvento  )

router.delete('/:id',[
    check('id', 'tiene que ser un id de mongo').isMongoId(),
    validarResultado
],eliminarEvento)


export default router;
