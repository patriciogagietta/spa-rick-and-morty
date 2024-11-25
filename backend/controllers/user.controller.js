import { UserModel } from "../models/user.models.js"
import { UserSchema } from "../schema/user.schema.js"

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async(req, res) => {
    const { username, email, password } = req.body

    const result = UserSchema.validateUser({ username, email, password })
    if (!result.success) {
        return res.status(400).json({
            ok: false,
            msg: result.error.issues
        })
    }

    try {
        const userEmail = await UserModel.findByEmail(email)
        if (userEmail) {
            return res.status(409).json({ ok: false, msg: 'El email ya existe' })
        }

        const userUsername = await UserModel.findByUsername(username)
        if (userUsername) {
            return res.status(409).json({ ok: false, msg: 'El usuario ya existe' })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await UserModel.createUser({ username, email, password: hashedPassword })

        const token = jwt.sign({ id: newUser.id, username: newUser.username, email: newUser.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.cookie('token', token)

        return res.status(201).json({ 
            ok: true, 
            msg: 'Usuario registrado correctamente',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    const result = UserSchema.validateLogin(req.body)
    if (!result.success) {
        return res.status(400).json({
            ok: false,
            msg: result.error.issues
        })
    }

    try {
        const user = await UserModel.findByEmail(email)
        if (!user) {
            return res.status(409).json({ ok: false, msg: 'El email no existe'})
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(409).json({ ok: false, msg: 'Contraseña incorrecta'})
        }

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.cookie('token', token)

        return res.status(201).json({
            ok: true,
            msg: 'Inicio de sesion correcto',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })

    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Error server',
        })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0)
        })

        return res.status(200).json({ ok: true, msg: 'Sesion cerrada correctamente' })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Error para cerrar sesion',
        })
    }
}

// controller para verificar cada vez que se renderiza la pagina si hay un token almacenado en las cookies
const verify = async (req, res) => {
    const { token } = req.cookies

    if (!token) {
        res.status(400).json({
            ok: false,
            msg: 'No esta autorizado'
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'No esta autorizado'
            })
        }

        const userEncontrado = await UserModel.findByEmail(user.email)
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'No esta autorizado'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Usuario encontrado',
            user: {
                id: userEncontrado.id,
                username: userEncontrado.username,
                email: userEncontrado.email
            }
        })
    })
}

export const UserController = {
    register,
    login,
    logout,
    verify
}