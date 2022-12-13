import connection from "../database/database.js";
import rentalsModel from "../models/rentals.models.js";

export async function validateRentals(req, res, next) {
  const { customerId, gameId } = req.body;
  const { error } = rentalsModel.validate(req.body);

  if (error) {
    return res.status(400).send(error.details.map((detail) => detail.message));
  }

  try {
    const gamesExist = await connection.query(
      "SELECT * FROM games WHERE id=$1",
      [gameId]
    );
    const customerExist = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [customerId]
    );
    const rentalsThisGame = await connection.query(
      `SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`,
      [gameId]
    );

    if (gamesExist.rows.length === 0) return res.sendStatus(400);

    if (customerExist.rows.length === 0) return res.sendStatus(400);

    if (rentalsThisGame.rowCount >= gamesExist.rows[0].stockTotal)
      return res.sendStatus(400);

    next();
  } catch (err) {
    return (
      console.log("validateRentals - middlewares/rentals.middlewares.js"),
      res.sendStatus(500)
    );
  }
}

export async function validateReturn(req, res, next) {
  const { id } = req.params;

  try {
    const rentalExist = await connection.query(
      "SELECT * FROM rentals WHERE id=$1",
      [id]
    );

    if (rentalExist.rows.length === 0) return res.sendStatus(404);

    if (rentalExist.rows[0].returnDate !== null) return res.sendStatus(400);

    next();
  } catch (err) {
    return (
      console.log("validateReturn - middlewares/rentals.middlewares.js"),
      res.sendStatus(500)
    );
  }
}

export async function validateDelete(req, res, next) {
  const { id } = req.params;

  try {
    const rentalExist = await connection.query(
      "SELECT * FROM rentals WHERE id=$1",
      [id]
    );

    if (rentalExist.rows.length === 0) return res.sendStatus(404);

    if (rentalExist.rows[0].returnDate === null) return res.sendStatus(400);

    next();
  } catch (err) {
    return (
      console.log("validateDelete - middlewares/rentals.middlewares.js"),
      res.sendStatus(500)
    );
  }
}
