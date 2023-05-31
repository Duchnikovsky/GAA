import { useEffect, useState } from 'react'
import ProductImage from './ProductImage'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import CSS from '../styles/profile.module.css'

export default function Shoppings(props:any) {
  const [imageSrc, setImageSrc] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/getProductImage`,{id: props.product})
    .then((result) => {
      setImageSrc(result.data.src.image)
      setLoading(false)
    })
  },[])

  return (
    <div>
      {loading && <div className={CSS.spinner}>
        <FontAwesomeIcon icon={faRotate} spin/>
      </div> || <ProductImage src={imageSrc} origin={'orders'}/>}
    </div>
  )
}
