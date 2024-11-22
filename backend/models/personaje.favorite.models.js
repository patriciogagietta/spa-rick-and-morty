import { db } from "../database/connection.database.js"

const addPersonajeFavorite = async ({ personaje_id, personaje_name, user_id }) => {
    const query = {
        text: `
            INSERT INTO personaje_favorite (personaje_id, personaje_name, user_id)
            VALUES ($1, $2, $3)
            RETURNING id, personaje_id, personaje_name, user_id
        `,
        values: [personaje_id, personaje_name, user_id]
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

const getPersonajeFavorite = async ({ id, user_id }) => {
    const query = {
        text: `
            SELECT *
            FROM personaje_favorite
            WHERE id = $1 AND user_id = $2
        `,
        values: [id, user_id]
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
            WHERE personaje_id = $1 AND user_id = $2
            RETURNING id, personaje_id, personaje_name, user_id
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