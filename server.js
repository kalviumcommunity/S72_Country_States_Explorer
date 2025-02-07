require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cityRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use('/', cityRoutes);
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));



// Check Database Connection Status
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.json({ database: dbStatus });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
