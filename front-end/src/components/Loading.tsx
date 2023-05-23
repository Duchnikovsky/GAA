import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CSS from '../styles/app.module.css'

export default function Loading() {
  return (
    <div className={CSS.spinDiv}>
      <FontAwesomeIcon icon={faRotate} spin/>
    </div>
  )
}
