const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const roomRoutes = require("./routes/roomRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/roomFileDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Serve uploaded files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/rooms", roomRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
