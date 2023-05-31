import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import CSS from '../styles/app.module.css'

export default function Rating(props:any) {
  const stars = Array(5).fill(0)
  const [value, setValue] = useState(0)
  const [hoverValue, setHoverValue] = useState(0)

  function handleClick(i:number){
    setValue(i)
    props.sendValue(i)
  }

  function hoverEnterHandler(i:number){
    setHoverValue(i)
  }

  function hoverLeaveHandler(){
    setHoverValue(0)
  }

  return (
    <div>
      {stars.map((_, i) => {
        return (
          <FontAwesomeIcon icon={faStar} key={i} color={(hoverValue || value) > i ? 'yellow' : 'white'} className={CSS.starModify} onMouseEnter={() => hoverEnterHandler(i+1)} onMouseLeave={() => hoverLeaveHandler} onClick={() => handleClick(i+1)}/>
        )
      })
      }
    </div>
  )
}
