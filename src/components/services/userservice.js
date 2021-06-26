import axios from "axios";
const baseUrl = "";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const userService = {
  getAll: getAll,
  create: create,
  update: update,
};
export default userService;
