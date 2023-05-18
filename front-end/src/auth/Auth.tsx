import AuthCSS from '../styles/auth.module.css'
import Terms from '../components/Terms'
import SignIn from './SignIn'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

export default function Auth(){

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(true)
        Axios.post('http://localhost:3001/isLogged',{},{withCredentials: true})
        .then((result) => {
            if(result.data.loggedIn === true){
                navigate('/profile')
            }else if(result.data.loggedIn === false){
                setLoading(false)
            }
        })
    },[])

    return(
        <div>
        {!loading && <div className={AuthCSS.main}>
            <div className={AuthCSS.form}>
                <SignIn />
            </div>
            <div className={AuthCSS.terms}>
                <Terms />
            </div>
        </div> || <div className={AuthCSS.main}>
            <div className={AuthCSS.spinDiv}>
                <FontAwesomeIcon icon={faRotate} spin/>
            </div>
        </div>
        }
        </div>
    )
}