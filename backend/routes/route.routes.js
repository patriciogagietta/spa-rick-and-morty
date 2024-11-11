import { Router } from "express";


const router = Router();

router.post('/registro', UserController.registro)

export default router;