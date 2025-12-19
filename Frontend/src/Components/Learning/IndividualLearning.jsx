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
        <>
            <Header />
            <div className='info-container'>
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
            <div className="display-btn">
                <button onClick={() => navigate(ROUTES.MY_LEARNING)}>
                    Back
                </button>
            </div>
        </>
    )
}

export default IndividualLearning
