import { UserModel } from "../models/user.models.js"
import { UserSchema } from "../schema/user.schema.js"

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async(req, res) => {
    try {
        const result = UserSchema.validateUser(req.body)

        if (result.error) {
            return res.status(400).json({ ok: false, msg: result.error.issues })
        }

        const { username, email, password } = req.body

        const userUsername = await UserModel.findByUsername(username)
        if (userUsername) {
            return res.status(409).json({ ok: false, msg: 'Username already exists' })
        }

        const userEmail = await UserModel.findByEmail(email)
        if (userEmail) {
            return res.status(409).json({ ok: false, msg: 'Email already exists'})
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
            msg: 'User registered successfully',
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
    try {
        const result = UserSchema.validateLogin(req.body)

        if (result.error) {
            return res.status(400).json({ ok: false, msg: result.error.issues })
        }

        const { email, password } = req.body

        const user = await UserModel.findByEmail(email)
        if (!user) {
            return res.status(404).json({ ok: false, msg: 'Email not exists'})
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ ok: false, msg: 'Invalid password'})
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
            msg: 'Login successful',
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

        return res.status(200).json({ ok: true, msg: 'Logout successful' })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Error server',
        })
    }
}

export const UserController = {
    register,
    login,
    logout
}