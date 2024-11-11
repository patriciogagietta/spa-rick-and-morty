import 'dotenv/config';
import express from 'express';

const app = express();

// middleware para capturar la request y detectar si tiene que hacer esa transformacion para acceder al req.body en el post
app.use(express.json());

app.use('/api/users', routes.u)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " , PORT)
})

