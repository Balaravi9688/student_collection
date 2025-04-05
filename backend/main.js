import express from "express";
import config from "./config/index.js";
import router from "./routes/index.js";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { createTablesIfNotExists } from "./scripts/setupDatabase.js";

const app = express();

createTablesIfNotExists();

app.use(express.json());

app.use(cors());

app.use("/api/students", router);

app.use(errorMiddleware);

app.listen(config.PORT, () => {
  console.log("App is running on the port : ", config.PORT);
});
