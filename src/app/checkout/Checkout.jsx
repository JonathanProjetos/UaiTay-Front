"use client"
import React, { useState, useEffect, useContext, useCallback } from "react";
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
import { groupProducts } from "../../util/orderHelpers";

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

  const calculateDiscount = useCallback((value, percent) => {
    const discountedTotal = Number((value - (value * (percent / 100))).toFixed(2));
    return {
      discountedTotal,
      discountValue: Number((value - discountedTotal).toFixed(2)),
    };
  }, []);

  const updateDiscountValues = useCallback((value, isChecked = checked, percentValue = discountPercent) => {
    const percent = Number(percentValue);

    if (isChecked && percent > 0) {
      const { discountedTotal, discountValue } = calculateDiscount(value, percent);
      setPriceWithDiscount(discountedTotal);
      setTotalDiscounts(discountValue);
      return;
    }

    setPriceWithDiscount(value);
    setTotalDiscounts(0);
  }, [calculateDiscount, checked, discountPercent, setPriceWithDiscount, setTotalDiscounts])

  const deleteLastEnteredData = () => {
    if (list.length === 0) return;

    const newList = list.slice(0, -1);
    const newSum = newList.reduce((total, item) => total + item.price, 0);

    setList(newList);
    setListProducts(newList);
    setSum(newSum);
    updateDiscountValues(newSum);
  }

  const redirectAdditionalCustomerData = () => {
    if (list.length === 0) {
      toast.error('Não é possível gerar um pedido sem produtos.', {
        position: 'bottom-center',
        autoClose: 4000,
      })
      return;
    }

    toast.success('Pedido gerado com sucesso. Adicione agora os dados do cliente.', {
      position: 'bottom-center',
      autoClose: 4000,
    })
    setOrder(list)
    setTotal(sum)
    router.push('/delivery')
  }

  const checkDiscount = (isChecked) => {
    setChecked(isChecked);
    setCheckedDiscount(isChecked);

    if (!isChecked) {
      setDiscountPercent('');
      setPriceWithDiscount(sum);
      setTotalDiscounts(0);
      return;
    }

    updateDiscountValues(sum, true);
  };

  const handleDiscountInput = (e) => {
    const value = e.target.value;
    setDiscountPercent(value);
    updateDiscountValues(sum, checked, value);
  };

  function handleDecrement(name) {
    const newList = [...list];
    const idx = newList.findIndex(item => item.name === name);

    if (idx === -1) return;

    newList.splice(idx, 1);
    const newSum = newList.reduce((total, item) => total + item.price, 0);

    setList(newList);
    setListProducts(newList);
    setSum(newSum);
    updateDiscountValues(newSum);
  }

  useEffect(() => {
    const newSum = listProducts.reduce((total, item) => total + item.price, 0);

    setList(listProducts);
    setSum(newSum);
    updateDiscountValues(newSum);
  }, [listProducts, updateDiscountValues]);

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
                {`${i.count}x ${i.name} -  R$: ${i.totalPrice.toFixed(2).replace('.', ',')}`}
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
          label='Adicionar desconto?'
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
              type="number"
              inputProps={{ min: 0, max: 100 }}
              value={discountPercent}
              onChange={handleDiscountInput}
              placeholder="% desconto"
              disableUnderline
              sx={{
                color: 'white',
                width: '4vw',
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
                marginLeft: '2px',
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
          disabled={list.length === 0}
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
              checked && Number(discountPercent) > 0
                ? `Total: R$${calculateDiscount(sum, Number(discountPercent)).discountedTotal.toFixed(2).replace('.', ',')}`
                : `Total: R$${sum.toFixed(2).replace('.', ',')}`
            }
          </Typography>
          <ButtonBase onClick={redirectAdditionalCustomerData}>
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
