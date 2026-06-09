"use client";
import React, { useContext, useState, useEffect } from "react";
import context from "../../context/Context";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonBase from "@mui/material/ButtonBase";
import { currentDate, currentHours } from "../../components/CurrenteDateAndHours";
import createOrder from "./createOrder";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function DeliveryData() {
  const router = useRouter();
  const {
    order,
    total,
    checkedDiscount,
    discountPercent,
    priceWithDiscount,
    totalDiscounts,
  } = useContext(context);

  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [complement, setComplement] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [discount, setDiscount] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (order.length === 0) {
      toast.error("Por gentileza, cadastre os produtos novamente.", {
        position: "bottom-center",
        autoClose: 4000,
      });
      router.push("/");
      return;
    }

    setIsDisabled(!(customer && phone && address && number && district && city && payment));
  }, [order, customer, phone, address, number, district, city, payment, router]);

  const generateOrder = async () => {
    if (isDisabled) {
      toast.error("Preencha os dados obrigatórios do cliente.", {
        position: "bottom-center",
        autoClose: 4000,
      });
      return;
    }

    const data = {
      customer,
      address,
      number: Number(number),
      district,
      city,
      complement,
      phone,
      payment,
      discount: discount || (checkedDiscount ? "Sim" : "Não"),
      checkedDiscount,
      discountPercent: checkedDiscount ? Number(discountPercent) : 0,
      totalDiscounts: checkedDiscount ? totalDiscounts : 0,
      priceWithDiscount: checkedDiscount ? priceWithDiscount : total,
      order,
      total,
      date: currentDate(),
      hours: currentHours(),
    };

    const result = await createOrder(data);
    if (result) {
      router.push(`/order`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          marginBottom: "5vh",
          backgroundColor: "#1976d2",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "4vh", marginLeft: "3vw" }}>
          Detalhes do cliente
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TextField
          sx={{ width: "30vw", marginBottom: "4vh" }}
          label="Nome do cliente"
          variant="standard"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <TextField
          sx={{ width: "20vw", marginBottom: "4vh" }}
          type="tel"
          label="Telefone"
          placeholder="(xx) xxxxx-xxxx"
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", width: "50vw" }}>
          <Box sx={{ position: "relative", width: "30vw", marginBottom: "4vh", marginRight: "5vw" }}>
            <TextField
              fullWidth
              label="Endereço"
              variant="standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>

          <TextField
            sx={{ width: "5vw", marginBottom: "4vh", marginRight: "5vw" }}
            label="Número"
            variant="standard"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <TextField
            sx={{ width: "10vw", marginBottom: "4vh", marginRight: "5vw" }}
            label="Bairro"
            variant="standard"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          <TextField
            sx={{ width: "10vw", marginBottom: "4vh" }}
            label="Cidade"
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
          <TextField
            sx={{ width: "15vw", marginBottom: "4vh" }}
            label="Forma de pagamento"
            placeholder="Dinheiro, cartão, etc"
            variant="standard"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />

          <TextField
            sx={{ width: "15vw", marginBottom: "4vh", marginLeft: "5vw" }}
            label="Desconto?"
            variant="standard"
            placeholder="Sim ou não"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </Box>

        <TextField
          sx={{ width: "40vw", marginBottom: "4vh" }}
          label="Ponto de referência"
          variant="standard"
          placeholder="Próximo a..."
          value={complement}
          onChange={(e) => setComplement(e.target.value)}
        />
      </Box>

      <Box>
        <ButtonBase
          sx={{
            width: "15vw",
            height: "10vh",
            fontSize: "3vh",
            fontWeight: "bold",
            color: "white",
            borderRadius: "5px",
            marginTop: "10vh",
            backgroundColor: isDisabled ? "gray" : "#1976d2",
          }}
          onClick={generateOrder}
          disabled={isDisabled}
        >
          <Typography
            sx={{
              width: "100vw",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "3vh",
            }}
          >
            Finalizar pedido
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
}

export default DeliveryData;
