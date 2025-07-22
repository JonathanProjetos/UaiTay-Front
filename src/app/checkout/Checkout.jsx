"use client"
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Input from "@mui/material/Input";
import CheckBox from "@mui/material/Checkbox";
import FormatControlLabel from "@mui/material/FormControlLabel";
import { toast } from 'react-toastify'
import context from "../../context/Context";


function Checkout() {

  const { 
    listProducts, 
    setOrder, 
    setTotal,
    setPriceWithDiscount,
    setTotalDiscounts,
    setCheckedDiscount,
    discountPercent,
    setDiscountPercent,
    setListProducts
  } = useContext(context)

  const router = useRouter()

  const [sum, setSum] = useState(0);
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false);
  // const [discountPercent, setDiscountPercent] = useState('');

  function sumProducts(list) {
    const sum = list.reduce((total, item) => {
      return total + item.price;
    },0)
    
    setSum(sum)
  }

  const deleteLastEnteredData = () => {
    if (list.length > 0) {
      // Apaga todos os itens do primeiro agrupado
      const firstItemName = list[0].name;
      const newList = list.filter(item => item.name !== firstItemName);
      setList(newList);
      setListProducts(newList);
      sumProducts(newList);
    }
  }

  const redirectAdditionalCustomerData = () => {
    if(list.length === 0) {
      toast.error('Não é possível gerar um pedido sem produtos.', {
        position: 'bottom-center',
        autoClose: 4000,
      })
    } else {
      toast.success('Pedido gerado com sucesso. Adicione agora os dados do cliente.', {
        position: 'bottom-center',
        autoClose: 4000,
      })
      setOrder(list)
      setTotal(sum)
      router.push('/delivery')
    }
  }

  // Corrige o controle do checkbox para usar o valor do evento
  const checkDiscount = (isChecked) => {
    setChecked(isChecked);
    setCheckedDiscount(isChecked);

    console.log(isChecked, "isChecked")
    if (!isChecked) {
      setDiscountPercent('');
      setPriceWithDiscount(sum);
      setTotalDiscounts(0);
    } else {
      // Quando marcado, aguarda o input do usuário
      if (discountPercent > 0) {
        const priceWithDiscount = Number(sum - (sum * (discountPercent / 100)));
        const discountValue = Number((sum - priceWithDiscount).toFixed(2));
        setPriceWithDiscount(priceWithDiscount);
        setTotalDiscounts(discountValue);
      }
    }
  };

  const handleDiscountInput = (e) => {
    const value = e.target.value;
    setDiscountPercent(value);
    const percent = Number(value);
    if (checked && percent > 0) {
      const priceWithDiscount = Number(sum - (sum * (percent / 100)));
      const discountValue = Number((sum - priceWithDiscount).toFixed(2));
      setPriceWithDiscount(priceWithDiscount);
      setTotalDiscounts(discountValue);
    } else {
      setPriceWithDiscount(sum);
      setTotalDiscounts(0);
    }
  };

  // Função para agrupar itens iguais e somar valores
  function groupProducts(products) {
    const grouped = {};
    products.forEach(item => {
      if (!grouped[item.name]) {
        grouped[item.name] = {
          ...item,
          count: 1,
          totalPrice: item.price
        };
      } else {
        grouped[item.name].count += 1;
        grouped[item.name].totalPrice += item.price;
      }
    });
    return Object.values(grouped);
  }

  // Função para decrementar quantidade de um item agrupado
  function handleDecrement(name) {
    // Remove todos os itens do tipo selecionado, um por vez, até não restar nenhum
    const newList = [...list];
    const idx = newList.findIndex(item => item.name === name);
    if (idx !== -1) {
      newList.splice(idx, 1); // Remove o item clicado
      setList(newList);
      setListProducts(newList);
      // Atualiza o valor total e o desconto
      const newSum = newList.reduce((total, item) => total + item.price, 0);
      setSum(newSum);
      if (checked && discountPercent > 0) {
        const priceWithDiscount = Number(newSum - (newSum * (discountPercent / 100)));
        const discountValue = Number((newSum - priceWithDiscount).toFixed(2));
        setPriceWithDiscount(priceWithDiscount);
        setTotalDiscounts(discountValue);
      } else {
        setPriceWithDiscount(newSum);
        setTotalDiscounts(0);
      }
    }
  }

  // Atualiza a lista e o valor total sempre que listProducts mudar (adicionar novo item)
  useEffect(() => {
    setList(listProducts);
    sumProducts(listProducts);
  }, [listProducts]);

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
          groupProducts(list).map((i) => (
            <ListItem key={i.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <ListItemText
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}
              >
                {`${i.count}x ${i.name} -  R$: ${i.totalPrice.toFixed(2).replace('.',',')}`}
              </ListItemText>
              {i.count > 1 && (
                <ButtonBase
                  sx={{
                    backgroundColor: 'white',
                    color: 'red',
                    fontWeight: 'bold',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    marginLeft: '10px',
                  }}
                  onClick={() => handleDecrement(i.name)}
                >
                  -
                </ButtonBase>
              )}
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
              onChange={(e) => checkDiscount(e.target.checked)}
            />
          }
        />
        {checked && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '20px',
            backgroundColor: 'red',
            borderRadius: '15px',
            padding: '5px',
            marginRight: '5px',
            marginLeft: '15px',
          }}>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '15px',
                marginRight: '10px',
                marginLeft: '10px',
              }}
            >
              Valor do desconto:
            </Typography>
            <Input
              type="text"
              value={discountPercent}
              onChange={handleDiscountInput}
              placeholder="% desconto"
              disableUnderline
              sx={{
                color: 'white',
                width: '2vw', // reduzido para aproximar do %
                fontWeight: 'bold',
                fontSize: '15px',
                padding: '5px',
                textAlign: 'right',
                marginRight: '2px',
              }}
            />
            <Typography
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '15px',
                marginLeft: '2px', // aproxima o % do input
              }}
            >
              %.
            </Typography>
          </Box>
        )}

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
          onClick={deleteLastEnteredData}
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
            checked && discountPercent > 0
              ? `Total: R$${(sum - (sum * (discountPercent / 100))).toFixed(2).replace('.',',')}`
              : `Total: R$${sum.toFixed(2).replace('.',',')}`
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