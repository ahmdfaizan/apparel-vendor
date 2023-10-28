import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const { ENV, DEV_PORT, PROD_PORT } = process.env;

const app: Application = express();
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("RESPONSE");
});
const PORT = ENV == "PROD" ? PROD_PORT : DEV_PORT
app.listen(PORT || 5000, () => console.log("server running", PORT || 5000));