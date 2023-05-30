import { useEffect, useState } from 'react'
import CSS from '../styles/profile.module.css'
import Axios from 'axios'
import PersonalData from '../components/PersonalData'
import AccountDetails from '../components/AccountDetails'
import Address from '../components/Address'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductImage from '../components/ProductImage'

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

  function logoutHandler(){
    Axios.post('http://localhost:3001/logout',{},{withCredentials: true})
    .then((result) => {
      if(result.data.type === 1){
        navigate('/')
      }
    })
  }

  return (
    <div className={CSS.main}>
      {!loading && <div>
        <div className={CSS.header}>User informations</div>
        <div className={CSS.firstContainer}>
          <PersonalData data={userData}/>
        </div>  
        <div className={CSS.secondContainer}>
          <AccountDetails data={userData}/>
        </div>
        <div className={CSS.thirdContainer}>
          <Address address={addressData} data={userData}/>
        </div>  
        <div className={CSS.logoutDiv}>
          <button className={CSS.buttonLogout} onClick={logoutHandler}>LOGOUT</button>
        </div>
        <div className={CSS.shoppingsHeader}>Your shoppings</div>
        <div className={CSS.shoppings}>
          <table className={CSS.table}>
            <tbody>
              <tr>
                <th className={CSS.idHeader}>Order ID</th>
                <th className={CSS.productHeader}>Products</th>
                <th className={CSS.idHeader}>Price</th>
                <th className={CSS.idHeader}>Status</th>
              </tr>
              <tr className={CSS.dataRows}>
                <td className={CSS.tableData}>12342</td>
                <td className={CSS.imageData}>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                </td>
                <td className={CSS.tableData}>39.99 USD</td>
                <td className={CSS.tableData}>IN PROCESS</td>
              </tr>
              <tr className={CSS.dataRows}>
                <td className={CSS.tableData}>12342</td>
                <td className={CSS.imageData}>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                  <div className={CSS.imageBorder}>
                    <ProductImage src={'witcher3'} origin={'orders'}/>
                  </div>
                </td>
                <td className={CSS.tableData}>39.99 USD</td>
                <td className={CSS.tableData}>IN PROCESS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> || <div className={CSS.main}>
        <Loading />
      </div>}
    </div>
  )
}

