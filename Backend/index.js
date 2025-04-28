const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
