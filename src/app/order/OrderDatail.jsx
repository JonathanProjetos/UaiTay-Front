"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { requestChineseFoodImage, requestOrder } from '../../api/request'
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonPrintOrder from '../orders/PrintOrder';
import OrderDetailsModal from '../orders/OrderDetailsModal';
import Context from '../../context/Context';
import { formatCurrency, formatOrderDate, getOrderFinalTotal, getOrderIdValue, normalizeCurrencyValue } from '../../util/orderHelpers';

function OrderDetail() {
  const router = useRouter();
  const { setCheckedDiscount, setDiscountPercent } = useContext(Context);

  const [order, setOrder] = useState({})
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [foodImage, setFoodImage] = useState('')
  const orderId = getOrderIdValue(order?._id);

  const getOrder = useCallback(async () => {
    const idOrder = JSON.parse(localStorage.getItem('orderId')) || ''
    const data = await requestOrder(idOrder)

    if (!data || data?.response || !data._id) {
      setOrder({})
      router.push('/')
      return
    }

    setOrder(data)
  }, [router])

  useEffect(() => {
    getOrder()
  }, [getOrder])

  useEffect(() => {
    let isMounted = true;

    const loadFoodImage = async () => {
      const image = await requestChineseFoodImage(orderId);

      if (isMounted) {
        setFoodImage(image);
      }
    };

    loadFoodImage();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '72px',
          marginBottom: { xs: '32px', md: '56px' },
          backgroundColor: '#1976d2',
        }}
      >
        <Typography 
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: { xs: '28px', md: '36px' },
            textAlign: 'center',
          }}
        >
          Pedido
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingX: 2,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardMedia
            sx={{ height: 130 }}
            image={foodImage || 'https://www.themealdb.com/images/media/meals/1529444830.jpg'}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Pedido Realizado`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Nome do cliente: ${order && order.customer}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Data de entrada: ${formatOrderDate(order?.date)}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Hora de entrada: ${order && order.hours}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Taxa de entrega: R$: ${formatCurrency(normalizeCurrencyValue(order?.taxFee))}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Total: R$: ${formatCurrency(getOrderFinalTotal(order))}`}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingX: 2,
              paddingBottom: 2,
            }}
          >
            <Button
              size="small"
              onClick={() => setIsDetailsOpen(true)}
              disabled={!order?._id}
            >
              Detalhes
            </Button>
            <ButtonPrintOrder orderData={order} />
          </CardActions>
          <OrderDetailsModal
            orderData={order}
            open={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
          />
        </Card>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          marginTop: { xs: '32px', md: '56px' },
          paddingBottom: 4,
        }}
      >
        <ButtonBase
          sx={{
            width: '110px',
            height: '60px',
            borderRadius: '5px',
            backgroundColor: '#1976d2',
          }}
          onClick={() => {
            setCheckedDiscount(false);
            setDiscountPercent('');
            router.push('/');
          }}
        >
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Inicio
          </Typography>
        </ButtonBase>
        <ButtonBase
          sx={{
            width: '110px',
            height: '60px',
            borderRadius: '5px',
            padding: '10px',
            backgroundColor: '#1976d2',
          }}
          onClick={() => router.push('/orders')}
        >
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Todos os pedidos
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default OrderDetail;
