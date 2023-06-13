import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




import  authRouter  from './routes/auth.routes.js'
import  eventsRouter  from './routes/events.routes.js'
import { dbConnection } from './database/config.js';



//Crear servidor
const app = express();

//Conexión con la base de datos
dbConnection()
//Cors
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());


// Rutas
app.use( '/api/auth', authRouter);
app.use( '/api/events', eventsRouter );
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html')
})

app.use( '*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
})

//TODO: CRUD Eventos

//Escuchar el servidor
app.listen( process.env.PORT ?? 0, function () {
    console.clear()
    console.log( `Servidor corriendo en el puerto en http://localhost:${ this.address().port }` );
})


