import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js'

const app = express();

// middleware para capturar la request y detectar si tiene que hacer esa transformacion para acceder al req.body en el post
app.use(express.json());
// middleware para leer las cookies
app.use(cookieParser())

app.use('/api/users', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " , PORT)
})

