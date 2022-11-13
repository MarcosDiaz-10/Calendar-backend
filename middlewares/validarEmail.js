import Usuario from "../models/Usuario.js";

export const validarEmailExiste = async( req, res, next) => {
    const { email } = req.body;
    

    let usuario = await Usuario.findOne({  email });

    if( usuario ) {
        return res.status(400).json({
            ok: false,
            error: "Usuario ya existe",
        });
    }


    next();

}

export const validarEmailNoExiste = async( req, res, next) => {

    const { email } = req.body;
    

    let usuario = await Usuario.findOne({  email });

    if( !usuario ) {
        return res.status(400).json({
            ok: false,
            error: "Usuario y contraseña no son correctos - email",
        });
    }


    next();


}