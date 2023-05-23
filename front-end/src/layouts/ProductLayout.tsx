import productCSS from '../styles/productLayout.module.css'
import { Link } from 'react-router-dom'

export default function Product(props:any) {
  
  return (
    <div>
      <Link to={`/products/${encodeURIComponent(props.data.product.title.replace(/ /g, '_'))}`} className={productCSS.link}>
      <div key={props.index} className={productCSS.productBox}>
        <img src={`/assets/${props.data.product.image}.png`} alt={props.data.product.title} className={productCSS.image}/>
        <div className={productCSS.hoverDiv}>
          <div className={productCSS.hoverTitleDiv}>
            {props.data.product.title}
          </div>
          <div className={productCSS.hoverDesDiv}>
            {props.data.product.description}
          </div>
        </div>
        <div className={productCSS.nameDiv}>
          {props.data.product.title}
        </div>
        <div className={productCSS.priceDiv}>
          {props.data.product.price}$
        </div>
      </div>
      </Link>
    </div>
  )
}
