"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ButtonBase from '@mui/material/ButtonBase';
import { requestOrders } from '../../api/request'
import CardOrder from './CardOrder'

function ListOrders() {
  const [data, setData] = useState([])

  const  router = useRouter();

  const getAllOrders = async () => {
    const response = await requestOrders()
    setData(response)
  }

  useEffect(() => {
    getAllOrders()
  },[])


  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          height: '8vh',
          alignItems: 'center',
          color: 'white',
          backgroundColor: '#1976d2',
          marginBottom: '2vh',
        }}
      >
        <Typography 
          sx={{
            fontWeight: 'bold',
            fontSize: '4vh',
          }}
        >
          Lista de pedidos
        </Typography>
        <ButtonBase
          onClick={() => router.push('/')}
        >
          <ExitToAppIcon
            sx={{
            fontSize: '4vh',
            }} 
          />
        </ButtonBase>
        </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      {
        data && data.length > 0? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              alignItems: 'center',
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
        ) : (
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '4vh',
              color:'black',
              fontWeight: 'bold',
              height: '80vh',
            }}
          >
            Nenhum pedido encontrado ...
          </Typography>
        )
      }
       
      </Box>
    </Box>
  )
}

export default ListOrders