import { useEffect, useRef, useState } from "react"
import Loading from "../components/Loading"
import CSS from '../styles/cart.module.css'
import Axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { useNavigate } from "react-router-dom"
import ProductImage from "../components/ProductImage"


export default function Cart() {
  const [loading, setLoading] = useState(true)
  const [cart, setCart]:any = useState([])
  const [summaryPrice, setSummaryPrice] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)

  const firstLoad = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/getCart`,{},{withCredentials:true})
    .then((result) => {
      if(result.data.type === 1){
        setCart(result.data.cart)
        setSummaryPrice(0)
        result.data.cart.map((e:any) => (
          setSummaryPrice(prevState => prevState + e.product.price)
        ))
      }else if(result.data.type === 0){
        navigate('/auth')
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
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/removeFromCart`,{id: cart[index].id})
    .then((result) => {
      if(result.data.type === 1){
        const newData = cart.filter((_:any, i:any) => i !== index)
        setCart(newData)
        setSummaryPrice(prevState => prevState - e.price)
      }
    })
  }

  function paymentsHandler(){
    setButtonDisabled(true)
    setPaymentDone(false)
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/payment`,{cart: cart, cost: summaryPrice},{withCredentials: true})
    .then((result) => {
      if(result.data.type === 1){
        setSummaryPrice(0)
        setCart([])
        setPaymentDone(true)
        setTimeout(() => {
          navigate('/auth')
        },1000)
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
                <div>
                  <ProductImage src={e.product.image} type={e.product.type} origin={'cart'}/>
                </div>
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
              {buttonDisabled && <>
                <button className={CSS.button} disabled>
                {paymentDone && <>PAYMENT DONE</>
                || <>CHECKING PAYMENT</>}
                </button> 
              </>
              || <button className={CSS.button} onClick={paymentsHandler}>GO TO PAYMENTS</button>}
            </div>
          </div>
        </div>
        ||<div className={CSS.missingDiv}>
          <FontAwesomeIcon icon={faCircleInfo} /><br></br>
          <span className={CSS.missingText}>YOUR SHOPPING CART IS EMPTY</span>
        </div>}
      </div>}
    </div>
  )
}
