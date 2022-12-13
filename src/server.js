import cors from "cors";
import chalk from "chalk";
import express from "express";
import gamesRoutes from "./routes/games.routes.js";
import rentalsRoutes from "./routes/rentals.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";




const server = express();
server.use(cors());
server.use(express.json());

server.use(categoriesRoutes);
server.use(customersRoutes);
server.use(gamesRoutes);
server.use(rentalsRoutes);

const port = process.env.PORT || 4000;
server.listen(port, () =>
  console.log(chalk.bgGreen.white.bold(`Server is running in port: ${port}`))
);
