import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NNotFoundPage from './Components/NotFountPage/NNotFoundPage'
import Movies from './Components/Movies/Movies'
import Tv from './Components/Tv/Tv'
import MovieDetails from './Components/MovieDetails/MovieDetails'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { Offline } from 'react-detect-offline'
import People from './Components/People/People'
import PersonDetails from './Components/PersonDetails/PersonDetails'


export default function App() {

const [loggedInUser, setLoggedInUser] = useState(null)


function getLoggedUser(){
  if (localStorage.getItem('tkn')  != null ) {
    let tkn = localStorage.getItem('tkn');
    let userData = jwtDecode(tkn);
    setLoggedInUser(userData)
  }
}


function removeUserData(){
  localStorage.removeItem('tkn');
  setLoggedInUser(null);
}


function checkReload(){

  if (localStorage.getItem('tkn') != null && loggedInUser == null) {
    getLoggedUser()
}
  
}

useEffect( ()=>{
  checkReload()
}, [] )

const routes = createBrowserRouter([

{path:'', element:<LayOut crrUser={loggedInUser} remove={removeUserData} />, children:[

    {path:'', element: <ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:'home', element: <ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:'movies', element: <ProtectedRoutes><Movies/></ProtectedRoutes>},
    {path:'tv', element: <ProtectedRoutes><Tv/></ProtectedRoutes>},
    {path:'people', element: <ProtectedRoutes><People/></ProtectedRoutes>},

    {path:'movieDetails', element: <ProtectedRoutes><MovieDetails/></ProtectedRoutes>,children:[
      {path:":media", children:[
        {path:':id'}
      ]}
    ]},
    {path:'personDetails', element: <ProtectedRoutes><PersonDetails/></ProtectedRoutes>,children:[
      {path:":media", children:[
        {path:':id'}
      ]}
    ]},
 

    {path:'login', element:<Login logVer={getLoggedUser} />},
    {path:'register', element:<Register/>},
    {path:'*', element:<NNotFoundPage/>},
]}
])
  return <>

  
  <Offline>
    <div className="bg-dark border border-3 border-warning text-white position-fixed bottom-0 start-0 p-5 m-2">
        <h2>OOPS your internet connection has been lost</h2>
    </div>
  </Offline>
  
<RouterProvider router={routes}>

</RouterProvider>
  </>
}
