"use client"
import React, { useState, useEffect } from 'react';
import { requestMenuProducts } from '../api/request';
import ListProducts from '../components/ListProducts';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Checkout from './checkout/Checkout';

export default function Home() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await requestMenuProducts();
      setProducts(products);
    }
    fetchProducts();
  },[]);


  return (
    <Box>
        <Header/>
        <ListProducts products={products || []} />
        <Checkout />
    </Box>
  )
}
