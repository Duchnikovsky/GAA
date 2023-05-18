import { useLayoutEffect, useRef, useState } from 'react'
import ProfileCSS from '../styles/profile.module.css'
import { faFileSignature, faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

export default function PersonalData(props:any) {
  const [formVisible, setFormVisible] = useState(false)
  const firstUpdate = useRef(true);
  const [values, setValues]:any = useState({
    name: '',
    lastname: '',
    phone: '',
  })

  const [updated, setUpdated]:any = useState(false)

  const inputs = [
    {
        id: 1,
        type: 'text',
        name: 'name',
        label: 'Name:',
        pattern: '^[A-Za-z]{2,30}$',
        maxlenght: 30,
        icon: faFileSignature
    },
    {
        id: 2,
        type: 'text',
        name: 'lastname',
        label: 'Last name:',
        pattern: '^[A-Za-z]{2,30}$',
        maxlenght: 30,
        icon: faFileSignature
    },
    {
      id: 3,
      type: 'text',
      name: 'phone',
      label: 'Phone number:',
      pattern: '^[0-9]{9}$',
      maxlenght: 9,
      icon: faMobileScreen
  }
  ]

  function handleChange(e:any){
    setValues({...values, [e.target.name]: e.target.value})
  }

  function handleButton(){
    setFormVisible(!formVisible)
  }

  function handleSubmit(e:any){
    e.preventDefault()
    let email = props.data.Email
    let name = values['name']
    let lastname = values['lastname']
    let phone = values['phone']
    if(name.length >= 2 && name.length <= 30 && lastname.length >= 2 && lastname.length <= 30 && phone.length == 9){
      Axios.post('http://localhost:3001/addPersonalData',{email: email, name: name, lastname: lastname, phone: phone},{withCredentials: true})
      .then((result) => {
        if(result.data.type === 1){
          setValues({
            name: result.data.user.name,
            lastname: result.data.user.lastname,
            phone: result.data.user.phone,
          })
          setUpdated(true)
          setFormVisible(false)
        }
      })
    }
  }

  function handleModify(){
    setFormVisible(!formVisible)
  }

  useLayoutEffect(()=>{
    if(firstUpdate.current){
      firstUpdate.current = false
      return
    }
    setValues({
      name: props.data.Name,
      lastname: props.data.Lastname,
      phone: props.data.Phone,
    })
    setUpdated(true)
  },[props.data])

  return (
    <div>
      <span className={ProfileCSS.containerHeader}>PERSONAL DATA</span><br></br>
      {updated && <div>
        {formVisible && <div>
          <form>
          {
          inputs.map((e, index)=>(
            <div key={index} className={ProfileCSS.inputBox}>
              <span className={ProfileCSS.label}>{e.label}</span><br></br>
              <input type={e.type} name={e.name} value={values[e.name]} required pattern={e.pattern} maxLength={e.maxlenght} onChange={(e)=>{handleChange(e)}} className={ProfileCSS.input}></input>
              <i><FontAwesomeIcon icon={e.icon}/></i>
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
        </div> || <div>
          {Object.keys(values).map((key, index) => (
            <div className={ProfileCSS.dataContainer} key={index}>
              <span className={ProfileCSS.dataLabel}>{key}</span><br></br>
              <span className={ProfileCSS.data}>{values[key]}</span><br></br>
          </div>
          ))}
          <div className={ProfileCSS.modifyBox}>
            <button className={ProfileCSS.button} onClick={handleModify}>Modify data</button>
          </div>
        </div>}
      </div> || <div>
        {formVisible && <div>
          <form>
          {
          inputs.map((e, index)=>(
            <div key={index} className={ProfileCSS.inputBox}>
              <span className={ProfileCSS.label}>{e.label}</span><br></br>
              <input type={e.type} name={e.name} value={values[e.name]} required pattern={e.pattern} maxLength={e.maxlenght} onChange={(e)=>{handleChange(e)}} className={ProfileCSS.input}></input>
              <i><FontAwesomeIcon icon={e.icon}/></i>
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
        </div> || <div>
          <button className={ProfileCSS.button} onClick={handleButton}>Add data</button>
        </div>
        }
      </div>}
    </div>
  )
}
