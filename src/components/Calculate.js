import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function Calculate({ data }) {
  console.log(data);
  const [sum, setSum] = useState(0);

  function sumProducts(list) {
    const sum = list.reduce((total, item) => {
      return total + item.price;
    },0)
    
    setSum(sum)
  }

  useEffect(() => {
    sumProducts(data)
  },[data])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        flexDirection: 'column',
        bottom: '0',
        right: '0',
        width: '30vw',
        height: '5vh',
        marginBottom: '50px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '30px',
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        {
          `Total: R$${sum}`
        }
      </Typography>

    </Box>
  );
  
}


export default Calculate