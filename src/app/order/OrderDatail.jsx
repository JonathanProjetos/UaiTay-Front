"use client"
import React, { useContext, useEffect, useState } from 'react';
import { requestOrder } from '../../api/request'
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonPrintOrder from './../orders/PrintOrder';
import Context from '../../context/Context';

function OrderDetail() {
  const router = useRouter();
  const { setCheckedDiscount, setDiscountPercent } = useContext(Context);

  const [order, setOrder] = useState({})

  const getOrder = async () => {
    const idOrder = JSON.parse(localStorage.getItem('orderId')) || ''
    const data = await requestOrder(idOrder)
    setOrder(data)

    console.log(data);

    if(data === null || !data._id) {
      router.push('/')
    }
  }

  useEffect(() => {
    getOrder()
  }, [])

  return (
    <Box
      sx={{
        diplay: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100vw',
          marginBottom: '10vh',
          backgroundColor: '#1976d2',
        }}
      >
        <Typography 
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '4vh',
            marginLeft: '3vw',
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
          flexWrap: 'wrap',
        }}
      >
        <Card sx={{ width: 400 }}>
          <CardMedia
            sx={{ height: 130 }}
            image={"https://drive.google.com/uc?export=view&id=1epaOB5JSqn_mQbZx4YCFUO0fKSGEUJ-H"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Pedido Realizado`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Nome do cliente: ${order && order.customer}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Data de entrada: ${order && order.date?.split('-').join('/')}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Hora de entrada: ${order && order.hours}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Total: R$: ${order && order.total?.toFixed(2).split('.').join(',')}`}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Button size="small">Detalhes</Button>
            <ButtonPrintOrder orderData={order} />
          </CardActions>
        </Card>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          marginTop: '10vh',
        }}
      >
      <ButtonBase
        sx={{
          width: '110px',
          height: '60px',
          borderRadius: '5px',
          marginRight: '10vh',
          backgroundColor: '#1976d2',
        }}
        onClick={() => {
          setCheckedDiscount(false);
          setDiscountPercent('0');
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
      >
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 'bold',
            color: 'white',
          }}
          onClick={() => router.push('/orders')}
        >
          Todos os pedidos
        </Typography>
      </ButtonBase>
      </Box>
    </Box>
  )
}

export default OrderDetail;