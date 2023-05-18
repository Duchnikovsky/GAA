import AppCSS from '../styles/app.module.css'
import { Link, NavLink, useLocation } from "react-router-dom"

export default function Breadcrumbs() {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`

      return(
        <div className={AppCSS.crumb} key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      )
    })

  return (
    <div className={AppCSS.breadcrumbs}>
      <NavLink to='/' className={AppCSS.navLink}>Home</NavLink>{crumbs}
    </div>
  )
}
