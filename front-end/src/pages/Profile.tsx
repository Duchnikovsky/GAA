import { useEffect, useState } from 'react'
import ProfileCSS from '../styles/profile.module.css'
import Axios from 'axios'
import PersonalData from '../components/PersonalData'
import AccountDetails from '../components/AccountDetails'
import Address from '../components/Address'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

export default function Profile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [userData, setUserData]:any = useState({
    Email: '',
    Name: '',
    Lastname: '',
    Phone: '',
  })

  const [addressData, setAddressData]:any = useState({
    Wojewodztwo: '',
    Powiat: '',
    Miejscowosc: '',
    Ulica: '',
    Nr_mieszkania: '',
    Kod_pocztowy: '',
  })

  useEffect(() => {
    setLoading(true)
    Axios.post('http://localhost:3001/isLogged',{},{withCredentials: true})
      .then((res) => {
      if(res.data.loggedIn === true){
        Axios.post('http://localhost:3001/getUserData',{email: res.data.userData.email},{withCredentials: true})
        .then((result) => {
          let data = result.data.data
          setUserData({
            Email: data.email,
            Name: data.name,
            Lastname: data.lastname,
            Phone: data.phone,
          })
          if(data.address.length > 0){
            setAddressData({
              Wojewodztwo: data.address[0].wojewodztwo,
              Powiat: data.address[0].powiat,
              Miejscowosc: data.address[0].miejscowosc,
              Ulica: data.address[0].ulica,
              Nr_mieszkania: data.address[0].nr_mieszkania,
              Kod_pocztowy: data.address[0].kod_pocztowy,
            })
          }
        })
      }else if(res.data.loggedIn === false){
        setLoading(false)
        navigate('/')
      }
    })
  },[])

  useEffect(() => {
    setLoading(false)
  }, [userData['Phone']])

  return (
    <div className={ProfileCSS.main}>
      {!loading && <div>
        <div className={ProfileCSS.header}>User informations</div>
        <div className={ProfileCSS.firstContainer}>
          <PersonalData data={userData}/>
        </div>  
        <div className={ProfileCSS.secondContainer}>
          <AccountDetails data={userData}/>
        </div>
        <div className={ProfileCSS.thirdContainer}>
          <Address address={addressData} data={userData}/>
        </div>  
        <div className={ProfileCSS.shoppingsHeader}>Your shoppings</div>
      </div> || <div className={ProfileCSS.main}>
        <Loading />
      </div>}
    </div>
  )
}

