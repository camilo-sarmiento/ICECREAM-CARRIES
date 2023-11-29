/* eslint-disable react/prop-types */
import { useContext, useRef, useEffect } from 'react'
import Context from '../context/StaticContext'
import '../styles/checkout.scss'

export default function Checkout({ envoice, setEnvoice }) {
  const { total } = useContext(Context)
  const bar = useRef(null)

  const keys = Object.keys(total).filter((key) => key !== 'all')
  let cantidad_total = 0
  keys.forEach((key) => {
    cantidad_total += total[key].cant
  })
  useEffect(() => {
    const range = {
      min: 102,
      max: 500
    }
    bar.current.style.width = `${cantidad_total / 3 + range.min}%`
  }, [total])
  const formatValue = total.all.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'COP'
  })
  return (
    <div
      className="checkout"
      onClick={() => {
        setEnvoice(!envoice)
      }}
    >
      <div className="label">Comprar</div>
      <div className="data">
        <div className="cantidad">
          <span>Cantidad</span> <br />
          {cantidad_total}
        </div>
        <span className="line"></span>
        <div className="price">
          <span>Total</span> <br />
          {formatValue}
        </div>
        <div className="bar" ref={bar}></div>
      </div>
    </div>
  )
}
