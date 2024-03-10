const generateShortName = (name) => {
  const words = name.split(" ");
  let shortName = "";

  words.forEach((word) => {
    shortName += word.charAt(0).toUpperCase();
  });

  return shortName;
};

module.exports = {
  generateShortName,
};
