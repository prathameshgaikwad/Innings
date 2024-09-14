interface UnsplashResponse {
  urls: {
    full: string;
    small: string;
    thumb: string;
  };
}

interface BannerUrls {
  large: string;
  small: string;
}

const fetchRandomImage = async (
  query: string,
  isBanner: boolean
): Promise<BannerUrls | string | null> => {
  try {
    const queryParams = new URLSearchParams({
      query: query,
      orientation: isBanner ? "landscape" : "portrait",
    });

    const searchString = `https://api.unsplash.com/photos/random?${queryParams}`;
    const response = await fetch(searchString, {
      headers: {
        Authorization: "Client-ID RBEtfSZkt3Pf8ce_eqmwuntl5TfzDoxG9ysnv6H4wbU", // UNSPLASH API AUTHORIZATION
      },
    });

    if (!response.ok)
      throw new Error(`Error fetching random image ${response.status}`);

    const data: UnsplashResponse = await response.json();
    const large = `${data.urls.full}&w=2000&fit=max`;
    const small = data.urls.small;
    const thumb = data.urls.thumb;

    if (isBanner) return { large, small };
    return thumb;
  } catch (error) {
    console.error("Error fetching random image from Unsplash:", error);
    return null;
  }
};

module.exports = fetchRandomImage;
