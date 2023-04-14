import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT ?? 5000;

import authRoutes from "./routes/auth";
import openAiRoutes from "./routes/openAI";

const app = express();
app.use(express.json());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/openAI", openAiRoutes);

app.listen(PORT, () => {
  console.log(`mychatgpt-server listening on port ${PORT}`);
});
