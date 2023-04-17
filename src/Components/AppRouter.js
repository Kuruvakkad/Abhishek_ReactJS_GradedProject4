import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import App from '../App'
import AddMember from './AddMember/AddMember'


function AppRouter() {
  return (
    <BrowserRouter>   
    
    <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/addMember' element={<AddMember/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter