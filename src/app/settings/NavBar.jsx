import React from 'react'
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ButtonBase from '@mui/material/ButtonBase';

function NavBar() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100vw',
        marginBottom: '2vh',
        backgroundColor: '#1976d2',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '4vh',
            marginLeft: '3vw',
          }}
        >
          DashBoard
        </Typography>
      </Box>
      <Box
        sx={{
          color: 'white',
          fontWeight: 'bold',
          marginRight: '3vw',
        }}
      >
        <ButtonBase
          onClick={() => router.push('/')}
        >
          <ExitToAppIcon
            sx={{
              fontSize: '4vh',
              color: 'white',
            }}
          />
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default NavBar