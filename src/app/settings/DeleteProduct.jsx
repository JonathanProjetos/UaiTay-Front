"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'
import { deleteProduct } from '../../api/request'
import ModalConfirmAction from '../../util/ModalConfirmAction'


function DeleteProduct() {
  const [nameProduct, setNameProduct] = useState('')

  const clickDeleteProduct = async () => {
    const resolved = await deleteProduct(nameProduct)

    if(resolved.deletedCount === 1) {
      toast.success('Produto deletado', {
        position: 'bottom-center',
        autoClose: 4000,
      })

      setNameProduct('');
    } else {
      toast.error(`${resolved?.response?.status} | ${resolved?.response?.data?.error}`, {
        position: 'bottom-center',
        autoClose: 4000,
      })
      setNameProduct('');
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
        Deletar um Produto
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100vw',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            marginTop: '2vh',
            color: 'white',
          }}
        >
          Digite o nome do produto que deseja excluir
        </Typography>
        <Input
          type='text'
          value={nameProduct}
          placeholder='Ex: Costelinha (Grande)'
          onChange={(e) => setNameProduct(e.target.value)}
          sx={{
            marginBottom: '3vh',
            width:'50vw',
            textAlign: 'center',
            color: 'white',
            borderBottom:'solid 3px white',
            marginTop: '2vh',
            fontWeight: 'bold',
            fontSize: '3vh',
          }}
        />
        <ModalConfirmAction nameButton="Deletar" nameProduct={nameProduct} clickDeleteProduct={clickDeleteProduct}/>
      </Box>
    </Box>
  )
}

export default DeleteProduct