"use client"
import React, { useState, useMemo } from 'react'
import Context from './Context'

function Provider({ children }) {
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [priceWithDiscount, setPriceWithDiscount] = useState(0)
  const [totalDiscounts, setTotalDiscounts] = useState(0)
  const [listProducts, setListProducts] = useState([]);
  const [checkedDiscount, setCheckedDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState('');
  

  const data = useMemo(() => ({
    setOrder,
    order,
    setTotal,
    total,
    setListProducts,
    listProducts,
    setTotalDiscounts,
    totalDiscounts,
    setPriceWithDiscount,
    priceWithDiscount,
    setCheckedDiscount,
    checkedDiscount,
    discountPercent,
    setDiscountPercent
  }), [
    order, 
    total, 
    listProducts, 
    priceWithDiscount, 
    totalDiscounts, 
    checkedDiscount,
    discountPercent
  ])

  return (
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  )
}

export default Provider