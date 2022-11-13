import Evento from "../models/Evento.js";



export const getEventos = async( req, res ) => {


    try {

        const eventos = await Evento.find().populate('user','name');
        return res.status(200).json({eventos});


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    }

}


export const crearEvento = async( req, res ) => {


    const evento = new Evento( req.body);

    try {

       
        evento.user = req.uid;

        const eventoDb = await evento.save();

        res.json({
            ok: true,
            evento: eventoDb

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    }


   
}

export const actualizarEvento = async( req, res ) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    const query = {...req.body, user: uid };

    try {

        const evento = await Evento.findById(eventoId);
        
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No puedes actualizar el evento'
            });
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, query, { new: true } );

        
        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    }


}

export const eliminarEvento = async( req, res ) => {


    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoId);
        
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No puedes actualizar el evento'
            });
        }
        
        await Evento.findByIdAndDelete( eventoId);

        
        res.json({
            ok: true
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    }
} 