import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Axios from 'axios'
import ExhibitionCSS from '../styles/exhibition.module.css'
import Footer from "./Footer"
import Product from "../layouts/ProductLayout"
import Loading from "./Loading"

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
        <Loading />
      </div>||<div className={ExhibitionCSS.exhibitionBox}>
        <div className={ExhibitionCSS.productsGrid}>
        {
          products.map((e:any, index:any) => (
            <div key={index}>
              <Product data={e} index={index}/>
            </div>
          ))
        }
        </div>
      </div>}
      <Footer />
    </div>
  )
}
