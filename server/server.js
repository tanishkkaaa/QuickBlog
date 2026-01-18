import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is working" });
});

// ✅ Routes
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// ✅ Start server AFTER DB connection
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

startServer();

export default app;
