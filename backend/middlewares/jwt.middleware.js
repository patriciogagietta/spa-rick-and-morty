import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    let { token } = req.cookies

    if (!token) {
        return res.status(401).json({ ok: false, msg: 'Token not provided'})
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = user

        next()
    } catch {
        return res.status(400).json({ ok: false, msg: 'Invalid token' })
    }
}