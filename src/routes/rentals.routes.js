import { Router } from 'express';
import { validateRentals, validateReturn, validateDelete } from "../middlewares/rentals.middlewares.js";
import { listRentals, insertRentals, insertReturn, deleteRentals } from "../controllers/rentals.controllers.js";

const router = Router()

router.delete("/rentals/:id", validateDelete, deleteRentals)
router.get("/rentals", listRentals)
router.post("/rentals", validateRentals, insertRentals)
router.post("/rentals/:id/return", validateReturn, insertReturn)

export default router;