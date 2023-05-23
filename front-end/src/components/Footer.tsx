import FooterCSS from '../styles/footer.module.css'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <div className={FooterCSS.main}>
      <img src={logo} alt='logo' className={FooterCSS.logo}/><br></br>
      <span className={FooterCSS.text}>GAA to projekt strony internetowej sklepu z grami komputerowymi utworzony na potrzebę portofolio przez <b>Filip Duchnik</b></span><br></br>
    </div>
  )
}
