import axios from "axios";
import service from "./config";
import { getDataFromLocalStorage } from "@/common/utils";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6InlhMjkuYTBBZWw5c0NOc29fMnAyMElEdDhlZGduc2JLRHFYWFZ4Y2dJOThqNDU4SC05RFVtUzZXRmxSMnkyNnBtNE9qeTRkbFhZaVd2V0tJaDF1OERYUTlvQ3hPNjNpcEJ1dnNLM1JYUTdLMFNGLUY2Rzh0VlNmNzhrTS1GSFAtbE4yNE1YQUZwbDgzeW56OGI0bTNPTVBObzdYSUc3aEVQcklzWXVMYUNnWUtBYjRTQVJFU0ZRRjR1ZEpoTWZYQ2NJVFM3WEJwQm5mcUNGSzA0ZzAxNjciLCJmaXJzdExvZ2luIjpmYWxzZSwiZW1wbG95ZWVJZCI6MTEwOTgsInJvbGUiOiJUQSIsImlhdCI6MTY4MjA3MjAxNCwiZXhwIjoxNzEzNjA4MDE0fQ.3JBTqyRGbNhs56sY65YWiiBCZzucEmATQI1bbfXaYXc";
export const getCandidatesData = async () => {
  try {
    const response = await axios.post(
      `https://949c-115-160-223-174.ngrok-free.app/candidate/getAllCandidates`,{},
      { headers: { authorization: token } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
