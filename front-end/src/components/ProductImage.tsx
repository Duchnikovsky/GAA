import { useState, useEffect } from "react"
import ribbon from '../assets/images/dlcribbon.png'
import CSS from '../styles/productLayout.module.css'

export default function ProductImage(props:any) {
  const [imageSrc, setImageSrc] = useState("");
  const [size, setSize] = useState('120px')

  useEffect(() => {
    const imagePath = props.src;
    import(`../assets/images/${imagePath}.png`).then((image) => {
      setImageSrc(image.default);
      if(props.origin === 'cart'){
        setSize('170px')
      }else if(props.origin === 'orders'){
        setSize('120px')
      }
    });
  }, []);
  
  return (
    <div className={CSS.imageBox}>
      <img src={imageSrc} alt={props.src} height={size} className={CSS.productImage}/>
      {props.type === 2 && <img src={ribbon} alt='dlc' className={CSS.smallRibbon}/>}
    </div>
  )
}
