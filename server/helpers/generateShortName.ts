const abbreviate = require("abbreviate");

const generateShortName = (name: string): string => {
  const words: string[] = name.split(" ");
  let shortName: string = "";

  if (words.length === 2 || words.length === 3) {
    words.map((word) => {
      shortName += word.charAt(0);
    });
  } else {
    shortName = abbreviate(name, { length: 3 });
  }

  return shortName.toUpperCase();
};

module.exports = {
  generateShortName,
};
