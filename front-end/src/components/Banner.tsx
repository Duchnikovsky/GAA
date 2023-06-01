import { Link } from 'react-router-dom'
import CSS from '../styles/home.module.css'
import { useEffect, useRef, useState } from 'react'

export default function Banner() {
  const timerRef = useRef<null | NodeJS.Timeout>(null)
  const [index, setIndex] = useState(0)
  const [slides, setSlides] = useState([
    {url: 'banner1', src: '', title: 'Star Wars Jedi: Survivor'},
    {url: 'banner2', src: '', title: 'Lost ark'},
    {url: 'banner3', src: '', title: 'Assassins Creed Mirage'},
  ])

  useEffect(() => {
    slides.map((_, i:any) => (
      import(`../assets/banners/${slides[i].url}.png`).then((image) => {
        const newSlides = [...slides]
        newSlides[i].src = image.default
        setSlides(newSlides)
      })
    ))
  },[])

  function goNext(){
    setIndex((current) => {
      return current === 2 ? current=0 : current + 1
    })
  }
  
  // function goBack(){
  //   setIndex((current) => {
  //     return current === 0 ? current=2 : current - 1
  //   })
  // }

  useEffect(() => {
    if(timerRef.current){
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      goNext()
    }, 5000)

  })

  return (
    <div className={CSS.banner}>
      <div className={CSS.slide}>
      <Link to={`/products/${encodeURIComponent(slides[index].title.replace(/ /g, '_'))}`}   className={CSS.link}>
        <img src={slides[index].src} alt='banner12' height={'298px'} width={'998px'}></img>
        </Link>
      </div>
    </div>
  )
}
