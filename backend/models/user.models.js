import { db } from '../database/connection.database.js'

const createUser = async ({ username, email, password }) => {
    const query = {
        text: `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING username, email, id
        `,
        values: [username, email, password]
    }

    try {
        const { rows } = await db.query(query);
        return rows[0]

    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

const findByEmail = async (email) => {
    const query = {
        text: `
            SELECT * FROM users
            WHERE email = $1
        `,
        values: [email]
    }

    try {
        const { rows } = await db.query(query);
        return rows[0]

    } catch (error) {
        console.error('Error find user by email:', error)
        throw error
    }    
}

const findByUsername = async (username) => {
    const query = {
        text: `
            SELECT * FROM users
            WHERE username = $1
        `,
        values: [username]
    }

    try {
        const { rows } = await db.query(query);
        return rows[0]

    } catch (error) {
        console.error('Error find user by username:', error)
        throw error
    }
}

export const UserModel = {
    createUser,
    findByEmail,
    findByUsername
}