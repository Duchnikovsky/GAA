import { useState, useEffect } from "react";


export default function CategoryImage(props:any) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const imagePath = props.src;

    import(`../assets/icons/${imagePath}.png`).then((image) => {
      setImageSrc(image.default);
    });
  }, []);

  return (
    <div>
      <img src={imageSrc} alt={props.src}/>
    </div>
  )
}
