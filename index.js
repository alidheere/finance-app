import "dotenv/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { errorHandler } from "./middlewares/errorHandle.js";
import authRouters from "./routers/auth.js";
import trasactionRouters from "./routers/transaction.js";
import dashboard from "./routers/admin.js";
import uploadRouters from "./routers/uploud.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://localhost:5173",
    "https://finance-app-pd58.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());
import helmet from "helmet";
import rateLimit from "express-rate-limit";
app.use(helmet());


// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter);
app.use("/auth", authRouters);
app.use("/admin", dashboard);
app.use("/transactions", trasactionRouters);
app.use("/", uploadRouters);
app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorHandler);

const mongoURI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PRO;

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Mongo URI exists:", !!mongoURI);

import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
mongoose
   .connect(process.env.NODE_ENV === "development"?  process.env.MONGO_URI_DEV: process.env.MONGO_URI_PRO)
  .then(() => {
    console.log(" ✅Connected to MongoDB");
  })
  .catch((err) => {
    console.log("✖️ Error connecting to MongoDB", err);
  });;

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});








