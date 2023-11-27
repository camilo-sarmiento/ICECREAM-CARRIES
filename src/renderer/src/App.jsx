// import portada from './assets/IMG/ICECREAM_PORT_001.jpg'
import portada from './assets/VIDEO/ANIMATION DESING_002.mp4'

import data from './database/ice.json'

import ItemShop from './components/item-shop'
import Product from './components/product'
import SocialMedia from './components/SocialMedia'
import Checkout from './components/checkout'

import { useContext, useState, useEffect } from 'react'
import Context from './context/StaticContext'

function App() {
  const { shop, setShop } = useContext(Context)
  const { menta } = data

  const [selectIce, setSelectIce] = useState('menta')
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
    console.log(inputs)
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false
      inputs[i].nextSibling.firstElementChild.id = ''
    }
    Object.keys(item).forEach((key) => {
      item[key] = false
    })
    setSelectIce(e.target.id)
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
          <h1>POST</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta suscipit modi et
            accusamus eum delectus libero maiores. Excepturi, quam nostrum. Harum reprehenderit
            voluptate dolorem sed consequatur veniam eaque expedita dignissimos.
          </p>
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
        <div className="section_1">
          <Product data={data[selectIce].info}></Product>
        </div>
        <div className="section_2">
          <input
            type="radio"
            name="c"
            id="menta"
            className="contrloList"
            onInput={handleChangeIces}
          />
          <input
            type="radio"
            name="c"
            id="fresa"
            className="contrloList"
            onInput={handleChangeIces}
          />
          <input
            type="radio"
            name="c"
            id="piña"
            className="contrloList"
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
            <h1 style={{ textTransform: 'uppercase' }}>Helados Carrie`s</h1>
            <p>
              Descubre la exquisita experiencia de Carries, donde cada helado es una obra maestra de
              sabor y creatividad. Sumérgete en un mundo de frescura con nuestras innovadoras
              combinaciones, desde el refrescante Fresco Mint Delight hasta la explosión tropical de
              Piña Tropical Explosion. Con ingredientes de la más alta calidad y presentaciones
              únicas, los helados Carries son una invitación a disfrutar momentos dulces e
              inolvidables. Deleita tus sentidos con cada bocado y deja que Carries te lleve a un
              viaje de placer helado como ningún otro.
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
        <Checkout></Checkout>
      </section>
    </div>
  )
}

export default App
