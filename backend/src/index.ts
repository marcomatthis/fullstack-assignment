import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import loansRoutes from "./routes/loansRoutes";
import crypto from "crypto";

dotenv.config();

if (!process.env.VALR_API_KEY) {
  throw new Error("VALR_API_KEY is missing in environment variables");
}

if (!process.env.VALR_SECRET) {
  throw new Error("VALR_SECRET is missing in environment variables");
}

const app = express();
const PORT = process.env.PORT || 5050;
const SECRET = process.env.SECRET || crypto.randomBytes(32).toString("hex");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

type User = {
  email: string;
};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/api", authRoutes);
app.use("/api", loansRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
