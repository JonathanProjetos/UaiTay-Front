import axios from "axios";

const api = axios.create({
  baseURL:`https://calculadora-uaitay-production.up.railway.app/`
});


export const requestMenuProducts = async () => {
  const { data } = await api.get('menu')
  // console.log(data);
  return data;
}

export default api;