"use client"
import React, { useContext, useState } from 'react'
import context from '../../context/Context'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField  from '@mui/material/TextField'
import ButtonBase from '@mui/material/ButtonBase'
import { currentDate, currentHours } from '../../components/CurrenteDateAndHours'


function CustomerData() {
  const { order, total } = useContext(context)
  const [customer, setCustomer] = useState("")
  const [address, setAddress] = useState("")
  const [number, setNumber] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [complement, setComplement] = useState("")
  const [phone, setPhone] = useState("")
  const [payment, setPayment] = useState("")
  const [discount, setDiscount] = useState("")


  const createOrder = async () => {
    const data = {
      customer,
      address,
      number,
      district,
      city,
      complement,
      phone,
      payment,
      discount,
      order,
      total,
      date: currentDate(),
      hour: currentHours(),
    }
    console.log(data);
  }


  return (
    <Box
      sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
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
          marginBottom: '5vh',
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
          Detalhes do cliente
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '60vw',
        }}
      >
        <TextField
          sx={{
          width: '30vw',
          marginBottom: '4vh',
          }}
          id='standard-basic'
          label='Nome do cliente'
          variant='standard'
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <TextField
          sx={{
          width: '20vw',
          marginBottom: '4vh',
          }}
          type='tel'
          id='standard-basic'
          label='Telefone'
          placeholder='(xx) xxxxx-xxxx'
          variant='standard'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

      <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '50vw',
            }}
          >
            <TextField
              sx={{
              width: '30vw',
              marginBottom: '4vh',
              marginRight: '5vw',
              }}
              id='standard-basic'
              label='Endereço'
              variant='standard'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <TextField
              sx={{
              width: '5vw',
              marginBottom: '4vh',
              marginRight: '5vw',
              }}
              id='standard-basic'
              label='Número'
              variant='standard'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <TextField
              sx={{
              width: '10vw',
              marginBottom: '4vh',
              marginRight: '5vw',
              }}
              id='standard-basic'
              label='Bairro'
              variant='standard'
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            <TextField
              sx={{
              width: '10vw',
              marginBottom: '4vh',
              }}
              id='standard-basic'
              label='Cidade'
              variant='standard'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',  
        }}
      >
        <TextField
            sx={{
            width: '15vw',
            marginBottom: '4vh',
            }}
            type='text'
            id='standard-basic'
            label='Forma de pagamento'
            placeholder='Dinheiro, cartão, etc'
            variant='standard'
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
        />

        <TextField
            sx={{
            width: '15vw',
            marginBottom: '4vh',
            marginLeft: '5vw',
            }}
            type='text'
            id='standard-basic'
            label='Desconto?'
            variant='standard'
            placeholder='Sim ou não'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
        />
      </Box>

      <TextField
        sx={{
        width: '40vw',
        marginBottom: '4vh',
        }}
        id='standard-basic'
        label='Ponto de referência'
        variant='standard'
        value={complement}
        placeholder="Proximo a..."
        onChange={(e) => setComplement(e.target.value)}
      />         
      </Box>
       <Box>
        <ButtonBase
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '15vw',
            height: '10vh',
            fontSize: '3vh',
            fontWeight: 'bold',
            backgroundColor: '#1976d2',
            color: 'white',
            borderRadius: '5px',
            marginTop: '10vh',
            // marginBottom: '5vh',
          }}
          onClick={() => createOrder()}
        >
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width:"100vw",
              alignItems: 'top',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '3vh',
              textAlign: 'center',
            }}
          >
            Finalizar pedido
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default CustomerData;