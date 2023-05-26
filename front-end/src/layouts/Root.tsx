import RootCSS from '../styles/root.module.css'
import logo from '../assets/logo.png'
import cart from '../assets/cart.png'
import user from '../assets/user.png'
import { Link, Outlet } from 'react-router-dom'
import Categories from './Categories'
import SearchBox from '../components/SearchBar'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Root() {
  return (
    <div className={RootCSS.main}>
        <div className={RootCSS.header}>
            <div className={RootCSS.logoDiv}>
                <Link to='/'><img src={logo} alt='gaa_logo' className={RootCSS.logo}></img></Link>
            </div>
            <div className={RootCSS.categoriesDiv}>
                <Categories />
            </div>
            <div className={RootCSS.searchDiv}>
                <SearchBox />
            </div>
            <div className={RootCSS.iconsDiv}>
                <div className={RootCSS.cartDiv}>
                <Link to='/cart'><img src={cart} alt='cart' className={RootCSS.cartIcon}></img></Link>
                </div>
                <div className={RootCSS.userDiv}>
                <Link to='/auth'><img src={user} alt='user' className={RootCSS.userIcon}></img></Link>
                </div>
            </div>
        </div>
        <div>
            <Breadcrumbs />
        </div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}
