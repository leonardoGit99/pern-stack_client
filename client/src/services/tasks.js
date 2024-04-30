import { baseLocalUrl as api, headers, headers2 } from "./api.config";
import axios from "axios";


export const createTask = async (body) => {
  const response = await axios.post(`${api}/tasks`, body, { headers2 });
  return response.data;
}

export const getAllTasks = async () => {
  const response = await axios.get(`${api}/tasks`);
  return response.data;
}

export const getTask = async (id) => {
  const response = await axios.get(`${api}/tasks/${id}`);
  return response.data;
}

export const deleteTask = async (id) => {
  const response = await axios.delete(`${api}/tasks/${id}`);
  return response;
}

export const updateTask = async (body, id) => {
  const response = await axios.put(`${api}/tasks/${id}`, JSON.stringify(body), { headers });
  return response.data;
}