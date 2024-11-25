import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './routes/user.routes.js'
import favoritesRouter from './routes/personaje.favorite.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// middleware para capturar la request y detectar si tiene que hacer esa transformacion para acceder al req.body en el post
app.use(express.json());
// middleware para leer las cookies
app.use(cookieParser())

app.use('/api/users', userRouter)
app.use('/api', favoritesRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " , PORT)
})

