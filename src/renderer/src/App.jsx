// import portada from './assets/IMG/ICECREAM_PORT_001.jpg'
import portada from './assets/VIDEO/ANIMATION DESING_002.mp4'

import data from './database/ice.json'

import ItemShop from './components/item-shop'
import Product from './components/product'
import SocialMedia from './components/SocialMedia'
import Checkout from './components/checkout'

import { useContext, useState, useEffect } from 'react'
import Context from './context/StaticContext'
import Envoice from './components/envoice'

function App() {
  const { shop, setShop, total } = useContext(Context)
  const { menta } = data

  const [selectIce, setSelectIce] = useState('menta')
  const [isEnvoice, setIsEvoice] = useState(false)
  const [item, setItem] = useState({})

  useEffect(() => {
    const updatedItem = {}
    for (let i = 0; i < Object.keys(menta).length; i++) {
      updatedItem['shop' + i] = false
    }
    setItem(updatedItem)
  }, [])

  const handleChangeIces = (e) => {
    const inputs = document.querySelectorAll('#listItem input[type=checkbox]')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false
      inputs[i].nextSibling.firstElementChild.id = ''
    }
    Object.keys(item).forEach((key) => {
      item[key] = false
    })

    setSelectIce(e.target.id)
    const label = document.querySelectorAll(`.control_list`)

    label.forEach((item) => {
      if (item.htmlFor == e.target.id) {
        item.className += ' iceCheck'
      } else {
        item.className = 'control_list'
      }
    })
  }
  const handleChange = (e) => {
    const obj = e.target.nextSibling.firstElementChild
    setItem((prevItem) => {
      return {
        ...prevItem,
        [e.target.id]: !prevItem[e.target.id]
      }
    })
    if (e.target.checked) {
      setShop(shop + 1)
      obj.id = 'checked'
    } else {
      setShop(shop - 1)
      obj.id = ''
    }
  }
  return (
    <div className="container">
      <section id="header">
        {/* <img src={portada} alt="" /> */}
        <video src={portada} autoPlay controls={false} loop></video>
        <div id="name">
          <h1>¡Tu sonrisa merece lo mejor!</h1>
        </div>
        <div className="tile"></div>
      </section>
      <section id="post">
        <SocialMedia></SocialMedia>
      </section>
      <section id="story">
        <div className="description">
          <h1>transformando tu postre</h1>
          <p>
            Experiencia indulgente y deliciosa a través de un helado revolucionario, al tiempo que
            respeta la salud dental de los consumidores. Esta creación única responde a la
            preocupación asociada con los helados, que a menudo contienen azúcares refinados e
            ingredientes que pueden tener efectos adversos en el esmalte dental. <br />
            <br />
            Cada sorbo es sin culpa, priorizando tu sonrisa. <br />
          </p>
          <div className="list">
            <p>
              <span>Con ingredientes como:</span> <br /> <br /> <strong>Calcio y Fósforo</strong>{' '}
              Para fortalecer huesos y dientes.
            </p>
            <p>
              <span>Enriquecido con:</span> <br />
              <br /> <strong>Xilitol y Fluoruro</strong> Para el cuidado dental.
            </p>
          </div>
        </div>
        <div className="slider">
          <div className="img-1"></div>
          <div className="img-2"></div>
          <div className="img-3"></div>
          <div className="img-1"></div>
          <div className="img-2"></div>
          <div className="img-3"></div>
          <div className="img-1"></div>
          <div className="img-2"></div>
          <div className="img-3"></div>
        </div>
      </section>
      <section id="store">
        <section
          id="data_print"
          style={isEnvoice ? { height: '100%', opacity: '1' } : { height: '0', opacity: '0' }}
        >
          <Envoice></Envoice>
        </section>
        <div className="section_1">
          <Product data={data[selectIce].info}></Product>
        </div>
        <div className="section_2">
          <input
            type="radio"
            name="c"
            id="menta"
            className="controlList"
            onInput={handleChangeIces}
          />
          <input
            type="radio"
            name="c"
            id="fresa"
            className="controlList"
            onInput={handleChangeIces}
          />
          <input
            type="radio"
            name="c"
            id="piña"
            className="controlList"
            onInput={handleChangeIces}
          />
          <div id="sectionControl">
            <label htmlFor="menta" className="control_list">
              Menta
            </label>
            <label htmlFor="fresa" className="control_list">
              Fresa
            </label>
            <label htmlFor="piña" className="control_list">
              Piña
            </label>
          </div>
          <div className="description">
            <h1 style={{ textTransform: 'uppercase' }}>¡Pruébalo hoy!</h1>
            <p>
              Explora la nueva era de indulgencia con nuestro helado, una experiencia única que
              cuida de tu salud dental. una deliciosa alternativa que mima tu paladar mientras
              protege tus dientes. En lugar de azúcares refinados, optamos por endulzantes más
              naturales y amigables con los dientes.
            </p>
          </div>
          <div className="product-list" id="listItem">
            <form action="" className="formItems">
              {data[selectIce].list.map((element, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    name={selectIce + i}
                    id={selectIce + i}
                    onChange={handleChange}
                  />
                  <label htmlFor={selectIce + i} className={selectIce + i}>
                    <ItemShop
                      props={element}
                      index={selectIce + i}
                      control={item[selectIce + i]}
                      color={data[selectIce].info.color}
                    ></ItemShop>
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
        <Checkout envoice={isEnvoice} setEnvoice={setIsEvoice}></Checkout>
      </section>
    </div>
  )
}

export default App
