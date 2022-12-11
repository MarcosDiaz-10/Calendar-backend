import bcrypt from "bcryptjs";


import { generarJwt } from "../helpers/generarJwt.js";
import Usuario from "../models/Usuario.js";


export const crearUsuario = async(req, res) => {
   
    const { name,email, password } = req.body;


    try {


        const usuario = new Usuario( req.body );

       
        //Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();
        const token = await generarJwt( usuario.id, usuario.name );
        
    
        res.status(201).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });

    }

}

export const loginUsuario = async(req, res) => {
    const {  email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
       
        
        

        //Validar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y contraseña no son correctos - password'
            })
        }

        const token = await generarJwt( usuario.id, usuario.name );


        res.status(200).json({
            ok: true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    }

}

export const revalidarToken = async(req, res) => {

    const { uid, name } = req;
    
    const token = await generarJwt( uid, name );

    res.json({
        ok: true,
        token,
        usuario: {
            uid,
            name
        }
    })
}