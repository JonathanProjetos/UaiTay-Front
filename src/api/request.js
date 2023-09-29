import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL:`https://calculadora-uaitay-production.up.railway.app`,
  // baseURL:`http://localhost:3001/`,
});

export const requestLogin = async (email, password) => {
  try {
    const { data } = await api.post('login', {
      email,
      password
    })
    
    return data;

  } catch (err) {
    return err;
  }

}

export const verifyToken = async () => {
  const { data } = await api.get('login/validate');
  return data; 
} 

export const requestMenuProducts = async () => {
  try {   
    const { data } = await api.get('menu')
    return data;
  } catch (err) {
    return err;
  }
}

export const createProduct = async (product) => {
  try {
    const { data } = await api.post('create-product', product);
    return data;
  } catch (err) {
    return err;
  }
}

export const deleteProduct = async (name) => {
  try {
   const { data } = await api.delete(`delete-product`, { data: { name } } );
   return data;
  } catch (err) {
    return err;
  }
}

export default api;