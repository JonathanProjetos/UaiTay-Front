"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import NewProduct from '../../components/NewProduct'
import Logout from '../../components/Logout';
import Box from '@mui/material/Box'
import { verifyToken } from '../../api/request'
import { toast } from 'react-toastify'


function Settings() {
  const router = useRouter();

  const auth = async () => {
    try {
      await verifyToken()
      console.log('useEffect');
    } catch (error) {
      console.error(error);
      toast.error('Você não tem autorização para acessar essa página', {
        position: 'bottom-center',
        autoClose: 4000,
      })
      router.push('/')
      
    }
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <Box>
      <Logout/>
      <NewProduct/>
    </Box>
  )
}

export default Settings