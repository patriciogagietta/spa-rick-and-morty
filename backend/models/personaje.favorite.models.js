import { db } from "../database/connection.database.js"

const addPersonajeFavorite = async ({ personaje_id, personaje_name, user_id, image }) => {
    const query = {
        text: `
            INSERT INTO personaje_favorite (id, name, user_id, image)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, user_id, image
        `,
        values: [personaje_id, personaje_name, user_id, image]
    }

    try {
        const { rows } = await db.query(query)
        return rows[0]

    } catch (error) {
        console.error('Error ading favorite: ', error)
        throw error
    }
}

const getPersonajesFavorites = async ({ user_id }) => {
    const query ={
        text: `
            SELECT *
            FROM personaje_favorite
            WHERE user_id = $1
        `,
        values: [user_id]
    }

    try {
        const { rows } = await db.query(query)
        return rows

    } catch (error) {
        console.error('Error get all personajes favorites by user id: ', error)
        throw error
    }
}

const getPersonajeFavorite = async ({ personaje_id, user_id }) => {
    const query = {
        text: `
            SELECT *
            FROM personaje_favorite
            WHERE id = $1 AND user_id = $2
        `,
        values: [personaje_id, user_id]
    }

    try {
        const { rows } = await db.query(query)
        return rows[0]

    } catch (error) {
        console.error('Error get personaje favorite by id: ', error)
        throw error
    }
}

const deletePersonajeFavorite = async ({ personaje_id, user_id }) => {
    const query = {
        text: `
            DELETE FROM personaje_favorite
            WHERE id = $1 AND user_id = $2
            RETURNING id, name, user_id, image
        `,
        values: [personaje_id, user_id]
    }

    try {
        const { rows } = await db.query(query)
        return rows[0]

    } catch (error) {
        console.error('Error delete favorite: ', error)
        throw error
    }
}

export const PersonajeFavoriteModel = {
    addPersonajeFavorite,
    getPersonajesFavorites,
    getPersonajeFavorite,
    deletePersonajeFavorite
}