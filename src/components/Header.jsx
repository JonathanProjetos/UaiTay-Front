"use client"
import React,{ useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import ButtonBase from '@mui/material/ButtonBase';
import { requestLogin } from '../api/request';
import { toast } from 'react-toastify';

function Header() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const validateAcess = async () => {

    const data = await requestLogin(login, password)

    if(data.menssage === "Ok") {
      toast.success('Login efetuado com sucesso', {
        position: 'bottom-center',
        autoClose: 4000,
      })
      setInterval(() => {
        router.push('/settings')
      }, 4000);

    } else {
      toast.error('Login ou senha incorretos', {
        position: 'bottom-center',
        autoClose: 4000,
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '63vw',
        backgroundColor: '#1976d2',
        color: 'white',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        paddingBottom: '10px',
      }}
    >
      <Box>
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
      </Box>
      <Box>

      </Box>
    </Box>
  )
}

export default Header