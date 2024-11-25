import { z } from "zod"

// schema para la validacion de agregar un personaje favorito
const addPersonajeFavoriteSchema = z.object({
    personaje_id: z
        .number({ required_error: "El id del personaje es requerido" })
        .int({ message: "El id del personaje debe ser un número entero" }),
    personaje_name: z
        .string({ required_error: "El nombre del personaje es requerido" })
        .min(1, { message: "El nombre del personaje no puede estar vacío" }),
    image: z
        .string({ required_error: "La imagen del personaje es requerida" })
})

// schema para la validacion de obtener un personaje favorito
const getPersonajeFavoriteSchema = z.object({
    id: z
        .number({ required_error: "El id del personaje favorito es requerido" })
        .int({ message: "El id debe ser un número entero" })
})

// schema para la validacion de eliminar un personaje favorito
const deletePersonajeFavoriteSchema = z.object({
    personaje_id: z
        .number({ required_error: "El id del personaje es requerido" })
        .int({ message: "El id del personaje debe ser un número entero" })
})

const validateAddPersonajeFavorite = (object) => {
    return addPersonajeFavoriteSchema.safeParse(object)
}

const validateGetPersonajeFavorite = (object) => {
    return getPersonajeFavoriteSchema.safeParse(object)
}

const validateDeletePersonajeFavorite = (object) => {
    return deletePersonajeFavoriteSchema.safeParse(object)
}

export const PersonajeFavoriteSchema = {
    validateAddPersonajeFavorite,
    validateGetPersonajeFavorite,
    validateDeletePersonajeFavorite
}
