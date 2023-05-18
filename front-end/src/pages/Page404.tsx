import CSS404 from '../styles/page404.module.css'
import { Link } from 'react-router-dom'

export default function Page404(){
    return(
        <div className={CSS404.main}>
            <span>Page not found</span><br></br>
            <span>Go to <Link to='/' className={CSS404.link}>home page</Link></span>
        </div>
    )
}