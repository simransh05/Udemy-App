import React, { useContext, useEffect, useState } from 'react'
import api from '../../utils/api';
import Header from '../Header/Header';
import { categoryContext, loginContext } from '../../App';
import { Link } from 'react-router-dom';
const base_url = import.meta.env.VITE_BASE_URL;
import './MyCourse.css'
import { toast } from 'react-toastify';
import ROUTES from '../../Constant/Routes';

function MyCourse() {
    const [fullData, setFormData] = useState([]);
    const { currentUser } = useContext(loginContext) 
    const userId = currentUser._id;
    const role = user.role;
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.getAllCards();
            console.log(res.data)
            let data;
            if (role === 'admin') {
                data = res.data.data;
            } else if (role === 'creator') {
                data = res.data.data.filter(
                    val => userId === val?.userId?._id
                );
            }
            setFormData(data);
        };

        fetchData();
    }, [userId]);

    const handleCardDelete = async (cardId) => {
        try {
            await api.deleteCardItem(cardId);
            toast.error('Course deleted')
            const res = await api.getAllCards();
            let data;
            if (role === 'admin') {
                data = res.data.data;
            } else if (role === 'creator') {
                data = res.data.data.filter(
                    val => userId === val?.userId?._id
                );
            }
            setFormData(data);
        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <>
            <Header />
            <div className="full-my-container">
                {fullData.length > 0 ?
                    <div className="main-individual">
                        {fullData.map((item) => (
                            <div key={item._id} className='individual-course'>
                                <img src={`${base_url}${item.thumbnail}`} alt="thumbnail" />
                                <h4>{item.title}</h4>
                                <em>{item.description}</em>

                                <div className="data">
                                    <span>{item.userId?.name}</span>,{" "}
                                    <span>{item.userId?.profession}</span>
                                </div>

                                <h3>${item.price}</h3>

                                <div className='btn-remove'>
                                    <button
                                        className='remove-btn1'
                                        onClick={() => handleCardDelete(item._id)}
                                    >
                                        Remove Course
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    : (
                        <Link to={ROUTES.TEACH} className='teach'>Teach On Udemy</Link>
                    )}
            </div>
        </>
    )
}

export default MyCourse
