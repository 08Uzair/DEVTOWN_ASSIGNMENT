import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dataBaseConnection } from "./db/connection.js";
import { userRouter } from "./routes/auth.js";

const app = express();
const portNumber = 8000;

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dataBaseConnection();
app.use("/api/v1/user", userRouter);
app.listen(portNumber, () => {
  console.log(`SERVER IS CONNECTED TO PORT ${portNumber}`);
});
