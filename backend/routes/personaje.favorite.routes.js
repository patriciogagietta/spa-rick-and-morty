import { Router } from "express"
import { verifyToken } from "../middlewares/jwt.middleware.js"
import { PersonajesFavoritesController } from "../controllers/personaje.favorite.controller.js"

const router = Router()

router.get("/favorite", verifyToken, PersonajesFavoritesController.getPersonajesFavorites) //obtener favoritos
router.get("/favorite/:personaje_id", verifyToken, PersonajesFavoritesController.getPersonajeFavorite) //obtener un favorito por id
router.post("/favorite", verifyToken, PersonajesFavoritesController.addPersonajeFavorite) // añadir favoritos
router.delete("/favorite/:personaje_id", verifyToken, PersonajesFavoritesController.deletePersonajeFavorite) // eliminar un favorito por id

export default router