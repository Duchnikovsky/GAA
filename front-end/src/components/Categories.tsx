import CategoriesCSS from '../styles/categories.module.css'

export default function Categories(){

    return(
        <div className={CategoriesCSS.categoriesDiv}>
            <div className={CategoriesCSS.gameCategories}>
                <span>GAMES CATEGORIES</span>
            </div>
            <div className={CategoriesCSS.dlc}>
                <span>DLC's</span>
            </div>
            <div className={CategoriesCSS.cardsAndSubs}>
                <span>CARDS & SUBSCRIPTIONS</span>
            </div>
        </div>
    )
}