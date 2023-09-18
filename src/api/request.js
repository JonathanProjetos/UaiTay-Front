import axios from "axios";

const api = axios.create({
  // baseURL:`https://calculadora-uaitay-production.up.railway.app/`
  baseURL:`http://localhost:3001/`
});

export const requestMenuProducts = async () => {
  const { data } = await api.get('menu')
  return data;
}

export const requestLogin = async (email, password) => {
  try {
    const { data } = await api.post('login', {
      email,
      password
    })
  
    console.log(data);
  
    return data;

  } catch (err) {
    return err;
  }

}

export default api;