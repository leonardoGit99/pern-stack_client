import { baseLocalUrl as api, headers, headers2 } from "./api.config";
import axios from "axios";

export const getImgsTask = async (id) => {
  const response = await axios.get(`${api}/images/${id}`);
  return response.data;
}