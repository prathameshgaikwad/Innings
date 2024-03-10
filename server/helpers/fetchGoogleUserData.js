const fetchGoogleUserData = async (access_token) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data from Google.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching Google user data:", error.message);
  }
};

module.exports = fetchGoogleUserData;
