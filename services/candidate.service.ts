import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldC5jaGF2YW5AY29kaXRhcy5jb20iLCJhY2Nlc3NUb2tlbiI6InlhMjkuYTBBV1k3Q2tuUzZlNmFObFNlSFAweHFkRXB4Rld0UC1tREtoNFhoUXV4cW93bWRvdFh4X25mSlhfZ1d6TUVNV012SDNReGF0V2llWHhtWlZTWVZSVkRORlp6WW0yMWFLazlCczk2dVZ1ck1BS2xMSXJPTHhGLWx2QW9TZlV5YWtYU1N6SURwQ2JMU09reUNsVzRsM2tvSDhrY2JlZDZhQ2dZS0FhRVNBUkVTRlFHMXREcnB6UW95TzVyLXBScGlvRm5IT2FfRTJnMDE2MyIsImZyZXNoTG9naW4iOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZW1wbG95ZWVJZCI6MTEwOTgsInJvbGUiOiJUQSIsInVzZXJJbWFnZVVybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGIxYklZd0JfQW85RWNpTkcxQ0t4NGhZLVBNTFZKd3k2RFd0TWZGPXM5Ni1jIiwiaWF0IjoxNjgzMTEzNTY4LCJleHAiOjE3MTQ2NDk1Njh9.yEEPl4FBWl3rQGyHc76IU_-PVl_hq4M5fRFgchbDcNM";
export const getCandidatesData = async (params?: any) => {
  console.log(params)
  try {
    const response = await axios.post(
      `https://2616-115-160-223-174.ngrok-free.app/candidate/getAllCandidates`,
      params ? params : {},
      {
        headers: {
          authorization: token,
          "ngrok-skip-browser-warning": "skip-browser-warning",
          "Content-type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error
  }
};

export const getFilter = async () => {
  try {
    const response = await axios.get(
      `https://2616-115-160-223-174.ngrok-free.app/filters/getAllFilters`,
      {
        headers: {
          authorization: token,
          "ngrok-skip-browser-warning": "skip-browser-warning",
          "Content-type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addCandidates = async (params?:any) => {
  try {
    const response = await axios.post(
      `https://2616-115-160-223-174.ngrok-free.app/candidate/createCandidate`,params,
      {
        headers: {
          authorization: token,
          "ngrok-skip-browser-warning": "skip-browser-warning",
          "Content-type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};






