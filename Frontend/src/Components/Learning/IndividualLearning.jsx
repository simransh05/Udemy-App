import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext } from '../../App'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
const base_url = import.meta.env.VITE_BASE_URL;
import './Individual.css'
import ROUTES from '../../Constant/Routes';
function IndividualLearning() {
    const { cardId } = useParams();
    const navigate = useNavigate();
    // get the data from backend for individual by when click explore api for explore get by id the info of the card
    const { categories } = useContext(categoryContext);
    const [fullData, setFullData] = useState({})

    useEffect(() => {
        const fetchIndividual = async () => {
            const res = await api.getIndividualLearn(cardId);
            console.log(res.data)
            setFullData(res.data)

        }
        fetchIndividual();
    }, [cardId])

    console.log(fullData)
    return (
        <div>
            <Header categories={categories} />
            <div className='learner-container'>

                <div key={fullData.id} className='full-container'>
                    <div className='left-side'>
                        <video src={`${base_url}${fullData.video}`} className='video-learn' controls poster={`${base_url}${fullData.thumbnail}`} />
                    </div>
                    <div className='right-side'>
                        <img src={`${base_url}${fullData.thumbnail}`} alt="image" />
                        <div className='post-info'>
                            <span>By: {fullData.name}</span> , <span>{fullData.profession}</span>
                        </div>
                        <strong>{fullData.title}</strong>
                        <p>{fullData.description}</p>
                    </div>
                </div>
                <button onClick={() => navigate(ROUTES.MY_LEARNING)}>
                    Back
                </button>
            </div>
        </div>
    )
}

export default IndividualLearning
