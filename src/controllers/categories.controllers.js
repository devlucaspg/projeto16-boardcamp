import connection from "../database/database.js";

export async function insertCategories(req, res) {
  const { name } = req.body;

  if (!name) return res.sendStatus(400);

  try {
    const nameExists = await connection.query(
      "SELECT * FROM categories WHERE name = $1;",
      [name]
    );

    if (nameExists.rowCount) return res.sendStatus(409);

    await connection.query("INSERT INTO categories (name) VALUES ($1);", [
      name,
    ]);

    return res.sendStatus(201);
    
  } catch (err) {
    return (
      console.log("insertCategories - controllers/categories.controllers.js"),
      res.sendStatus(500)
    );
  }
}

export async function listCategories(req, res) {

  try {
    const categories = await connection.query("SELECT * FROM categories;");

    return res.send(categories.rows);

  } catch (err) {
    return (
      console.log("listCategories - controllers/categories.controllers.js"),
      res.sendStatus(500)
    );
  }
}