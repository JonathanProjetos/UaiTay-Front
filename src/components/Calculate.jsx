import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckBox from "@mui/material/Checkbox";
import FormatControlLabel from "@mui/material/FormControlLabel";


function Calculate({ data }) {
  const [sum, setSum] = useState(0);
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false);

  function sumProducts(list) {
    const sum = list.reduce((total, item) => {
      return total + item.price;
    },0)
    
    setSum(sum)
  }

  const deleteLastEnteredData = (list)  => {
    const  newList = list.pop();
    setList([newList])
  }

  useEffect(() => {
    setList(data)
    sumProducts(data)
  },[data, list])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'static',
        flexDirection: 'column',
        width: '30vw',
        height: '5vh',
        marginBottom: '50px',
      }}
    >
      <List
        sx={{

          position: 'fixed',
          top: '0',
          right: '0',
          marginRight: '20px',
          color: 'white',
          backgroundColor: 'red',
          borderRadius: '20px',
          marginTop: '20px',
          width: '30vw',
          height: '45vh',
          overflowY: 'auto',
        }}
      >
        {
          list && list.map((i) => (
            <ListItem>
              <ListItemText>
                {i? i.name : null}
              </ListItemText>
            </ListItem>
          ))
        }
      </List>
      <Box
        sx={{
          position: 'fixed',
          bottom: '0',
          right: '0',
        }}
      >
        <FormatControlLabel
          label='Adicionar disconto?'
          sx={{
            display: 'flex',
            fontWeight: 'bold',
            fontSize: '15px',
            padding: '10px',
            borderRadius: '20px',
            backgroundColor: 'red',
            color: 'white',
            marginRight: '5px',
            marginBottom: '20px',
            width: '25vw',
            marginLeft: '15px',
          }}
          control={
            <CheckBox
              sx={{
                color: 'white',
                '&.Mui-checked': {
                  color: 'white',
                },
              }}
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          }
        />

      <ButtonBase
        sx={{
          display: 'flex',
          fontWeight: 'bold',
          fontSize: '15px',
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: 'red',
          color: 'white',
          marginRight: '5px',
          marginBottom: '20px',
          width: '25vw',
          marginLeft: '15px',
        }}
        onClick={() => deleteLastEnteredData(data)}
      >
        APAGAR
      </ButtonBase>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '20px',
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: 'red',
          color: 'white',
          marginRight: '5px',
          marginBottom: '20px',
          marginLeft: '20px',
        }}
      >
        {
          checked ? `Total: R$${(sum - (sum * 0.1)).toFixed(2).replace('.',',')}` :
          `Total: R$${sum.toFixed(2).replace('.',',')}`
        }
      </Typography>
      </Box>
    </Box>
  );
  
}


export default Calculate