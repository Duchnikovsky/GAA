import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import Axios from 'axios'
import CSS from '../styles/product.module.css'
import Rating from "../components/Rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotate } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { scroller } from 'react-scroll'
import RatingModify from "../components/RatingModify"
import Footer from "../components/Footer"

export default function Product() {
  const { name } = useParams()
  const nameDecoded = name ? decodeURIComponent(name.replace(/_/g, ' ')) : ''
  const [loading, setLoading] = useState(true)
  const [opinionsLoading, setOpinionsLoading] = useState(true)
  const [data, setData]:any = useState([])
  const [opinions, setOpinions]:any = useState([])
  const firstUpdate = useRef(true);
  const firstUpdateOp = useRef(true);
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [opinionRating, setOpinionRating] = useState(0)
  const [titleValue, setTitleValue] = useState('')
  const [contentValue, setContentValue] = useState('')
  const [opinionVisible, setOpinionVisible] = useState(true)

  useEffect(() => {
    setLoading(true)
    Axios.post('http://localhost:3001/getProduct',{name: nameDecoded},{withCredentials: true})
    .then((result) => {
      setData(result.data)
    })
  },[nameDecoded])

  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false
      return
    }
    setLoading(false)
    Axios.post('http://localhost:3001/getOpinions',{id: data.product.id})
    .then((result) => {
      setOpinions(result.data.opinions)
      setRating(Math.round(result.data.averageRating))
    })
  },[data])


  function scrollToDescription(){
    scroller.scrollTo('desription',{
      duration: 500,
      smooth: true,
    })
  }

  function scrollToRequirements(){
    scroller.scrollTo('requirements',{
      duration: 800,
      smooth: true,
    })
  }

  function scrollToOpinion(){
    scroller.scrollTo('addopinion',{
      duration: 1000,
      smooth: true,
    })
  }


  function handleOpinionButton(){
    Axios.post('http://localhost:3001/isLogged',{},{withCredentials: true})
    .then((result) => {
      if(result.data.loggedIn === true){
        scrollToOpinion()
      }else if(result.data.loggedIn === false){
        navigate('/auth')
      }
    })
  }

  useEffect(() => {
    if(firstUpdateOp.current){
      firstUpdateOp.current = false
      return
    }
    setOpinionsLoading(false)
  },[opinions])

  function getRatingValue(value:number){
    setOpinionRating(value)
  }

  function handleOpinion(e:any){
    e.preventDefault()
    if(titleValue.length > 3 && titleValue.length < 20){
      if(contentValue.length > 3 && contentValue.length <= 250){
        if(opinionRating !== 0){
          Axios.post('http://localhost:3001/addOpinion',{product: data.product.id, title: titleValue, content: contentValue, rating: opinionRating},{withCredentials: true})
          .then((result) => {
            if(result.data.type === 1){
              setTitleValue('')
              setContentValue('')
              setOpinionRating(0)
              setOpinionVisible(false)
            }
          })
        }
      }
    }
  }

  return (
    <div>
      {loading && <div>
        <Loading />
      </div> || <div className={CSS.main}>
        <div className={CSS.mainPage}>
          <div className={CSS.imageBox}>
            <img src={`/assets/${data.product.image}.png`} alt={data.product.image}  className={CSS.image}/>
          </div>
          <div>
            <div className={CSS.titleBox}>
              <span className={CSS.title}>{data.product.title}</span><br></br>
              <div className={CSS.properties}><b>Producent:</b> {data.product.producent.name}</div>
              <div className={CSS.description}><b>Description:</b> {data.product.description}</div>
              <div className={CSS.properties}><b>Price:</b> {data.product.price}$</div>
            </div>
            <div className={CSS.buttonBox}>
              <button className={CSS.button}>ADD TO CART</button>
            </div>
          </div>
          <div className={CSS.opinionsBox}>
            <div className={CSS.opinionsHeader}>
              <span className={CSS.headerText}>OPINIONS</span>
              {opinionsLoading && <></> || <Rating rating={rating}/>}
            </div>
            {opinionsLoading && <div className={CSS.spinDiv}>
              <FontAwesomeIcon icon={faRotate} spin/>
            </div> || <div className={CSS.opinionList}>
              {
                opinions.map((e:any,index:any) => (
                <div className={CSS.opinionBox} key={index}>
                  <div className={CSS.opinionHeader}>
                    <span className={CSS.opinionTitle}>{e.title}</span><Rating rating={e.rating}/>
                  </div>
                  <div className={CSS.opinionTextarea}>
                    {e.content}
                  </div>
                </div>
                ))
              }
            </div>}
            {opinionsLoading && <></> || <button className={CSS.addOpinion} onClick={handleOpinionButton}>ADD OPINION</button>}
          </div>
        </div>
        <div className={CSS.bookmarks}>
          <div className={CSS.bookmark} onClick={scrollToDescription}>
            GAME DESCRIPTION
          </div>
          <div className={CSS.bookmark} onClick={scrollToRequirements}>
            SYSTEM REQUIREMENTS
          </div>
        </div>
        <div id='desription' className={CSS.desriptionDiv}>
          <div className={CSS.sectionName}>
            GAMEPLAY
          </div>
          <div className={CSS.sectionText}>
            Vivamus at lectus sagittis, dapibus nunc sed, eleifend est. Sed mattis luctus purus a vestibulum. Sed condimentum augue eu justo convallis cursus. Praesent vel sem mauris. Morbi nec enim et libero viverra efficitur. Proin maximus aliquet malesuada. Morbi sodales ex blandit semper tempus. In dapibus convallis arcu a accumsan. Ut vehicula leo quis urna consectetur hendrerit. Donec accumsan ultricies felis vitae efficitur. Proin a lorem diam. Sed sit amet urna sit amet leo vehicula sollicitudin nec vel enim. Aliquam malesuada neque blandit elit tincidunt, at viverra elit malesuada. Mauris fermentum tincidunt nunc, vitae consectetur enim aliquam eu. Nulla luctus elementum sollicitudin. Suspendisse et vehicula neque.
          </div>
          <div className={CSS.sectionName}>
            STORY
          </div>
          <div className={CSS.sectionText}>
            Proin a tincidunt ipsum. Curabitur quis quam a arcu mollis ultricies. Integer sapien ipsum, pharetra sit amet commodo dictum, sollicitudin sed nisl. Praesent non ante pulvinar neque ornare mollis ut ac metus. Nunc in ex sollicitudin, lobortis arcu nec, varius elit. Cras ligula lacus, euismod vel scelerisque laoreet, sollicitudin nec arcu. Nunc id luctus est. Donec sed venenatis tortor, eget molestie justo. Curabitur non fermentum arcu. Sed consectetur orci quis dui sodales, vitae laoreet sapien luctus. Ut dapibus, nibh id mattis dignissim, justo mauris vehicula dolor, id tempus dolor massa eu ex. Suspendisse eros elit, volutpat at sem vitae, lacinia tincidunt tortor. Aenean erat est, lobortis nec placerat quis, ornare in erat. Donec nulla nulla, rutrum ut egestas vel, pulvinar et dui. Fusce sit amet eros sit amet nunc convallis consequat id at urna. Vivamus in mi eget nisl eleifend venenatis.
          </div>
        </div>
        <div id='requirements' className={CSS.requirementsDiv}>
          <div className={CSS.sectionName}>
            SYSTEM REQUIREMENTS
          </div>
          <div className={CSS.tableDiv}>
              <table className={CSS.table}>
                <tr>
                  <th className={CSS.tableHeader}>MINIMUM REQUIREMENTS</th>
                  <th className={CSS.tableHeader}>RECOMMENDED REQUIREMENTS</th>
                </tr>
                <tr>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>PROCESSOR</span><br></br>
                    <span className={CSS.tableDataContent}>Intel Core i5-6600</span>
                  </td>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>PROCESSOR</span><br></br>
                    <span className={CSS.tableDataContent}>Intel Core i7-8700</span>
                  </td>
                </tr>
                <tr>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>GRAPHIC CARD</span><br></br>
                    <span className={CSS.tableDataContent}>NVIDIA GeForce GTX 960 4GB</span>
                  </td>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>GRAPHIC CARD</span><br></br>
                    <span className={CSS.tableDataContent}>NVIDIA GeForce 1080 Ti</span>
                  </td>
                </tr>
                <tr>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>MEMORY</span><br></br>
                    <span className={CSS.tableDataContent}>8 GB RAM</span>
                  </td>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>MEMORY</span><br></br>
                    <span className={CSS.tableDataContent}>16 GB RAM</span>
                  </td>
                </tr>
                <tr>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>OPERATING SYSTEM</span><br></br>
                    <span className={CSS.tableDataContent}>64-bit Windows 10</span>
                  </td>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>OPERATING SYSTEM</span><br></br>
                    <span className={CSS.tableDataContent}>64-bit Windows 10</span>
                  </td>
                </tr>
                <tr>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>DISK SPACE</span><br></br>
                    <span className={CSS.tableDataContent}>100 GB AVAIBLE SPACE</span>
                  </td>
                  <td className={CSS.tableData}>
                    <span className={CSS.tableDataHeader}>DISK SPACE</span><br></br>
                    <span className={CSS.tableDataContent}>100 GB AVAIBLE SPACE</span>
                  </td>
                </tr>
              </table>
          </div>
        </div>
        {opinionVisible && <div id='addopinion' className={CSS.addOpinionDiv}>
          <div className={CSS.sectionName}>
            ADD OPINION
          </div>
          <form className={CSS.opinionForm}>
            <div className={CSS.formHeader}>
              <input type='text' name='title' className={CSS.input} placeholder="Title" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}></input>
              <div className={CSS.ratingDiv}>
                <RatingModify sendValue={getRatingValue}/>
              </div>
            </div>
            <textarea name='title' maxLength={250} className={CSS.textarea} placeholder="Your opinion" value={contentValue} onChange={(e) => setContentValue(e.target.value)}></textarea>
            <div className={CSS.formFooter}>
              <button className={CSS.postButton} onClick={handleOpinion}>POST</button>
            </div>
          </form>
        </div> || <div id='addopinion' className={CSS.doneOpinionDiv}>
          <FontAwesomeIcon icon={faCircleCheck}/><br></br>
          <span className={CSS.doneOpinionText}>SUCCESSFULLY POSTED OPINION</span>
        </div>}
        <Footer />
      </div>}
    </div>
  )
}
