
//BIBLIOTEKI
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'


//KOMPONENTY
import Home from './pages/Home'
import Page404 from './pages/Page404' 
import Root from './layouts/Root'
import Auth from './auth/Auth'
import Categories from './pages/GamesCategories'
import SignUp from './auth/SignUp'
import Profile from './pages/Profile'

//STYL
// import AppCSS from './styles/app.module.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
        <Route index element={<Home />}/>
        <Route path='auth' element={<Auth />}/>
        <Route path='sign-up' element={<SignUp />}/>
        <Route path="*" element={<Page404 />} />
        <Route path="categories" element={<Categories />} />
        <Route path="profile" element={<Profile />}/>
    </Route>
  )
)

export default function App() {

  return (
    <RouterProvider router={router}/> 
  )
}
