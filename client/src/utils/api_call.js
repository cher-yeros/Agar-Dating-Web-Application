import axios from "axios";

const ls = JSON.parse(localStorage.getItem("persist:root"))?.auth;

const currentUser = ls ? JSON.parse(ls)?.loggedUser?.token : null;

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "x-api-key": currentUser,
  },
});

export default api;
