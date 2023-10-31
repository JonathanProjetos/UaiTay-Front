"use client"
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckBox from "@mui/material/Checkbox";
import FormatControlLabel from "@mui/material/FormControlLabel";
import { toast } from 'react-toastify'
import context from "../../context/Context";


function Checkout() {

  const { listProducts, setOrder, setTotal } = useContext(context)

  console.log(listProducts);

  const router = useRouter()

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

  const redirectAdditionalCustomerData = () => {
    if(list.length === 0) {
      toast.error('Não é possível gerar um pedido sem produtos.', {
        position: 'bottom-center',
        autoClose: 4000,
      })
    } else {
      toast.success('Pedido gerado com sucesso, você será direcionado para dados adicionais do cliente.', {
        position: 'bottom-center',
        autoClose: 4000,
      })
      setOrder(list)
      setTotal(sum)
      router.push('/customer')
    }
  }

  useEffect(() => {
    setList(listProducts)
    sumProducts(listProducts)
  },[listProducts, list])

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
            width: '24vw',
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
          onClick={() => deleteLastEnteredData(listProducts)}
        >
        APAGAR
        </ButtonBase>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '25vw',
            marginLeft: '15px',
            marginBottom: '5vw',
            borderRadius: '20px',
          }}
        >
        <Typography
          sx={{
          fontWeight: 'bold',
          fontSize: '15px',
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: 'red',
          width: '10vw',
          color: 'white',
          }}
        >
          {
            checked ? `Total: R$${(sum - (sum * 0.1)).toFixed(2).replace('.',',')}` :
            `Total: R$${sum.toFixed(2).replace('.',',')}`
          }
        </Typography>
        <ButtonBase
          onClick={() => redirectAdditionalCustomerData()}
        >
          <Typography
            sx={{
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '20px',
            backgroundColor: 'red',
            color: 'white',
            padding: '20px'
            }}
          >
            Gerar Pedido
          </Typography>
        </ButtonBase>
        </Box>
      </Box>
    </Box>
  ); 
}


export default Checkout