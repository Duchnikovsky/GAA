import { useState, useEffect } from "react"
import ribbon from '../assets/images/dlcribbon.png'
import CSS from '../styles/productLayout.module.css'

export default function ProductImage(props:any) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const imagePath = props.src;
    import(`../assets/images/${imagePath}.png`).then((image) => {
      setImageSrc(image.default);
    });
  }, []);
  
  return (
    <div className={CSS.imageBox}>
      <img src={imageSrc} alt={props.src} height={'170px'}/>
      {props.type === 2 && <img src={ribbon} alt='dlc' className={CSS.smallRibbon}/>}
    </div>
  )
}
