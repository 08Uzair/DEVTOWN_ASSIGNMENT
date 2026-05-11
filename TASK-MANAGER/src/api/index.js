import axios from "axios";
const API = axios.create({
  baseURL: "https://uzerqureshi-devtown-assignment-serv.vercel.app/api/v1/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("taskProfile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("taskProfile")).token
    }`;
  }
  return req;
});

// USERS
export const fetchUser = () => API.get("/user");
export const fetchUserById = (id) => API.get(`/user/${id}`);
export const signUp = (newUser) => API.post("/user/signUp/", newUser);
export const signIn = (newUser) => API.post("/user/signIn/", newUser);

