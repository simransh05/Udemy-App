import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext } from '../../App'
import { useContext } from 'react'
import api from '../../utils/api';
import { Link } from 'react-router-dom';
const base_url = import.meta.env.VITE_BASE_URL;
import { toast } from 'react-toastify'
import './Favorite.css'

function Favorite() {
    const { categories } = useContext(categoryContext);
    const [fullData, setFullData] = useState([])
    useEffect(() => {
        const getCart = async () => {
            const user = JSON.parse(localStorage.getItem('login-info'))
            const userId = user._id;
            const res = await api.getFav(userId)
            console.log(res.data);
            setFullData(res.data)

        }
        getCart()
    }, [])

    const handleCart = async (cardId) => {
        try {
            const user = JSON.parse(localStorage.getItem('login-info'))
            const userId = user._id;
            const data = { cardId, userId }
            console.log(data)
            await api.postCart(data);
            const res = await api.getFav(userId)
            console.log(res.data);
            setFullData(res.data)
            toast.success('Added in Cart')
        } catch (err) {
            console.log(err.message);
        }

    }

    const handleDelete = async (cardId) => {
        try {
            const user = JSON.parse(localStorage.getItem('login-info'))
            const userId = user._id;
            const data = { cardId, userId }
            console.log(data)
            await api.deleteFavItem(data);
            const res = await api.getFav(userId)
            console.log(res.data);
            setFullData(res.data)
            toast.success(`Removed from your Favorite`);
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleProceed = async (cardId) => {
        try {
            const user = JSON.parse(localStorage.getItem('login-info'))
            const userId = user._id;
            const data = { userId, cardId }
            const res = await api.postLearn(data);
            console.log(res.data, res.status)
            if (res.status == 200) {
                toast.success('Added to Your Learning')
            }
            const res1 = await api.getFav(userId);
            setFullData(res1.data)
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <Header categories={categories} />
            <div className='fav-container'>
                {fullData.length > 0 ? <>
                    {fullData.map((item) => (
                        <div key={item.id} className='individual-cart'>
                            <img src={`${base_url}${item.thumbnail}`} alt="thumbnail" />
                            <h4>{item.title}</h4>
                            <em>{item.description}</em>
                            <div className="data">
                                <span style={{ gap: '4px' }}>{item.name}</span>, <span>{item.profession}</span>
                            </div>
                            <h3>${item.price}</h3>
                            <div className="btnGroup">
                                <button className='remove-btn' onClick={() => handleDelete(item.id)}>❌</button>
                                <button onClick={() => handleCart(item.id)} className='add'>Add to Cart</button>
                                <button onClick={() => handleProceed(item.id)} className='add'>Proceed Course</button>
                            </div>
                        </div>

                    ))}
                </> : <>
                    <Link to='/' className='home'>Explore Some Courses</Link>
                </>}
            </div>
        </div>
    )
}

export default Favorite
