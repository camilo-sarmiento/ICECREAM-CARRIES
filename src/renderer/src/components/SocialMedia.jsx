import video from '../assets/VIDEO/ANIMATION DESING_001.mp4'
import POSTER_DESING from '../assets/IMG/POSTER_DESING.jpg'
import poster_01 from '../assets/IMG/POSTER_MENTA.png'
import poster_02 from '../assets/IMG/POSTER_FRESA.png'
import poster_03 from '../assets/IMG/POSTER_PINA.png'

import '../styles/SocialMedia.scss'

import { useState, useEffect, useRef } from 'react'
export default function SocialMedia() {
  const screen = useRef(null)
  const img_item = [POSTER_DESING, poster_01, poster_02, poster_03]
  const [img, setImg] = useState(img_item[0])

  let count = 0
  useEffect(() => {
    const changeColor = () => {
      setImg(img_item[count])
      count++
      if (count == img_item.length) count = 0
    }

    const interval = setInterval(changeColor, 3000) // Cambia de color cada segundo

    return () => {
      clearInterval(interval) // Limpia el interval al desmontar el componente
    }
  }, [])

  return (
    <>
      <div className="section">
        <div className="description">
          <h1>Descubre el placer</h1>
          <p>
            Disfruta de este delicioso postre después de cada comida sin preocuparte por el mal
            aliento o la acumulación de bacterias en la boca. Hemos creado una experiencia única que
            no solo satisface tu gusto por los helados, sino que también promueve la higiene bucal,
            permitiéndote disfrutar de un placer dulce mientras cuidas de tu sonrisa.
          </p>
        </div>
        <div className="post-layout">
          <div className="screen" ref={screen} style={{ background: `url(${img})` }}></div>
          <div className="list">
            <div style={{ background: `url(${POSTER_DESING})` }}></div>
            <div style={{ background: `url(${poster_01})` }}></div>
            <div style={{ background: `url(${poster_02})` }}></div>
            <div style={{ background: `url(${poster_03})` }}></div>
            <div style={{ background: `url(${POSTER_DESING})` }}></div>
            <div style={{ background: `url(${poster_01})` }}></div>
            <div style={{ background: `url(${poster_02})` }}></div>
            <div style={{ background: `url(${poster_03})` }}></div>
          </div>
        </div>
      </div>
      <div className="section">
        <video src={video} autoPlay loop></video>
      </div>
    </>
  )
}
