const _ = require("lodash");

const generateCleanString = (string) => {
  const cleanedString = _.startCase(_.trim(inputString));
  return cleanedString;
};

module.exports = { generateCleanString };
