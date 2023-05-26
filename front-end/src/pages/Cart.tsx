import { useEffect, useRef, useState } from "react"
import Loading from "../components/Loading"
import CSS from '../styles/cart.module.css'
import Axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import Footer from "../components/Footer"


export default function Cart() {
  const [loading, setLoading] = useState(true)
  const [cart, setCart]:any = useState([])
  const [summaryPrice, setSummaryPrice] = useState(0)
  const firstLoad = useRef(true)

  useEffect(() => {
    Axios.post('http://localhost:3001/getCart',{},{withCredentials:true})
    .then((result) => {
      if(result.data.type === 1){
        setCart(result.data.cart)
        setSummaryPrice(0)
        result.data.cart.map((e:any) => (
          setSummaryPrice(prevState => prevState + e.product.price)
        ))
      }
    })
  },[])

  useEffect(() => {
    if(firstLoad.current){
      firstLoad.current = false
      return
    }
    setLoading(false)
  },[cart])

  function deleteHandler(e:any, index:any){
    Axios.post('http://localhost:3001/removeFromCart',{id: cart[index].id})
    .then((result) => {
      console.log(result.data)
      if(result.data.type === 1){
        const newData = cart.filter((_:any, i:any) => i !== index)
        setCart(newData)
        setSummaryPrice(prevState => prevState - e.price)
      }else if(result.data.type === 0){
        console.log(result.data.message)
      }
    })
  }

  return (
    <div>
      {loading && <Loading />
      ||<div className={CSS.main}>
        <div className={CSS.header}>CART</div>
        {cart.length > 0 && <div className={CSS.cart}>
          <div className={CSS.list}>
            {
            cart.map((e:any, index:any) => (
              <div className={CSS.listElement} key={index}>
                <img src={`/assets/${e.product.image}.png`} className={CSS.image}/>
                <div className={CSS.informations}>
                  <span className={CSS.title}>{e.product.title}</span><br></br>
                  <span className={CSS.details}><b>Price: </b>{e.product.price} USD</span><br></br><br></br>
                </div>
                <div className={CSS.trashDiv}>
                  <FontAwesomeIcon icon={faTrashCan} className={CSS.trash} onClick={() => deleteHandler(e.product, index)}/><br></br>
                </div>
              </div>
            ))
          }
          </div>
          <div className={CSS.summary}>
            <div className={CSS.summaryText}>
              SUMMARY
            </div>
            <div className={CSS.priceDiv}>
              <div className={CSS.priceLeft}>
                TOTAL PRICE:
              </div>
              <div className={CSS.priceRight}>
                {summaryPrice.toFixed(2)} USD
              </div>
            </div>
            <div className={CSS.buttonDiv}>
              <button className={CSS.button}>GO TO PAYMENTS</button>
            </div>
          </div>
        </div>
        ||<div className={CSS.missingDiv}>
          <FontAwesomeIcon icon={faCircleInfo} /><br></br>
          <span className={CSS.missingText}>YOUR SHOPPING CART IS EMPTY</span>
        </div>}
        <Footer />
      </div>}
    </div>
  )
}
