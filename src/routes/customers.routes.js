import { Router } from "express";
import { validateCustomers, validateCustomersModel } from "../middlewares/customers.middlewares.js";
import { listCustomers, listCustomerById, insertCustomer, updateCustomer } from "../controllers/customers.controllers.js";

const route = Router();

route.get("/customers", listCustomers);
route.get("/customers/:id", listCustomerById);
route.post("/customers", validateCustomersModel, validateCustomers, insertCustomer);
route.put("/customers/:id", validateCustomersModel, updateCustomer);

export default route;