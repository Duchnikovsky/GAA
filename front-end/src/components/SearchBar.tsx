import SearchBoxCSS from '../styles/searchbox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBox(){

    return(
        <div className={SearchBoxCSS.searchBox}>
            <input type='search' className={SearchBoxCSS.search} autoComplete='no' spellCheck="false" placeholder='Search bar'></input>
            <i><FontAwesomeIcon icon={faSearch}/></i>
        </div>
    )
}