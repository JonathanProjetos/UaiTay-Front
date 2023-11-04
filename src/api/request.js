import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

export const updateProduct = async (product) => {
  try {
    const { data } = await api.patch(`update-product`, product);
      return data;
  } catch (err) {
    return err;
  }
}

export const createOrder = async (order) => {
  try {
    const { data } = await api.post('create-order', order);
    return data;
  } catch (err) {
    return err;
  }
}

export const requestOrders = async () => {
  try {
    const { data } =  await api.get('orders');
    return data;
  } catch (err) {
    return  err;
  }
}

export const requestOrder = async (id) => {
  try {
    const { data } = await api.get(`order/${id}`);
    return data;
  } catch (err) {
    return err;
  }
}

export const getAddressForCep = async (cep) => {
  try {
    if(Number(cep.length) <= 8) {
      const { data } = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(data);
      return data;
    } else {
      return 'CEP inválido';
    }
  } catch (err) {
    return err;
  }

}

export default api;