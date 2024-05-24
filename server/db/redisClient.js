const { createClient } = require("redis");

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
  await redisClient.connect();
};
connectRedis();

module.exports = redisClient;
