require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const otpRoutes = require("./src/routes/otpRoutes");
const { SERVER_PORT } = require("./src/config/allEnv");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_, res) => res.json({ message: "It's working!" }));
app.use("/api/otp", otpRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync({ alter: true });

    const PORT = SERVER_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running locally at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

startServer();