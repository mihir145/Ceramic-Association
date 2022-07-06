//import all predefined dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

//import custom routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const companyRoutes = require("./routes/company");
const userRoutes = require("./routes/user");
const subcategoryRoutes = require("./routes/subcategory");
const productRoutes = require("./routes/product");

//PORT and Database url
const PORT = process.env.PORT || 2022;
const DATABASE_URL =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/ceramic-association/";

//express app instance
const app = express();

//establish connection using mongoose
mongoose
  .connect(DATABASE_URL)
  .then(function () {
    console.log("DATABASE Connected!");
  })
  .catch(function (err) {
    console.log("Error in connecting DATBASE!", err);
  });

//use predefined middlewares
app.use(bodyParser.json({ limit: "50mb" })); // used to parse json data in request body
app.use(cookieParser()); // used to parse cookie header
app.use(cors()); // Cross-Origin-Resource-Sharing
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);

//Map custom Routes
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", companyRoutes);
app.use("/api", userRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", productRoutes);

/*Chat section */

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnection", () => {
    console.log("User Disconnect!");
  });
});

// Chat Section

//Home route
app.get("/", (req, res) => {
  res.send(uuid.v4());
});

//listen the server at port
app.listen(PORT, () => {
  console.log(`Server Listening At PORT ${PORT}`);
});
