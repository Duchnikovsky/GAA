import logo from '../assets/logo.png'
import HeaderCSS from '../styles/header.module.css'
import cart from '../assets/cart.png'
import user from '../assets/user.png'
import SearchBox from './SearchBox'
import Categories from './Categories'
import { Link } from 'react-router-dom'

export default function Header(){

    return(
        <div className={HeaderCSS.header}>
            <div className={HeaderCSS.logoDiv}>
                <Link to='/'><img src={logo} alt='gaa_logo' className={HeaderCSS.logo}></img></Link>
            </div>
            <div className={HeaderCSS.categoriesDiv}>
                <Categories />
            </div>
            <div className={HeaderCSS.searchDiv}>
                <SearchBox />
            </div>
            <div className={HeaderCSS.iconsDiv}>
                <div className={HeaderCSS.cartDiv}>
                    <img src={cart} alt='cart' className={HeaderCSS.cartIcon}></img>
                </div>
                <div className={HeaderCSS.userDiv}>
                <Link to='/auth'><img src={user} alt='user' className={HeaderCSS.userIcon}></img></Link>
                </div>
            </div>
        </div>
    )
}