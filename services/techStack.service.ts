import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pc2h1Lmt1bWFyaUBjb2RpdGFzLmNvbSIsImFjY2Vzc1Rva2VuIjoieWEyOS5hMEFXWTdDa2s1VElqQVl5RGFoQUF5MnAxZVRYNlAtWUZfcndsaEprZHZOTk1oN3VsZDlpVGFWVF9KWnhPY2czbUFSUVNuMmptVW56OUk1bk5wU0h0U00ydkFpelJlS0pZY3A5eE9QOVBVVWtGQ29PV205ZDd6NjRaODJaamJvS1VqR0FiUEpteGY3UkV4TDNsTGFxMm91cDc5VHo0ZmFDZ1lLQWFVU0FSQVNGUUcxdERycGk3WmtGSEVlc0Y0R3JpNkZ3S0k1TVEwMTYzIiwiZnJlc2hMb2dpbiI6bnVsbCwiaXNBY3RpdmUiOnRydWUsImVtcGxveWVlSWQiOjExMTM0LCJyb2xlIjoiQURNSU4iLCJ1c2VySW1hZ2VVcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhiVFEwLWRwb0ZUUVJfTUMyUVdjUGNiVm9pR3pOakY4SUUtSVFUeD1zOTYtYyIsImlhdCI6MTY4MzYxMDIyMSwiZXhwIjoxNzE1MTQ2MjIxfQ.3GmXA1JFIAVMPok9fWoniTH4TXJK0-ZT2w6YffV1F0w";

export const getAllTechStackService = async (filters: any) => {
  try {
    const response = await axios.post(
      "https://2616-115-160-223-174.ngrok-free.app/techStack/getAllTechStacks",
      filters,
      {
        headers: {
          authorization: token,
          "ngrok-skip-browser-warning": "skip-browser-warning",
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
