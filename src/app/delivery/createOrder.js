import { toast } from 'react-toastify'
import { createOrder } from '../../api/request'

const order = async (data) => {

  const result = await createOrder(data)

  if (result._id) {
    toast.success('Pedido registrado com sucesso.', {
      position: 'bottom-left',
      autoClose: 5000,
    })

    localStorage.setItem('orderId', JSON.stringify(result._id))
    return result._id
  } else {
    toast.error(`${result.response.status} | ${result.response.data.error}`, {
      position: 'bottom-left',
      autoClose: 4000,
    })
    localStorage.setItem('orderId', JSON.stringify(''))
  }

}

export default order;