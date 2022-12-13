import { Router } from "express";
import { listGames, insertGames } from "../controllers/games.controllers.js";
import { validateGame, validateGameModel } from "../middlewares/games.middlewares.js";

const route = Router();

route.get("/games", listGames);
route.post("/games", validateGameModel, validateGame, insertGames);

export default route;