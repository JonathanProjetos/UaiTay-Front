import axios from "axios";
import { mockarrayorder } from "@/mock/pedido";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const requestApi = async (callback) => {
  try {
    const { data } = await callback();
    return data;
  } catch (err) {
    return err;
  }
};

export const getApiErrorMessage = (err, fallback = 'Não foi possível concluir a operação.') => {
  const status = err?.response?.status || 'Erro';
  const message = err?.response?.data?.error || err?.message || fallback;

  return `${status} | ${message}`;
};

export const requestLogin = async (email) => {
  return requestApi(() => api.post('login', { email }));
}

export const verifyToken = async () => {
  const { data } = await api.get('login/validate');
  return data; 
} 

export const requestMenuProducts = async () => {
  return requestApi(() => api.get('menu'));
}

export const createProduct = async (product) => {
  return requestApi(() => api.post('create-product', product));
}

export const deleteProduct = async (name) => {
  return requestApi(() => api.delete('delete-product', { data: { name } }));
}

export const updateProduct = async (product) => {
  return requestApi(() => api.patch('update-product', product));
}

export const createOrder = async (order) => {
  return requestApi(() => api.post('create-order', order));
}

export const requestOrders = async () => {
 // return requestApi(() => api.get('orders'));
 return mockarrayorder;
}

export const requestOrder = async (id) => {
  // return requestApi(() => api.get(`order/${id}`));
  console.log(id);
  return mockarrayorder[id];
}

export const getAddressForCep = async (cep) => {
  try {
    if (String(cep).length <= 8) {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return data;
    }

    return 'CEP inválido';
  } catch (err) {
    return err;
  }
}

export default api;
