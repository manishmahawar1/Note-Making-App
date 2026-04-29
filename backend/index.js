import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.route.js";
import connectDB from "./config/database.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

//database connection
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  }),
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// for reading cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Routes
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/user", userRouter);

// Global error
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong on server",
    error: err.message,
  });
});
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
