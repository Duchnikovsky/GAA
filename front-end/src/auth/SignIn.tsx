import { faUser, faKey } from "@fortawesome/free-solid-svg-icons"
import Axios from 'axios'
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import AuthCSS from '../styles/auth.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SignIn() {
  const [values, setValues]:any = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const [error, setError]:any = useState('')

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
    }
  ]

  function handleChange(e:any){
    setValues({...values, [e.target.name]: e.target.value})
  }

  function handleSubmit(e:any){
      e.preventDefault()
      let email = values['email']
      let pass = values['password']
      if(email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') && email.length > 3 && email.length <= 50){
        if(pass.length > 7 && pass.length < 19){
          Axios.post('http://localhost:3001/signin',{email: email, password: pass},{withCredentials: true})
          .then((result)=>{
              if(result.data.type === 0){
                  setError(result.data.message)
                  setTimeout(() => {
                  setError('')
                },2000)
              }else if(result.data.type === 1){
                  setError(result.data.message)
                  setTimeout(() => {
                  setError('')
                  navigate('/')
                  },2000)
              }
          })
        }
      }
    }
  
  return (
    <div>
      <form>
      {
      inputs.map((e, index)=>(
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
      <div className={AuthCSS.submitBox}>
        <button className={AuthCSS.button} onClick={(e) => handleSubmit(e)}>Sign in</button>
      </div>
      <div className={AuthCSS.forgotBox}>
      Forgot password? <NavLink to='/recovery' className={AuthCSS.navLink}>click here</NavLink>
      </div>
      </form>
      <div className={AuthCSS.signupBox}>
        <div className={AuthCSS.signupText}>
        Don't have accout? <NavLink to='/sign-up' className={AuthCSS.navLink}>Sign up</NavLink>
        </div>
      </div>
      {error.length > 0 && <div className={AuthCSS.errorBox}>
      {error}
      </div>}
    </div>
  )
}
