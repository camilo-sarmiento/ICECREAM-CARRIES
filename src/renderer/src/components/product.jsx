import producto_menta from '../assets/IMG/ICECREAM_MENTA.png'
import producto_fresa from '../assets/IMG/ICECREAM_FRESA.png'
import producto_pina from '../assets/IMG/ICECREAM_PINA.png'
import { useContext, useEffect, useState } from 'react'
import Context from '../context/StaticContext'
import starOn from '../assets/IMG/StarOn.svg'
import starOff from '../assets/IMG/StarOff.svg'
import '../styles/product.scss'

export default function product({ data }) {
  const img = [producto_menta, producto_fresa, producto_pina]
  const { name, description, rate } = data
  const { total } = useContext(Context)
  const [stars, setstars] = useState([])

  const claves = Object.keys(total).filter((key) => key.startsWith(name))
  let value = 0
  let cant = 0
  claves.forEach((key) => {
    value += total[key].price
    cant += total[key].cant
    // data[name].list.value += total[key]
  })
  const formatValue = value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'COP'
  })
  console.log(total)
  useEffect(() => {
    const newValue = []
    for (let i = 0; i < 6; i++) {
      let obj
      if (i + 1 <= rate) {
        obj = <object data={starOn} type="image/svg+xml" className="icon" key={i}></object>
      } else {
        obj = <object data={starOff} type="image/svg+xml" className="icon" key={i}></object>
      }
      newValue.push(obj)
    }
    setstars(newValue)
  }, [data])
  return (
    <div className="producto">
      <div className="background">
        <div className="img">
          <img src={img[data.IMG]} alt="" />
          <div className="counterShop flex-c">
            <p>{cant}</p>
          </div>
        </div>
        <div className="info">
          <div className="stars flex-c">{stars}</div>
          <h2 className="name">{name} </h2>
          <p>{description} </p>
          <div className="price_P">$ {formatValue}</div>
        </div>
      </div>
    </div>
  )
}
