"use client"
import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import ButtonBase from '@mui/material/ButtonBase';
import { requestLogin } from '../api/request';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Header() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [toggle, setToggle] = useState(true)

  const router = useRouter()

  const validateAcess = async () => {

    const data = await requestLogin(login, password)

    if(data.menssage === "Ok") {
      toast.success('Login efetuado com sucesso.', {
        position: 'bottom-center',
        autoClose: 4000,
      })
      router.push('/settings')

    } else if (login === '' || password === '') {
      toast.error('Campo de email ou senha não pode ser vazío.', {
        position: 'bottom-center',
        autoClose: 4000,
      })

    } else {
      toast.error('Email ou senha estão incorretos.', {
        position: 'bottom-center',
        autoClose: 4000,
      })
    }
  }
  
  useEffect(() => {
    setToggle(true)
  },[])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        // backgroundColor: '#1976d2',
        color: 'white',
        paddingBottom: '10px',
      }}
      style={{ width: toggle? '20vw' : '63vw' }}
    >
      {toggle? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <ButtonBase
                sx={{
                  border: 'solid 3px white',
                  borderRadius: '100px',
                  marginLeft: '12px',
                  padding: '10px',
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1e62a5',
                  },
                }}
                onClick={() => setToggle(false)}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '3vh',
                  }}
                >
                  UayTay
                </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              border: 'solid 3px white',
              borderRadius: '100px',
              marginLeft: '12px',
              padding: '15px',
              width: '120px',
              height: '60px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1e62a5',
              },
            }}
            onClick={() => router.push('/orders')}
          >
            <Typography
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '3vh'
              }}
            >
              Pedidos
            </Typography>
          </ButtonBase>
        </Box>
      ):(
        <>
          <Box
            sx={{
              backgroundColor: '#1976d2',
              width:'63vw',
              marginBottom: '2vh',
              padding: '10px',  
            }}
          >
            <Input
              placeholder='email'
              onChange={(e) => setLogin(e.target.value)}
              sx={{
                marginLeft: '20px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '3vh',
                borderBottom: 'solid 2px white',
              }}
            />
            <Input
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              sx={{
                marginLeft: '30px',
                marginRight: '20px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '3vh',
                borderBottom: 'solid 2px white',
              }}
            />
            <ButtonBase
              sx={{
                marginLeft: '10px',
                fontWeight: 'bold',
                fontSize: '2vh',
                border: 'solid 3px white',
                padding: '10px',
                borderRadius: '20px',
                marginTop: '1vh',
              }}
              onClick={() => validateAcess()}
            >
              Login
            </ButtonBase>
            <ButtonBase>
            <ArrowBackIcon
              sx={{
                fontSize: '4vh',
                color: 'white',
                // backgroundColor: 'white',
                marginLeft: '20px',
              }}
              onClick={() => setToggle(true)}
            />
            </ButtonBase>
          </Box>
          <Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Header