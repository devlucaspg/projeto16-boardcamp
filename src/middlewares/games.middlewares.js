import connection from "../database/database.js";
import gamesModel from "../models/games.models.js";

export function validateGameModel(req, res, next) {
  const { error } = gamesModel.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}

export async function validateGame(req, res, next) {
  const { name, categoryId } = req.body;

  try {
    const categoryExists = await connection.query(
      "SELECT * FROM categories WHERE id = $1;",
      [categoryId]
    );
    const gameExists = await connection.query(
      "SELECT * FROM games WHERE name = $1;",
      [name]
    );

    if (!categoryExists.rowCount) return res.sendStatus(400);

    if (gameExists.rowCount) return res.sendStatus(409);

    next();
  } catch (err) {
    return (
      console.log("validateGame - middlewares/games.middlewares.js"),
      res.sendStatus(500)
    );
  }
}
