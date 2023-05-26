import SearchBoxCSS from '../styles/searchbox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBox(){
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function submitHandler(e:any){
    e.preventDefault()
    const timestamp = Date.now();
    navigate(`/search/${encodeURIComponent((value.toString()).replace(/ /g, '_'))}?timestamp=${timestamp}`,{replace: true})
  }

  return(
    <form className={SearchBoxCSS.searchBox} onSubmit={(e) => submitHandler(e)}>
      <input type='search' className={SearchBoxCSS.search} autoComplete='no' spellCheck="false" placeholder='Search bar' value={value} onChange={(e) => setValue(e.target.value)} maxLength={30}></input>
      <i><FontAwesomeIcon icon={faSearch} onClick={submitHandler}/></i>
    </form>
  )
}