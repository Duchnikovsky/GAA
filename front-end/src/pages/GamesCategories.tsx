import { useEffect, useState } from 'react'
import CatCSS from '../styles/categories.module.css'
import Axios from 'axios'
import { NavLink } from 'react-router-dom'
import Loading from '../components/Loading'

export default function Categories() {
  const [categories, setCategories]:any = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios.post('http://localhost:3001/getCategories')
    .then((result) => {
      setCategories([])
      result.data.categories.forEach((e:any) => (
        setCategories((current: any) => [...current, e.name])
      ))
      setLoading(false)
    })
  },[])

  return (
    <div className={CatCSS.main}>
      {loading && <Loading />
      || <div className={CatCSS.categoriesGrid}>
        {categories.map((e:any, index:any) => (
          <NavLink to={encodeURIComponent((e.toString()).replace(/ /g, '_'))} key={index} className={CatCSS.link}><div key={index} className={CatCSS.box}>
            <img src={`/assets/icons/${e}.png`} alt='icon'/>
            <div className={CatCSS.nameBox}>
            <span>{e}</span>
            </div>
          </div></NavLink>
        ))
        }

      </div>}
    </div>
  )
}
