import axios from "axios";

// The cors-anywhere server is a proxy that adds CORS headers to a request.
// A temporary fix before building own proxy server
const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com";

// Base URL for word dictionary endpoint
const baseUrl = "app.linkedin-reach.io/words";

const getWordList = async () => {
  try {
    const response = await axios.get(`${corsAnywhereUrl}/${baseUrl}`);

    return response.data;
  } catch (error) {
    return false;
  }
};

export { getWordList };
