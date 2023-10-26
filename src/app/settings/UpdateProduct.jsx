"use client"
import React, { useState } from 'react'
import { updateProduct } from '../../api/request'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'
import ButtonBase from '@mui/material/ButtonBase'
import { toast } from 'react-toastify'
import ModalConfirmAction from '../../util/ModalConfirmAction'

function UpdateProduct() {
  const [nameProduct, setName] = useState('')
  const [price, setPrice] = useState('')

  const clickUpdateProduct = async () => {    
    const convertPrice = Number(price)

    const newObject = {
      name: nameProduct,
      price: convertPrice,
    }

    const result = await updateProduct(newObject)

    if (result.modifiedCount === 1) {
      toast.success('Produto atualizado com sucesso', {
          position: 'bottom-center',
          autoClose: 4000,
      })

      setName('')
      setPrice('')

    } else {
      toast.error(`${result?.response?.status} | ${result?.response?.data?.error}`, {
        position: 'bottom-center',
        autoClose: 4000,
      })

      setName('')
      setPrice('')

    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width:"100vw",
        backgroundColor: '#1976d2',
        marginTop: '2vh', 
      }}
    > 
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width:"100vw",
          alignItems: 'top',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '4vh',
          textAlign: 'center',
        }}
      >
        Atualizar o valor do produto
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '3vh',
          marginBottom: '3vh',
        }}
      >
        <Input
          type='text'
          placeholder='Nome do produto'
          value={nameProduct}
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '3vh',
            marginLeft: '3vw',
            borderBottom:'solid 3px white',
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type='text'
          value={price}
          placeholder='Preço do produto'
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '3vh',
            marginLeft: '3vw',
            borderBottom:'solid 3px white',
          }}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Box>
      <ModalConfirmAction nameButton="Atualizar" nameProduct={ nameProduct } handleClick={ clickUpdateProduct } />
    </Box>
  )
}

export default UpdateProduct;