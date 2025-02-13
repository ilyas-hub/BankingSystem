const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const database = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

//Db connect
database.connect();

app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, origin || "*"); 
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  

//Routes
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);

//deployment
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING AT PORT ${PORT}`);
});
