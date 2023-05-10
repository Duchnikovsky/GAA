
//BIBLIOTEKI
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'


//KOMPONENTY
import Header from './components/Header'
import Home from './components/Home'
import Auth from './auth/Auth'


//STYL
import AppCSS from './styles/app.module.css'

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/> 
  )
}

function Root(){
  return(
    <div className={AppCSS.main}>
      <div className={AppCSS.header}>
        <Header />
      </div>
    </div>
  )
}
