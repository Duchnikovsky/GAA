import { useState, useEffect } from 'react';
import productCSS from '../styles/productLayout.module.css'
import { Link } from 'react-router-dom'
import ribbon from '../assets/images/dlcribbon.png'

export default function Product(props:any) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const imagePath = props.data.product.image;
    import(`../assets/images/${imagePath}.png`).then((image) => {
      setImageSrc(image.default);
    });
  }, []);
  
  return (
    <div>
      <Link to={`/products/${encodeURIComponent(props.data.product.title.replace(/ /g, '_'))}`} className={productCSS.link}>
      <div key={props.index} className={productCSS.productBox}>
        <img src={imageSrc} alt={props.data.product.title} className={productCSS.image}/>
        {props.data.product.type === 2 && <img src={ribbon} alt='dlc' className={productCSS.ribbon}/>}
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
