import CategoriesCSS from '../styles/categoriesLayout.module.css'
import { NavLink } from 'react-router-dom'

export default function Categories(){

  return(
  <div className={CategoriesCSS.categoriesDiv}>
    <div className={CategoriesCSS.gameCategories}>    
      <NavLink to='/categories' className={CategoriesCSS.navLink}>GAMES CATEGORIES</NavLink>
    </div>
    <div className={CategoriesCSS.dlc}>
      <NavLink to='/dlc' className={CategoriesCSS.navLink}>DLC's</NavLink>
    </div>
    <div className={CategoriesCSS.cardsAndSubs}>
      <NavLink to='/cards&subscriptions' className={CategoriesCSS.navLink}>CARDS & SUBSCRIPTIONS</NavLink>
    </div>
  </div>
)
}