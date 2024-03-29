import { useState, useRef, useEffect } from "react";
import Axios from 'axios'
import { Link, useSearchParams } from "react-router-dom";
import CSS from '../styles/productCategory.module.css'
import Loading from "../components/Loading";
import ProductLayout from "../layouts/ProductLayout";

export default function CardsNSubscriptions() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts]:any = useState([])
  const firstUpdate = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams() 
  const [count, setCount] = useState(0)
  const [error, setError] = useState('')
  
  useEffect(() => {
    setLoading(true)
    let page = searchParams.get('page') || 1
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/getProducts`,{name: 'C/S', page: page, type: 3})
    .then((result) => {
      if(result.data.count !== 0){
        setProducts(result.data.products)
        setCount(result.data.count)
      }else{
        setError('There aren\'t any matching products')
      }
    })
  },[searchParams])

  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false
      return
    }
    setLoading(false)
  },[products])

  function nextPage(){
    const page = searchParams.get('page')
    if(page !== null){
      const current = parseInt(page)
      const next = current + 1
      setSearchParams({page: next.toString()})
    }else{
      const current = 1
      const next = current + 1
      setSearchParams({page: next.toString()})
    }
  }
  
  function previousPage(){
    const page = searchParams.get('page')
    if(page !== null){
      const current = parseInt(page)
      const previous = current - 1
      setSearchParams({page: previous.toString()})
    }
  }

  return (
    <div>
      {loading && <div>
        {error.length > 0 && <div className={CSS.errorDiv}>
          {error}<br></br>
          <Link to='/' className={CSS.link}>Go to home page</Link>
        </div> || <Loading />
        }
      </div>|| <div><div className={CSS.exhibitionBox}>
        <div className={CSS.productsGrid}>
        {
          products.map((e:any, index:any) => (
            <div key={index}>
              <ProductLayout data={{product: e}} index={index}/>
            </div>
          ))
        }
        </div>
      </div>
        <div className={CSS.pageChangeBox}>
          <div className={CSS.buttonsBox}>
            {((searchParams.get('page') || 1) != 1) && <div>
              <button className={CSS.buttonPrev} onClick={previousPage}>Previous page</button>
            </div> || <div>
              <button className={CSS.buttonPrev} disabled>Previous page</button>
            </div>
            }
            {(count/Number((searchParams.get('page') || 1))) > 8 && <div>
              <button className={CSS.buttonNext} onClick={nextPage}>Next page</button>
            </div> || <div>
              <button className={CSS.buttonNext} disabled>Next page</button>
            </div>}
          </div>
        </div>
      </div>}
    </div>
  )
}
