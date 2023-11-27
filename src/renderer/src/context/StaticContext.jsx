/* eslint-disable react/prop-types */
import data from '../database/ice.json'

import React, { useState } from 'react'

const Context = React.createContext({})

export function ProductProvider({ children }) {
  const db = data
  const [shop, setShop] = useState(0)
  const [total, setTotal] = useState({ all: 0 })
  const [cantidad, setCantidad] = useState(0)

  return (
    <Context.Provider value={{ shop, setShop, total, setTotal, cantidad, setCantidad, db }}>
      {children}
    </Context.Provider>
  )
}

export default Context
