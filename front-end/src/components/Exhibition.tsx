import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Axios from 'axios'
import { faRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ExhibitionCSS from '../styles/exhibition.module.css'

export default function Exhibition() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts]:any = useState([])
  const firstUpdate = useRef(true);
  
  useEffect(() => {
    Axios.post('http://localhost:3001/getExhibition')
    .then((result) => {
      setProducts(result.data.products)
    })
  },[])

  useLayoutEffect(()=>{
    if(firstUpdate.current){
      firstUpdate.current = false
      return
    }
    setLoading(false)
  },[products])


  return (
    <div>
      {loading && <div>
        <div className={ExhibitionCSS.spinDiv}>
          <FontAwesomeIcon icon={faRotate} spin/>
        </div>
      </div>||<div className={ExhibitionCSS.exhibitionBox}>
        {
          products.map((e:any, index:any) => (
            <div key={index} className={ExhibitionCSS.productBox}>
              <img src={`/assets/${e.product.image}.png`} alt={e.product.title} className={ExhibitionCSS.image}/>
              <div className={ExhibitionCSS.hoverDiv}></div>
              <div className={ExhibitionCSS.nameDiv}>
                {e.product.title}
              </div>
              <div className={ExhibitionCSS.priceDiv}>
                {e.product.price}$
              </div>
            </div>
          ))
        }
      </div>}
    </div>
  )
}
