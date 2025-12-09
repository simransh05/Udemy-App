import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/Home/HomePage'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import { useState } from 'react'
import Teach from './Components/Teach/Teach'
import Cart from './Components/Cart/Cart'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import MyLearning from './Components/Learning/MyLearning'
import BaseCategory from './Components/BaseCategory/BaseCategory'
import Favorite from './Components/Favorite/Favorite'

export const loginContext = createContext();
export const categoryContext = createContext();
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const categories = [
    { name: "Development", sub: ["Web Development", "Mobile Development", "Game Development", "Software Testing"] },
    { name: "Business", sub: ["Entrepreneurship", "Communication", "Management", "Business Strategy"] },
    { name: "Design", sub: ["Web Design", "3D & Animation", "Game Design", "Design Tools"] },
    { name: "Health", sub: ["Sports", "Yoga", "Mental Health", "Nutrition"] }
  ];
  return (
    <>
      <loginContext.Provider value={{ isLogin, setIsLogin }}>
        <categoryContext.Provider value={{ categories }}>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/:category" element={<BaseCategory />} />
              <Route path="/:category/:sub" element={<BaseCategory />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/teach' element={<Teach />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/my-learning' element={<MyLearning />} />
              <Route path='/fav' element={<Favorite />} />
            </Routes>
          </Router>
        </categoryContext.Provider>
      </loginContext.Provider>
    </>
  )
}

export default App
