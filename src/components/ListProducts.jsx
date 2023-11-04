import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import context from '@/context/Context'

function ListProducts({products}) {
  const { listProducts, setListProducts } = useContext(context);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginRight: '30vw',
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
              onClick={() => setListProducts([...listProducts, data]) }
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
    </Box>
  )
}

export default ListProducts