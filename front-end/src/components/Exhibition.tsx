import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Axios from 'axios'
import ExhibitionCSS from '../styles/exhibition.module.css'
import Product from "../layouts/ProductLayout"
import Loading from "./Loading"

export default function Exhibition() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts]:any = useState([])
  const [dlcs, setDlcs]:any = useState([])
  const firstUpdate = useRef(true);
  
  useEffect(() => {
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/getExhibition`,{type: 1})
    .then((result) => {
      setProducts(result.data.products)
      setDlcs(result.data.dlc)
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
        <Loading />
      </div>||<div className={ExhibitionCSS.exhibitionBox}>
        <div className={ExhibitionCSS.header}>RECOMENDED GAMES</div>
        <div className={ExhibitionCSS.productsGrid}>
        {
          products.map((e:any, index:any) => (
            <div key={index}>
              <Product data={{product: e}} index={index}/>
            </div>
          ))
        }
        </div>
        <div className={ExhibitionCSS.header}>RECOMENDED DLC'S</div>
          <div className={ExhibitionCSS.productsGrid}>
          {
            dlcs.map((e:any, index:any) => (
              <div key={index}>
                <Product data={{product: e}} index={index}/>
              </div>
            ))
          }
          </div>
      </div>}
    </div>
  )
}
