"use client"
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import { requestOrders } from '../../api/request'
import CardOrder from './CardOrder'

function ListOrders() {
  const [data, setData] = useState([])

  console.log(data);

  const getAllOrders = async () => {
    const response = await requestOrders()
    setData(response)
  }

  useEffect(() => {
    getAllOrders()
  },[])


  return (
    <Box>
        <Typography 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '8vh',
            alignItems: 'center',
            fontSize: '4vh',
            color:'white',
            fontWeight: 'bold',
            backgroundColor: '#1976d2',
            marginBottom: '2vh',
          }}
        >
          Lista de pedidos
        </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            alignItems: 'center',
            border: '1px solid black',
            width: '90vw',
          }}
        >
          {
            data && data.map((item, index) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '10px',
                }} 
                  key={index}
              >
                <CardOrder data={item} index={index} />
              </Box>
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}

export default ListOrders