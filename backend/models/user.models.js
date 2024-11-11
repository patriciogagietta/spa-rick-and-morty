import { db } from '../database/connection.database.js'

const crateUser = async ({ username, email, password }) => {

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