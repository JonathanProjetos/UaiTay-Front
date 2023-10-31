"use client"
import React, { useState, useMemo } from 'react'
import Context from './Context'

function Provider({ children }) {
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [listProducts, setListProducts] = useState([]);

  const data = useMemo(() => ({
    setOrder,
    order,
    setTotal,
    total,
    setListProducts,
    listProducts
  }), [order, total, listProducts])

  return (
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  )
}

export default Provider