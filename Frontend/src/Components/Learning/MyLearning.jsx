import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useContext } from 'react'
import { categoryContext } from '../../App'
import api from '../../utils/api';
const base_url = import.meta.env.VITE_BASE_URL;
import './Learning.css'
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../../Constant/Routes';
import RatingModal from '../Modal/RatingModal';
import { toast } from 'react-toastify';
function MyLearning() {
  const { categories } = useContext(categoryContext);
  const [fullData, setFullData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [cardId, setID] = useState(null);

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

  const handleExplore = async (cardId) => {
    try {
      navigate(`${ROUTES.MY_LEARNING}/${cardId}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleRate = (cardId) => {
    setOpenModal(true);
    setID(cardId)
  }

  const handleSubmit = async (value) => {
    const user = JSON.parse(localStorage.getItem('login-info'));
    const userId = user._id;
    const data = { value, cardId, userId }
    console.log(data)
    try {
      const res = await api.addRating(data);
      if (res.status === 200) {
        toast.success('Send the Rating')
        const res1 = await api.getLearn(userId);
        setFullData(res1.data);
      }
      if (res.status == 404) {
        toast.info('Already given rating');
      }
    } catch (err) {
      console.log(err.message)
    }


  }
  return (
    <>
      <Header categories={categories} />
      <div className='learner-container'>
        {fullData.length > 0 ?
          <div className='main-individual'>
            {fullData.map((item) => (
              <div key={item.id} className='full-container'>
                <img src={`${base_url}${item.thumbnail}`} alt="image" />
                <div className='post-info'>
                  <span>By: {item.name}</span> , <span>{item.profession}</span>
                </div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <div className="btn-group">
                  <button onClick={() => handleExplore(item.id)}>Explore Course</button>
                  {!item.alreadyRated ? <button onClick={() => handleRate(item.id)}>Give Rating</button> :
                    <div className="parent-btn">
                      <div className='already-send'>Rating already sent</div>
                    </div>
                  }

                  {openModal &&
                    <RatingModal open={openModal}
                      onClose={() => setOpenModal(false)}
                      onSubmit={handleSubmit} />}
                </div>
              </div>
            ))}
          </div>
          : <>
            <Link to={ROUTES.HOME} className='home'>Explore Some Courses</Link>
          </>
        }
      </div>
    </>
  )
}

export default MyLearning
