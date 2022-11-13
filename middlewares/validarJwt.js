import jwt from 'jsonwebtoken';

export const validarJwt = ( req, res, next ) => {

    const token = req.header('x-token');

    if (!token ) {
        return res.status( 401 ).json( {
            ok: false,
            error: 'Token no existe'
        } );
    }

    try {
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED )

        req.uid = uid;
        req.name = name;
        

    } catch (error) {
        
        return res.status( 401 ).json( {
            ok: false,
            error: 'Token no valido'
        })
    }


    next();

}