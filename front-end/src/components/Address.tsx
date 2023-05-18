import { faCity, faEnvelope, faHouse, faLocationDot, faMapLocationDot, faRoad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { useState, useRef, useLayoutEffect } from 'react'
import ProfileCSS from '../styles/profile.module.css'

export default function Address(props:any) {
  const [formVisible, setFormVisible] = useState(false)

  const [values, setValues]:any = useState({
    wojewodztwo: '',
    powiat: '',
    miejscowosc: '',
    ulica: '',
    numer: '',
    kod_pocztowy: '',
  })
  const firstUpdate = useRef(true);
  const [updated, setUpdated]:any = useState(false)

  const inputs = [
    {
      id: 1,
      type: 'text',
      name: 'powiat',
      label: 'Powiat:',
      pattern: '^[A-Za-z]{2,30}$',
      maxlenght: 30,
      icon: faMapLocationDot
    },
    {
      id: 2,
      type: 'text',
      name: 'miejscowosc',
      label: 'Miejscowosc:',
      pattern: '^[A-Za-z]{2,30}$',
      maxlenght: 30,
      icon: faCity
    },
    {
      id: 3,
      type: 'text',
      name: 'ulica',
      label: 'Ulica:',
      pattern: '^[A-Za-z]{2,30}$',
      maxlenght: 30,
      icon: faRoad
    },
    {
      id: 4,
      type: 'text',
      name: 'numer',
      label: 'Numer mieszkania:',
      pattern: '^(10|[0-9])/(10|[0-9])$',
      maxlenght: 21,
      icon: faHouse
    },
    {
      id: 5,
      type: 'text',
      name: 'kod_pocztowy',
      label: 'Kod pocztowy:',
      pattern: '^(2|[0-9])-(3|[0-9])$',
      maxlenght: 6,
      icon: faEnvelope
    },
  ]

  const polskieWojewodztwa = [
    "Dolnośląskie",
    "Kujawsko-pomorskie",
    "Lubelskie",
    "Lubuskie",
    "Łódzkie",
    "Małopolskie",
    "Mazowieckie",
    "Opolskie",
    "Podkarpackie",
    "Podlaskie",
    "Pomorskie",
    "Śląskie",
    "Świętokrzyskie",
    "Warmińsko-mazurskie",
    "Wielkopolskie",
    "Zachodniopomorskie"
  ];
  
  

  function handleChange(e:any){
    setValues({...values, [e.target.name]: e.target.value})
  }

  function handleButton(){
    setFormVisible(!formVisible)
  }

  function handleSubmit(e:any){
    e.preventDefault()
    let email = props.data.Email
    let wojewodztwo = values['wojewodztwo']
    let powiat = values['powiat']
    let miejscowosc = values['miejscowosc']
    let ulica = values['ulica']
    let numer = values['numer']
    let kod_pocztowy = values['kod_pocztowy']
    if(polskieWojewodztwa.indexOf(wojewodztwo) !== -1){
      if(powiat.length > 0 && miejscowosc.length > 0 && numer.length > 0 && kod_pocztowy.length > 0){
        Axios.post('http://localhost:3001/addAddress',{email: email, wojewodztwo: wojewodztwo, powiat: powiat, miejscowosc: miejscowosc, ulica: ulica, numer: numer, kod: kod_pocztowy},{withCredentials: true})
        .then((result) => {
          if(result.data.type === 1){
            let address = result.data.address
            setValues({
              wojewodztwo: address.wojewodztwo,
              powiat: address.powiat,
              miejscowosc: address.miejscowosc,
              ulica: address.ulica,
              numer: address.nr_mieszkania,
              kod_pocztowy: address.kod_pocztowy,
            })
            setUpdated(true)
            setFormVisible(false)
          }
        })
      }
    }
  }

  function handleSubmitChange(e:any){
    e.preventDefault()
    let email = props.data.Email
    let wojewodztwo = values['wojewodztwo']
    let powiat = values['powiat']
    let miejscowosc = values['miejscowosc']
    let ulica = values['ulica']
    let numer = values['numer']
    let kod_pocztowy = values['kod_pocztowy']
    if(polskieWojewodztwa.indexOf(wojewodztwo) !== -1){
      if(powiat.length > 0 && miejscowosc.length > 0 && numer.length > 0 && kod_pocztowy.length > 0){
        Axios.post('http://localhost:3001/changeAddress',{email: email, wojewodztwo: wojewodztwo, powiat: powiat, miejscowosc: miejscowosc, ulica: ulica, numer: numer, kod: kod_pocztowy},{withCredentials: true})
        .then((result) => {
          if(result.data.type === 1){
            let address = result.data.address
            setValues({
              wojewodztwo: address.wojewodztwo,
              powiat: address.powiat,
              miejscowosc: address.miejscowosc,
              ulica: address.ulica,
              numer: address.nr_mieszkania,
              kod_pocztowy: address.kod_pocztowy,
            })
            setUpdated(true)
            setFormVisible(false)
          }
        })
      }
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
      wojewodztwo: props.address.Wojewodztwo,
      powiat: props.address.Powiat,
      miejscowosc: props.address.Miejscowosc,
      ulica: props.address.Ulica,
      numer: props.address.Nr_mieszkania,
      kod_pocztowy: props.address.Kod_pocztowy,
    })
    setUpdated(true)
  },[props.address])

  return (
    <div>
      <span className={ProfileCSS.containerHeader}>ADDRESS</span><br></br>
      {updated && <div>
        {formVisible && <div>
          <form>
            <div className={ProfileCSS.inputBox}> 
              <span className={ProfileCSS.label}>Województwo:</span><br></br>
              <input list="wojewodztwa" name='wojewodztwo' className={ProfileCSS.list} onChange={(e)=>{handleChange(e)}} value={values['wojewodztwo']}/>
              <datalist id="wojewodztwa">
                <option value="Zachodniopomorskie" />
                <option value="Pomorskie" />
                <option value="Warmińsko-mazurskie" />
                <option value="Podlaskie" />
                <option value="Mazowieckie" />
                <option value="Łódzkie" />
                <option value="Kujawsko-pomorskie" />
                <option value="Wielkopolskie" />
                <option value="Lubuskie" />
                <option value="Dolnośląskie" />
                <option value="Opolskie" />
                <option value="Śląskie" />
                <option value="Małopolskie" />
                <option value="Podkarpackie" />
                <option value="Lubelskie" />
              </datalist>
              <i><FontAwesomeIcon icon={faLocationDot}/></i>
            </div>
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
            <button className={ProfileCSS.submitButton} onClick={(e) => handleSubmitChange(e)}>Confirm</button>
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
            <button className={ProfileCSS.button} onClick={handleModify}>Modify address</button>
          </div>
        </div>}
      </div> || <div>
        {formVisible && <div>
          <form>
          <div className={ProfileCSS.inputBox}> 
              <span className={ProfileCSS.label}>Województwo:</span><br></br>
              <input list="wojewodztwa" name='wojewodztwo' className={ProfileCSS.list} onChange={(e)=>{handleChange(e)}} value={values['wojewodztwo']}/>
              <datalist id="wojewodztwa">
                <option value="Zachodniopomorskie" />
                <option value="Pomorskie" />
                <option value="Warmińsko-mazurskie" />
                <option value="Podlaskie" />
                <option value="Mazowieckie" />
                <option value="Łódzkie" />
                <option value="Kujawsko-pomorskie" />
                <option value="Wielkopolskie" />
                <option value="Lubuskie" />
                <option value="Dolnośląskie" />
                <option value="Opolskie" />
                <option value="Śląskie" />
                <option value="Małopolskie" />
                <option value="Podkarpackie" />
                <option value="Lubelskie" />
              </datalist>
              <i><FontAwesomeIcon icon={faLocationDot}/></i>
            </div>
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
