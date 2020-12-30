const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// const httpsServer = require('https').createServer(app,{/*certificate*/});
const httpServer = require("http").createServer(app);

httpServer.listen(PORT, (err) => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightYellow.bold
  );
});
