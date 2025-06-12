import axios from "axios";
import { apiKey } from "../constants";

// const baseUrl = "https://api.api-ninjas.com/v1/exercises";
// const rapidApiHost = "exercisedb.p.rapidapi.com";

const apiCall = async (url, params) => {
  try {
    const options = {
      method: "GET",
      url,
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // throw error;
  }
};

export const fetchExercisesByBodyPart = async (bodyPart) => {
  const url = "https://api.api-ninjas.com/v1/exercises?muscle=" + bodyPart;
  let data = await apiCall(url);
  return data;
};
