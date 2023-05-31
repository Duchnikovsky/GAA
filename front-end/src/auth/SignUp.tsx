import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import AuthCSS from '../styles/auth.module.css'
import Terms from '../components/Terms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'

export default function SignUp() {
  const [values, setValues]:any = useState({
    email: '',
    password: '',
    rep_password: '',
  })
  
  const navigate = useNavigate()

  const [error, setError]:any = useState('')
  const [errorType, setErrorType]:any = useState(0)

  const inputs = [
  {
    id: 1,
    type: 'email',
    name: 'email',
    label: 'E-mail:',
    error: 'Email should match email pattern',
    pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
    maxlenght: 50,
    icon: faUser
  },
  {
    id: 2,
    type: 'password',
    name: 'password',
    label: 'Password:',
    error: 'Password should be 8-18 characters of letters and numbers',
    pattern: '^[A-Za-z0-9]{8,18}$',
    maxlenght: 18,
    icon: faKey
  },
  {
    id: 3,
    type: 'password',
    name: 'rep_password',
    label: 'Repeat password:',
    error: 'Password should be 8-18 characters of letters and numbers',
    pattern: '^[A-Za-z0-9]{8,18}$',
    maxlenght: 18,
    icon: faKey
  }]
  
  function handleChange(e:any){
    setValues({...values, [e.target.name]: e.target.value})
  }

  function handleSubmit(e:any){
    e.preventDefault()
    let email = values['email']
    let pass1 = values['password']
    let pass2 = values['rep_password']
    if(email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') && email.length > 3 && email.length <= 50){
      if(pass1.length > 7 && pass1.length < 19){
        if(e.target.form[3].checked === true){
          if(pass1 === pass2){
            Axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`,{email: values['email'], password: pass1})
            .then((result) => {
              if(result.data.type === 0){
                setError(result.data.message)
                setErrorType(0)
                setTimeout(() => {
                  setError('')
                },2000)
              }else if(result.data.type === 1){
                setErrorType(1)
                setError(result.data.message)
                setTimeout(() => {
                  setError('')
                  navigate('/auth')
                },2000)
              }
            })
          }else{
            setError("Passwords do not match")
            setTimeout(() => {
              setError('')
            },2000)
          }
        }
      }
    }
  }

  return (
    <div className={AuthCSS.main}>
      <div className={AuthCSS.form}>
          <div className={AuthCSS.errorBox}>
            {error.length > 0 && <>
              {errorType === 0 && <span className={AuthCSS.errorText}>{error}</span> || <span className={AuthCSS.successText}>{error}</span>}
            </>}
          </div>
          <form>
            {
              inputs.map((e,index) => (
                <div key={index} className={AuthCSS.inputBox}>
                  <span className={AuthCSS.label}>{e.label}</span><br></br>
                  <input type={e.type} name={e.name} value={values[e.name]} required pattern={e.pattern} maxLength={e.maxlenght} onChange={(e)=>{handleChange(e)}} className={AuthCSS.input}></input>
                  <i><FontAwesomeIcon icon={e.icon}/></i>
                  <div className={AuthCSS.inputError}>
                    <span>{e.error}</span>
                  </div>
                </div>
              ))
            }
            <div className={AuthCSS.checkboxBox}>
              <div className={AuthCSS.checkboxBoxBoxXD}>
                <input type='checkbox' name="checkbox" required className={AuthCSS.checkbox}></input>
              </div>
              <div className={AuthCSS.checkboxTextBox}>
                <span className={AuthCSS.checkboxText}>I accept terms and conditions</span>
              </div>
            </div>
            <div className={AuthCSS.submitBox}>
              <button className={AuthCSS.button} onClick={(e) => handleSubmit(e)}>Sign up</button>
            </div>
          </form>
      </div>
      <div className={AuthCSS.terms}>
        <Terms />
      </div>
    </div>
  )
}
