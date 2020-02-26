import axios from "axios";

//TODO: Implement base url of backend and add Authorization header.
export const axiosWithAuth = () => {
  const token = localStorage.getItem("authToken");
  return axios.create({
    baseURL: "https://REPLACEBEURLHERE.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
};