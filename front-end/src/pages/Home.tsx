import Exhibition from '../components/Exhibition'
import Footer from '../components/Footer'
import HomeCSS from '../styles/home.module.css'

export default function Home(){

    return(
        <div>
            <div className={HomeCSS.exhibitionMain}>
                <Exhibition />
                <div className={HomeCSS.header}>RECOMENDED DLC'S</div>
            </div>
            <Footer />
        </div>
    )
}