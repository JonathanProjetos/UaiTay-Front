"use client"
import React, { useCallback, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { requestLogin } from '../api/request';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const validateAccess = useCallback(async (email = '') => {
    if (!email) {
      toast.error('Campo de email não pode ser vazio.', {
        position: 'bottom-center',
        autoClose: 4000,
      });
      return;
    }

    const data = await requestLogin(email);

    if (data?.menssage === 'Ok') {
      toast.success('Login efetuado com sucesso.', {
        position: 'bottom-center',
        autoClose: 4000,
      });
      router.push('/settings');
      return;
    }

    toast.error('Email sem autorização.', {
      position: 'bottom-center',
      autoClose: 4000,
    });
  }, [router]);

  useEffect(() => {
    if (session?.user?.email) {
      validateAccess(session.user.email);
    }
  }, [session, validateAccess]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        color: 'white',
        paddingBottom: '10px',
      }}
    >
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
            padding: '20px',
            width: '110px',
            height: '110px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1e62a5',
            },
          }}
          onClick={() => signIn('google')}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '3vh',
            }}
          >
            UaiTay
          </Typography>
        </ButtonBase>
        <ButtonBase
          sx={{
            border: 'solid 3px white',
            borderRadius: '100px',
            marginLeft: '12px',
            padding: '20px',
            width: '130px',
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
    </Box>
  )
}

export default Header
