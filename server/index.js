const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const connectDB = require("./db/connect");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const tournamentRoutes = require("./routes/tournament");
const userRoutes = require("./routes/user");
const teamRoutes = require("./routes/teams");
const fixtureRoutes = require("./routes/fixtures");
const matchRoutes = require("./routes/matches");
const playerRoutes = require("./routes/players");

const { socketEvents } = require("./socket/events/index");

const { verifyToken } = require("./middleware/auth");
const redisClient = require("./db/redisClient");

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

// HANDLE SOCKET EVENTS
socketEvents(io);

// ROUTES
app.get("/", (req, res) => {
  res.json("Hello World!")
})
app.use("/auth", authRoutes);
app.use("/user", verifyToken, userRoutes);
app.use("/tournaments", verifyToken, tournamentRoutes);
app.use("/teams", verifyToken, teamRoutes);
app.use("/fixtures", verifyToken, fixtureRoutes);
app.use("/matches", verifyToken, matchRoutes);
app.use("/players", verifyToken, playerRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
