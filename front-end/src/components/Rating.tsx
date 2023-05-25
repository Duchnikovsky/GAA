import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import CSS from '../styles/app.module.css'

export default function Rating(props:any) {
  const stars = Array(5).fill(0)
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(props.rating)
  },[props])

  return (
    <div>
      {stars.map((_, i) => {
        return (
          <FontAwesomeIcon icon={faStar} key={i} color={value > i ? 'yellow' : 'white'} className={CSS.star}/>
        )
      })
      }
    </div>
  )
}
