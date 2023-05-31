import { useEffect, useState } from 'react'
import CSS from '../styles/profile.module.css'
import Axios from 'axios'
import PersonalData from '../components/PersonalData'
import AccountDetails from '../components/AccountDetails'
import Address from '../components/Address'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Shoppings from '../components/Shoppings'

export default function Profile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders]:any = useState([])

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
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/isLogged`,{},{withCredentials: true})
      .then((res) => {
      if(res.data.loggedIn === true){
        Axios.post(`${import.meta.env.VITE_SERVER_URL}/getUserData`,{},{withCredentials: true})
        .then((result) => {
          let data = result.data.data
          setOrders(result.data.orders)
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
    Axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`,{},{withCredentials: true})
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
        {orders.length > 0 && <table className={CSS.table}>
          <tbody>
            <tr>
              <th className={CSS.idHeader}>Order ID</th><th className={CSS.productHeader}>Products</th>
              <th className={CSS.idHeader}>Price</th>
              <th className={CSS.idHeader}>Status</th>
            </tr>
            {
              orders.map((e:any,index:any) => (
                <tr className={CSS.dataRows} key={index}>
                  <td className={CSS.tableData}>{e.id}</td>
                  <td className={CSS.imageData}>
                    {
                      e.products.split(',').map((el:any, ind:any) => (
                        <div key={ind} className={CSS.imageBorder}>
                          <Shoppings product={el}/>
                        </div>
                      ))
                    }
                  </td>
                  <td className={CSS.tableData}>{e.cost} USD</td>
                  <td className={CSS.tableData}>{e.status.replace(/_/g, ' ')}</td>
                </tr>
              ))
            }
          </tbody>
        </table>}
        </div>
      </div> || <div className={CSS.main}>
        <Loading />
      </div>}
    </div>
  )
}

