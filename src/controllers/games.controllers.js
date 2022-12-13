import connection from "../database/database.js";

export async function insertGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    
    return res.sendStatus(201);

  } catch (err) {
    return (
      console.log("insertGames - controllers/games.controllers.js"),
      res.sendStatus(500)
    );
  }
}

export async function listGames(req, res) {
  const { name } = req.query;
  let games;

  try {
    if (name) {
      games = await connection.query("SELECT * FROM games WHERE LOWER(name) LIKE LOWER($1) || '%';", [name]);
    } 
    else {
      games = await connection.query("SELECT * FROM games;");
    }

    return res.send(games.rows);
    
  } catch (err) {
    return (
      console.log("listGames - controllers/games.controllers.js"),
      res.sendStatus(500)
    );
  }
}