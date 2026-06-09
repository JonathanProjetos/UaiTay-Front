import { toast } from 'react-toastify'
import { createOrder, getApiErrorMessage } from '../../api/request'

const order = async (data) => {
  const result = await createOrder(data)

  if (result?._id) {
    toast.success('Pedido registrado com sucesso.', {
      position: 'bottom-left',
      autoClose: 5000,
    })

    localStorage.setItem('orderId', JSON.stringify(result._id))
    return result._id
  }

  toast.error(getApiErrorMessage(result, 'Não foi possível registrar o pedido.'), {
    position: 'bottom-left',
    autoClose: 4000,
  })
  localStorage.setItem('orderId', JSON.stringify(''))
  return null
}

export default order;
