import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import ensureCategories from "./utils/ensureCategories.js";

import authRoutes from "./routes/auth.js";
import complaintRoutes from "./routes/complaints.js";
import categoryRoutes from "./routes/categories.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

connectDB().then(() => ensureCategories());

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});