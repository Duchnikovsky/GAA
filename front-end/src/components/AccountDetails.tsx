import { useState } from 'react'
import ProfileCSS from '../styles/profile.module.css'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AccountDetails(props:any) {
  const [formVisible, setFormVisible] = useState(false)
  const navigate = useNavigate()

  const [values, setValues]:any = useState({
    prevPass: '',
    newPass: '',
    repNewPass: '',
  })

  const [error, setError]:any = useState('')

  const inputs = [
    {
      id: 1,
      type: 'password',
      name: 'prevPass',
      label: 'Current password:',
      error: 'Password should be 8-18 characters of letters and numbers',
      pattern: '^[A-Za-z0-9]{8,18}$',
      maxlenght: 18,
      icon: faKey
    },
    {
      id: 2,
      type: 'password',
      name: 'newPass',
      label: 'New password:',
      error: 'Password should be 8-18 characters of letters and numbers',
      pattern: '^[A-Za-z0-9]{8,18}$',
      maxlenght: 18,
      icon: faKey
    },
    {
      id: 3,
      type: 'password',
      name: 'repNewPass',
      label: 'Repeat new password:',
      error: 'Password should be 8-18 characters of letters and numbers',
      pattern: '^[A-Za-z0-9]{8,18}$',
      maxlenght: 18,
      icon: faKey
  }]

  function handleChange(e:any){
    setValues({...values, [e.target.name]: e.target.value})
  }


  function handleButton(){
    setFormVisible(!formVisible)
    setValues({
      prevPass: '',
      newPass: '',
      repNewPass: '',
    })
    setError('')
  }
  
  function handleSubmit(e:any){
    e.preventDefault()
    let email = props.data.Email
    let prevPass = values['prevPass']
    let newPass = values['newPass']
    let repNewPass = values['repNewPass']
    if(prevPass.length >= 8 && prevPass.length <= 18 && newPass.length >= 8 && newPass.length <= 18 && repNewPass.length >= 8 && repNewPass.length <= 18){
      if(newPass === repNewPass){
        Axios.post('http://localhost:3001/changePassword',{email: email, prev: prevPass, new: newPass},{withCredentials: true})
        .then((result)=> {
          if(result.data.type === 1){
            setError(result.data.message)
            setTimeout(() => {
              setError('')
              setFormVisible(false)
              navigate('/')
            },500)
          }else if(result.data.type === 0){
            setError(result.data.message)
            setTimeout(() => {
              setError('')
            },2000)
          }
        })
      }else{
        setError("Password do not match")
        setTimeout(() => {
          setError('')
        },2000)
      }
    }
  }

  return (
    <div>
      <span className={ProfileCSS.containerHeader}>ACCOUNT DETAILS</span><br></br>
      <div className={ProfileCSS.dataContainer}>
      <span className={ProfileCSS.dataLabel}>EMAIL</span><br></br>
      <span className={ProfileCSS.data}>{props.data.Email}</span><br></br>
        {formVisible && <div>
          <form>
          {
          inputs.map((e, index)=>(
            <div key={index} className={ProfileCSS.inputBox}>
              <span className={ProfileCSS.label}>{e.label}</span><br></br>
              <input type={e.type} name={e.name} value={values[e.name]} required pattern={e.pattern} maxLength={e.maxlenght} onChange={(e)=>{handleChange(e)}} className={ProfileCSS.input}></input>
              <i><FontAwesomeIcon icon={e.icon}/></i>
              <div className={ProfileCSS.inputError}>
                <span>{e.error}</span>
              </div>
            </div>
          ))
          }
          <div className={ProfileCSS.submitBox}>
            <button className={ProfileCSS.submitButton} onClick={(e) => handleSubmit(e)}>Confirm</button>
          </div>
          </form>
          <div className={ProfileCSS.submitBox}>
            <button className={ProfileCSS.cancelButton} onClick={handleButton}>Cancel</button>
          </div>
          {error.length > 0 && <div className={ProfileCSS.errorBox}>
            {error}
          </div>}
        </div> || <div>
          <button className={ProfileCSS.passButton} onClick={handleButton}>Change password</button>
        </div>}
      </div>
    </div>
  )
}
