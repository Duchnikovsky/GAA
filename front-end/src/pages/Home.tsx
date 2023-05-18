import Exhibition from '../components/Exhibition'
import HomeCSS from '../styles/home.module.css'

export default function Home(){

    return(
        <div>
            <div className={HomeCSS.exhibitionMain}>
                <Exhibition />
            </div>
        </div>
    )
}