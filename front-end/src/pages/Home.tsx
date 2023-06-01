import Banner from '../components/Banner'
import Exhibition from '../components/Exhibition'
import CSS from '../styles/home.module.css'

export default function Home(){

    return(
        <div>
            <div className={CSS.exhibitionMain}>
                <Banner />
                <Exhibition />
            </div>
        </div>
    )
}