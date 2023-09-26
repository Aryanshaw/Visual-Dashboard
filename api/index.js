import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import menuRoute from "./routes/menu.js";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (e) {
    throw e;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("db disconnected");
});

//middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/menu", menuRoute);

app.listen(8000, () => {
  connect();
  console.log("http://localhost:8000");
});

app.get("/", (req, res) => {
  res.send("Hello");
});
