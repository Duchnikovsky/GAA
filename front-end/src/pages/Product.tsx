import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../components/Loading"
import Axios from 'axios'
import CSS from '../styles/product.module.css'
import Rating from "../components/Rating"

export default function Product() {
  const { name } = useParams()
  const nameDecoded = name ? decodeURIComponent(name.replace(/_/g, ' ')) : ''
  const [loading, setLoading] = useState(true)
  const [data, setData]:any = useState([])
  const firstUpdate = useRef(true);
  
  useEffect(() => {
    setLoading(true)
    Axios.post('http://localhost:3001/getProduct',{name: nameDecoded},{withCredentials: true})
    .then((result) => {
      setData(result.data)
    })
  },[nameDecoded])

  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false
      return
    }
    setLoading(false)
  },[data])


  return (
    <div>
      {loading && <div>
        <Loading />
      </div> || <div className={CSS.main}>
        <div className={CSS.imageBox}>
          <img src={`/assets/${data.product.image}.png`} alt={data.product.image}  className={CSS.image}/>
        </div>
        <div>
          <div className={CSS.titleBox}>
            <span className={CSS.title}>{data.product.title}</span><br></br>
            <div className={CSS.properties}><b>Producent:</b> {data.product.producent.name}</div>
            <div className={CSS.description}><b>Description:</b> {data.product.description}</div>
          </div>
          <div className={CSS.ratingBox}>
            <div className={CSS.ratingTextBox}>
              <b>Average users rating:</b> 3.72
            </div>
            <div className={CSS.stars}>
            <Rating rating={4}/>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}
