import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Calculate from './Calculate'

function ListProducts({products}) {
  const [list, setList] = useState([]);
  return (
    <Box>
      <Box
        sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20vh',
        marginRight: '25vw',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 2,
          width: 150,
          height: 150,
        },
        }}
      >
        {
          products && products.map((data) => (
          <Box key={data._id} sx={{
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid black',
            width: '100px',
            height: '100px',
            borderRadius: '5px',
          }}
          >
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: '100%',
              }}
              onClick={() => setList([...list, data]) }
            >
              <Typography 
                variant="h7" 
                component="div"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {data.name}
              </Typography>
            </Button>
          </Box>
          ))
        }
      </Box>
      <Calculate data={list} />
    </Box>
  )
}

export default ListProducts