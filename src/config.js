import axios from "axios";

export default axios.create({
  baseURL: "https://5e7983b317314d001613316b.mockapi.io/",
  headers: {
    "Content-type": "application/json"
  }
});