import { createContext, useEffect } from 'react'
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
import { ToastContainer } from 'react-toastify'
import ROUTES from './Constant/Routes'
import IndividualLearning from './Components/Learning/IndividualLearning'
import MyCourse from './Components/My_Course/MyCourse'
import api from './utils/api'

export const loginContext = createContext();
export const categoryContext = createContext();
export const counterContext = createContext();
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [counter, setCounter] = useState({
    fav: 0,
    cart: 0,
  })
  const categories = [
    { name: "Development", sub: ["Web Development", "Mobile Development", "Game Development", "Software Testing"] },
    { name: "Business", sub: ["Entrepreneurship", "Communication", "Management", "Business Strategy"] },
    { name: "Design", sub: ["Web Design", "3D & Animation", "Game Design", "Design Tools"] },
    { name: "Health", sub: ["Sports", "Yoga", "Mental Health", "Nutrition"] }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.getUser();
        if (res.status === 200 && res.data && res.data._id) {
          setCurrentUser(res.data);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        setCurrentUser(null);
      }
    };
    fetchUser()
  }, []);

  return (
    <>
      <loginContext.Provider value={{ currentUser, setCurrentUser }}>
        <counterContext.Provider value={{ counter, setCounter }}>
          <categoryContext.Provider value={{ categories }}>
            <Router>
              <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path="/:category" element={<BaseCategory />} />
                <Route path="/:category/:sub" element={<BaseCategory />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
                <Route path={ROUTES.TEACH} element={<Teach />} />
                <Route path={ROUTES.CART} element={<Cart />} />
                <Route path={ROUTES.MY_LEARNING} element={<MyLearning />} />
                <Route path={ROUTES.FAV} element={<Favorite />} />
                <Route path={`${ROUTES.MY_LEARNING}/:cardId`} element={<IndividualLearning />} />
                <Route path={ROUTES.MY_COURSE} element={<MyCourse />} />
              </Routes>
            </Router>
          </categoryContext.Provider>
        </counterContext.Provider>
      </loginContext.Provider>
      <ToastContainer position='top-right' autoClose={2000} />
    </>
  )
}

export default App
