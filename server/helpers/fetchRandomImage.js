const fetchRandomImage = async (query, isBanner) => {
  try {
    const queryParams = new URLSearchParams({
      query: query,
      orientation: isBanner ? "landscape" : "portrait",
    });

    const searchString = `https://api.unsplash.com/photos/random?${queryParams}`;
    const response = await fetch(searchString, {
      headers: {
        Authorization: "Client-ID RBEtfSZkt3Pf8ce_eqmwuntl5TfzDoxG9ysnv6H4wbU",
      },
    });

    if (!response.ok)
      throw new Error(`Error fetching random image ${response.status}`);

    const data = await response.json();
    if (isBanner) return data.urls.full;
    return data.urls.small;
  } catch (error) {
    console.error("Error fetching random image from Unsplash:", error);
    return null;
  }
};

module.exports = fetchRandomImage;
