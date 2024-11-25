import { PersonajeFavoriteModel } from "../models/personaje.favorite.models.js"
import { PersonajeFavoriteSchema } from "../schema/personaje.favorite.schema.js"

// añadir un personaje favorito
const addPersonajeFavorite = async (req, res) => {
    const { personaje_id, personaje_name, image } = req.body
    const user_id = req.user.id

    const result = PersonajeFavoriteSchema.validateAddPersonajeFavorite({ personaje_id, personaje_name, image })
    if (!result.success) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'Error in validation to add personaje favorite',
            error: result.error.issues
        })
    }

    try {
        const newPersonajeFavorite = await PersonajeFavoriteModel.addPersonajeFavorite({ personaje_id, personaje_name, user_id, image} )
        return res.status(201).json({
            ok: true,
            msg: 'Favorite add successfully',
            personaje_favorite: newPersonajeFavorite
        })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// obtener todos los personajes favoritos
const getPersonajesFavorites = async (req, res) => {
    const user_id = req.user.id

    try {
        const personajesFavotires = await PersonajeFavoriteModel.getPersonajesFavorites({ user_id })
        return res.status(201).json({
            ok: true,
            msg: 'Get all persones favorites by user id successfully',
            personaje_favorite: personajesFavotires
        })

    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error',
            error: error
        })
    }
}

// obtener un personaje favorito
const getPersonajeFavorite = async (req, res) => {
    const personaje_id = parseInt(req.params.personaje_id, 10)
    const user_id = req.user.id

    const result = PersonajeFavoriteSchema.validateGetPersonajeFavorite({ personaje_id })
    if (!result.success) {
        return res.status(400).json({ 
            ok: false,
            msg: 'Error in validation to get personaje favorite by personaje_id',
            error: result.error.issues 
        })
    }

    try {
        const personajeFavoriteById = await PersonajeFavoriteModel.getPersonajeFavorite({ personaje_id, user_id })

        if (!personajeFavoriteById) {
            return res.status(404).json({
                ok: false,
                msg: 'Personaje favorite not found'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Get personaje favorite by id successfully',
            personaje_favorite: personajeFavoriteById
        })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// eliminar un personaje favorito
const deletePersonajeFavorite = async (req, res) => {
    const personaje_id = parseInt(req.params.personaje_id, 10)
    const user_id = req.user.id

    const result = PersonajeFavoriteSchema.validateDeletePersonajeFavorite({ personaje_id })
    if (!result.success) {
        return res.status(400).json({ ok: false, msg: result.error.issues })
    }

    try {
        const deletedPersonajeFavorite = await PersonajeFavoriteModel.deletePersonajeFavorite({ personaje_id, user_id })

        if (!deletedPersonajeFavorite) {
            return res.status(404).json({
                ok: false,
                msg: 'Personaje favorite not found'
            }) 
        }

        return res.status(200).json({
            ok: true,
            msg: 'Personaje favorite deleted successfully'
        })

    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const PersonajesFavoritesController = {
    getPersonajesFavorites,
    getPersonajeFavorite,
    addPersonajeFavorite,
    deletePersonajeFavorite
}