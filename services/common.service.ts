import axios from "axios";
import service from "./config";
const config = {
  headers: {
    phone_id: "106886972321301",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6InlhMjkuYTBBZWw5c0NOc29fMnAyMElEdDhlZGduc2JLRHFYWFZ4Y2dJOThqNDU4SC05RFVtUzZXRmxSMnkyNnBtNE9qeTRkbFhZaVd2V0tJaDF1OERYUTlvQ3hPNjNpcEJ1dnNLM1JYUTdLMFNGLUY2Rzh0VlNmNzhrTS1GSFAtbE4yNE1YQUZwbDgzeW56OGI0bTNPTVBObzdYSUc3aEVQcklzWXVMYUNnWUtBYjRTQVJFU0ZRRjR1ZEpoTWZYQ2NJVFM3WEJwQm5mcUNGSzA0ZzAxNjciLCJmaXJzdExvZ2luIjpmYWxzZSwiZW1wbG95ZWVJZCI6MTEwOTgsInJvbGUiOiJUQSIsImlhdCI6MTY4MjA3MjAxNCwiZXhwIjoxNzEzNjA4MDE0fQ.3JBTqyRGbNhs56sY65YWiiBCZzucEmATQI1bbfXaYXc",
    "ngrok-skip-browser-warning": "skip-browser-warning",
    "Content-type": "multipart/form-data",
  },
};

export const sendMedia = async (formData: any) => {
  try {
    const response = await axios.post(
      "https://e4a0-103-176-135-206.ngrok-free.app/whatsapp/sendMedia",
      formData,
      config
    );
    return response;
  } catch (error) {
    return { data: null, error: error };
  }
};
