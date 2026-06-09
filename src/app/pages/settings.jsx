"use client"
import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import NewProduct from '../settings/NewProduct'
import DeleteProduct from '../settings/DeleteProduct';
import UpdateProduct from '../settings/UpdateProduct';
import NavBar from '../settings/NavBar';
import Box from '@mui/material/Box'
import { verifyToken } from '../../api/request'
import { toast } from 'react-toastify'

function Settings() {
  const router = useRouter();

  const auth = useCallback(async () => {
    try {
      await verifyToken()
    } catch (error) {
      toast.error('Você não tem autorização para acessar essa página', {
        position: 'bottom-center',
        autoClose: 4000,
      })
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    auth()
  }, [auth])

  return (
    <Box>
      <NavBar/>
      <NewProduct/>
      <DeleteProduct/>
      <UpdateProduct/>
    </Box>
  )
}

export default Settings
