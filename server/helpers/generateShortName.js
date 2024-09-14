const abbreviate = require("abbreviate");

const generateShortName = (name) => {
  const words = name.split(" ");
  let shortName = "";

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
