const _ = require("lodash");

const generateCleanString = (inputString) => {
  const trimmedString = _.trim(inputString);
  const words = _.split(trimmedString, " ");
  const capitalizedWords = words.map(_.capitalize);
  return capitalizedWords.join(" ");
};

module.exports = { generateCleanString };
