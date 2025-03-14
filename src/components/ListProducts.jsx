import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import context from '@/context/Context'
import defaultList from '@/util/defaultList'

function ListProducts({ products }) {
  const { listProducts, setListProducts } = useContext(context);

  const listOfproducts = products.length ? products : defaultList;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {products.length > 0 ? (
        <Typography variant="h7" sx={{ marginLeft: '20px' }}>
          Informações da base de dados {new Date().toLocaleDateString('pt-BR')}.
        </Typography>
      ) : (
        <Typography variant="h7" sx={{ marginLeft: '20px' }}>
          Última atualização 11/03/2025.
        </Typography>
      )}

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
          listOfproducts.map((data) => (
            <Box key={data.name} sx={{
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
                  backgroundColor: products.length > 0 ? '#1976d2' : '#a83535',
                }}
                onClick={() => setListProducts([...listProducts, data])}
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