import { Link } from "react-router-dom";
import CSS from '../styles/productCategory.module.css'
import Footer from "../components/Footer";
export default function Products() {

  return (
    <div>
      <div className={CSS.errorDiv}>
        You need to specify product<br></br>
        <Link to='/' className={CSS.link}>Go to home page</Link>
      </div>
      <Footer />
    </div>
  )
}
