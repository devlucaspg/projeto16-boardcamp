import connection from '../database/database.js';
import customersModel from '../models/customers.models.js';

export function validateCustomersModel(req, res, next) {
  const { error } = customersModel.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}

export async function validateCustomers (req, res, next) {
  const { cpf } = req.body;

  try {
    const customer = await connection.query(
      'SELECT * FROM customers WHERE cpf = $1;',
      [cpf]
    );

    if (customer.rowCount) return res.sendStatus(409);

    next();
  } catch (err) {
    return (
      console.log("validateCustomers - middlewares/customers.middlewares.js"),
      res.sendStatus(500)
    )
  }
}