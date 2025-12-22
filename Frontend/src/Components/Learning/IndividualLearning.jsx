import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext } from '../../App'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import './Individual.css'
import ROUTES from '../../Constant/Routes';
function IndividualLearning() {
    const { cardId } = useParams();
    const navigate = useNavigate();
    const [fullData, setFullData] = useState({})

    useEffect(() => {
        const fetchIndividual = async () => {
            const res = await api.getIndividualLearn(cardId);
            setFullData(res.data)

        }
        fetchIndividual();
    }, [cardId])

    return (
        <>
            <Header />
            <div className='info-container'>
                <div className='left-side'>
                    <video src={`${fullData.video}`} className='video-learn' controls poster={`${fullData.thumbnail}`} />
                </div>
                <div className='right-side'>
                    <img src={`${fullData.thumbnail}`} alt="image" />
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
