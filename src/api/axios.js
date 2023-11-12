import axios from "axios";

const instance = axios.create({
  baseURL: "https://h.princip.es/api/v1", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const token = localStorage.getItem("access_token");
console.log("token", token);

if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;