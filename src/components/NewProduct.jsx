"use client"
import React, { useState } from 'react'
import { createProduct } from '../api/request'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'
import ButtonBase from '@mui/material/ButtonBase'
import { toast } from 'react-toastify'

function NewProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [data, setData] = useState({})

  const clickCreateProduct = async () => {    
    const convertPrice = Number(price)

    const newObject = {
      name: name,
      price: convertPrice,
      category: category,
    }

    const result = await createProduct(newObject)

    setData(result)

    console.log(data);

    if (data._id) {
      toast.success('Produto adicionado com sucesso', {
          position: 'bottom-center',
          autoClose: 4000,
      })

    } else {
      console.log(data.message);
      toast.error('Error', {
        position: 'bottom-center',
        autoClose: 4000,
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width:"98vw",
        height:"30vh",
        backgroundColor: 'blue',
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
          fontSize: '5vh'
        }}
      >
        Adicionar novos produtos para o menu
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '3vh',
        }}
      >
        <Input
          type='text'
          placeholder='Nome do produto'
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

        <Input
          type='text'
          placeholder='Categoria do produto'
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '3vh',
            marginLeft: '3vw',
            borderBottom:'solid 3px white',
          }}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Box>
      <ButtonBase
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
            width: '10vw',
            border: 'solid 4px white',
            marginTop: '3vh',
            padding: '1vh',
          }}
          onClick={() => clickCreateProduct()}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '2vh',
            }}
          >
            Adicionar
          </Typography>
      </ButtonBase>
    </Box>
  )
}

export default NewProduct