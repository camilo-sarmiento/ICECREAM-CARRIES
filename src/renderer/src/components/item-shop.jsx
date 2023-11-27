import { useContext, useState, useRef, useEffect } from 'react'
import Context from '../context/StaticContext'
import iconShop from '../assets/IMG/carrito.svg'
import '../styles/itemShop.scss'
/* eslint-disable react/prop-types */
export default function ItemShop({ props, index, control, color }) {
  const { total, setTotal, cantidad, setCantidad } = useContext(Context)
  const thumb = useRef(null)
  const second = useRef(null)
  const input = useRef(null)
  const inputValue = useRef(null)
  const { name, type, info, data } = props
  const [value, setValue] = useState(0)

  let menu
  let cant
  const controlThumb = () => {
    if (!total[index]) return
    const pos = total[index].cant
    thumb.current.style.left = pos + '%'
    thumb.current.style.transform = `translateX(-${100 * (pos / 100)}%)translateY(-50%)`
    second.current.style.transform = `rotate(${360 * (pos / 100)}deg)`
  }
  const handleChangeValue = (e) => {
    const rawValue = e.target.textContent
    const newValue = parseInt(rawValue.replace(/\D/g, ''))
    if (newValue >= 100) return

    input.current.value = newValue
    const oldValue = parseInt(value)

    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setValue(newValue)
      controlThumb()
    }

    if (newValue < oldValue) {
      setCantidad(cantidad - (oldValue - newValue))
    } else {
      setCantidad(cantidad + (newValue - oldValue))
    }
  }

  const handleChange = (e) => {
    const oldValue = parseInt(value)
    const newValue = parseInt(e.target.value)

    if (thumb.current.className == 'value') {
      thumb.current.className += ' thumb'
    }
    controlThumb()

    setValue(newValue)
    inputValue.current.innerText = newValue
    const isAdd = newValue > oldValue
    const newCant = !isAdd ? cantidad - (oldValue - newValue) : cantidad + (newValue - oldValue)

    setTotal((prevTotal) => {
      const newTotal = { ...prevTotal }
      console.log({
        isAdd,
        newValue,
        data: data[2],
        prevTotal: prevTotal[index],
        oldValue
      })

      if (isAdd || !prevTotal[index]) {
        // Si es una adición o prevTotal[index] no está definido
        newTotal[index] = {
          price: newValue * data[2],
          cant: newValue
        }
      } else {
        // Si es una resta y prevTotal[index] está definido
        newTotal[index] = {
          price: prevTotal[index].price - (oldValue - newValue) * data[2],
          cant: newValue
        }
      }

      let sum = 0
      for (const key in newTotal) {
        if (key !== 'all') {
          sum += newTotal[key].price
        }
      }
      newTotal['all'] = sum

      return newTotal
    })
    setCantidad(newCant)
  }

  useEffect(() => {
    if (!thumb.current || !input.current) return
    const cantidad_log = total[index] ? total[index].cant : '00'
    inputValue.current.innerText = cantidad_log
    input.current.value = cantidad_log

    thumb.current.style.left = cantidad_log + '%'
    thumb.current.style.transform = `translateX(-${100 * (cantidad_log / 100)}%)translateY(-50%)`
    second.current.style.transform = `rotate(${360 * (cantidad_log / 100)}deg)`
  }, [control])

  if (!control) {
    const formatValue = data[2].toLocaleString('es-ES', {
      style: 'currency',
      currency: 'COP'
    })
    menu = (
      <>
        <p>{info}</p>
        <div className="data">
          <ul>
            {data.map((item, i) => (
              <li key={i}>{i == 2 ? `$ ${formatValue}` : item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  } else {
    cant = (
      <>
        <div className="P-slider">
          <input
            ref={input}
            type="range"
            className="C-cant"
            min={0}
            max={100}
            onInput={handleChange}
            onBlur={() => {
              console.log('first')
            }}
            id={index}
            onMouseLeave={() => {
              thumb.current.children[0].children[0].className = 'center'
              thumb.current.className = 'value'
              setTimeout(() => {
                console.log('clear')
              }, 500)
            }}
            onMouseEnter={() => {
              console.log(thumb.current.children[0].children[0])
              thumb.current.children[0].children[0].className += ' shadow'
            }}
            defaultValue={total[index] ? total[index] : 0}
          />
          <div className="value" ref={thumb} id="thumb" style={{ transform: 'translateT(-50%)' }}>
            <div className="aro flex-c">
              <div className="center"></div>
              <div className="around" ref={second}></div>
            </div>
          </div>
        </div>
        <div
          ref={inputValue}
          className="E-value"
          contentEditable="true"
          onInput={handleChangeValue}
          onClick={(e) => {
            e.preventDefault()
            e.target.focus()
          }}
        ></div>
      </>
    )
  }
  return (
    <div className="item">
      <div className="name flex-c" style={{ color: color }}>
        <h3>{name}</h3>
        <p>{type}</p>
      </div>
      {menu}
      <div className="check flex-c">
        <object data={iconShop} type="image/svg+xml" className="icon"></object>
        {cant}
      </div>
    </div>
  )
}
