const redisClient = require("../db/redisClient");

const cache = (generateCacheKey) => (req, res, next) => {
  const cacheKey = generateCacheKey(req);

  try {
    const getDataFromCache = async () => {
      const data = await redisClient.get(cacheKey);
      if (data) {
        return res.status(200).send(JSON.parse(data));
      } else {
        next();
      }
    };

    getDataFromCache();
  } catch (error) {
    console.error("Error fetching data from cache:", error);
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = cache;
