const _ = require("lodash");

const generateCleanString = (inputString: string): string => {
  const trimmedString: string = _.trim(inputString);
  const words: string[] = _.split(trimmedString, " ");
  const capitalizedWords: string[] = words.map(_.capitalize);
  return capitalizedWords.join(" ");
};

module.exports = { generateCleanString };
