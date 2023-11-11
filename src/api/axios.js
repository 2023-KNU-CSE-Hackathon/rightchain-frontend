import axios from "axios";

// const { VITE_APP_SERVER_PORT } = import.meta.env;

const instance = axios.create({
  baseURL: "https://h.princip.es/api/v1", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const inputHeaders = {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
  }
};

if (localStorage.getItem("token") === null) {
  console.log();
} else {
  instance.defaults.headers.common = {...instance.defaults.headers.common, ...inputHeaders.headers};
}

export default instance;