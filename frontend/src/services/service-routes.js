import axios from "axios";
import environment  from "../utils";

const api = axios.create({
    baseURL: environment.API.SERVER_URL,
});



export const shortenUrl = (data) => {
    return api.post("createShortUrl", data);
};