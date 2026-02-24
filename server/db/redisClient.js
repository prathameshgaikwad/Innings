const { createClient } = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

const redisClient = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () =>
  console.log("Redis Client Connected! Caching is active :)")
);

const connectRedis = async () => {
  await redisClient.connect();
};
connectRedis();

module.exports = redisClient;
