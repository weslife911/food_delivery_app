import { IP_ADDRESS } from "@/api/ip";
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: `http://${IP_ADDRESS}:8080/api/v1`
});