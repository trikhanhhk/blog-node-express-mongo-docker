import { Router } from "express";
import { signin } from "../controllers/auth.controller";

const router = Router()

router.post('/auth/signin', signin)

export default router