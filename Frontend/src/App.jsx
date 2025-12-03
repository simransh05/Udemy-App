import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/Home/HomePage'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import { useState } from 'react'
import Teach from './Components/Teach/Teach'
import Cart from './Components/Cart/Cart'
import MainRoute from './Components/Routers/MainRoute'

export const loginContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <loginContext.Provider value={{ isLogin, setIsLogin }}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/*' element={<MainRoute />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/teach' element={<Teach />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
      </loginContext.Provider>
    </>
  )
}

export default App
