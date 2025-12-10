import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useContext } from 'react'
import { categoryContext } from '../../App'
import api from '../../utils/api';
const base_url = import.meta.env.VITE_BASE_URL;
import './Learning.css'
import { Link } from 'react-router-dom';
function MyLearning() {
  const { categories } = useContext(categoryContext);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    const fetchLearn = async () => {
      const user = JSON.parse(localStorage.getItem('login-info'));
      const userId = user._id;
      const res = await api.getLearn(userId);
      console.log(res.data)
      setFullData(res.data);
    }
    fetchLearn();
  }, [])

  const handleDelete = async (cardId) => {
    try {
      const user = JSON.parse(localStorage.getItem('login-info'))
      const userId = user._id;
      const data = { cardId, userId }
      await api.deleteLearnItem(data);
      const res = await api.getLearn(userId)
      setFullData(res.data)
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <>
      <Header categories={categories} />
      <div className='learner-container'>
        {fullData.length > 0 ?
          <>
            {fullData.map((item) => (
              <div key={item.id} className='full-container'>
                <div className='left-side'>
                  <video src={`${base_url}${item.video}`} className='video-learn' controls poster={`${base_url}${item.thumbnail}`} />
                </div>
                <div className='right-side'>
                  <img src={`${base_url}${item.thumbnail}`} alt="image" />
                  <div className='post-info'>
                    <span>By: {item.name}</span> , <span>{item.profession}</span>
                  </div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <button onClick={() => handleDelete(item.id)}>Remove from Learning</button>
                </div>
              </div>
            ))}
          </>
          : <>
            <Link to='/' className='home'>Explore Some Courses</Link>
          </>
        }
      </div>
    </>
  )
}

export default MyLearning
