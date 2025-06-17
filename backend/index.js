const express = require("express");
const mongoose = require("mongoose");
const ConnectDB = require("./db/db");
const dotenv = require("dotenv");
const AuthRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserRouter = require("./routes/user.routes");
dotenv.config();
const port = process.env.PORT || 3000;
ConnectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
