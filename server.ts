// server.ts
import * as express from "express";
import postsRoutes from "./routes/posts";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorHandling";
import authRoutes from "./routes/authRoutes";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

mongoose
  .connect(
    "mongodb+srv://theomax133:cpOt6s5EGAIo7ojr@cluster0.exenmvj.mongodb.net?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
export default {};

const app = express.default();

// Middleware to parse JSON bodies
app.use(express.json());

// Public routes
app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
