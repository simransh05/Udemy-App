import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext } from '../../App'
import { useContext } from 'react'
import api from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css'
const base_url = import.meta.env.VITE_BASE_URL;
function Cart() {
    const navigate = useNavigate();
    const { categories } = useContext(categoryContext);
    const [fullData, setFullData] = useState([])

    const handleDelete = async (cardId) => {
        try {
            const user = JSON.parse(localStorage.getItem('login-info'))
            console.log(cardId);
            let res ;
            if (!user) {
                let cardIds = JSON.parse(localStorage.getItem('guest-cart'))
                console.log(cardIds);
                cardIds = cardIds.filter(item => item !== cardId);
                localStorage.setItem('guest-cart', JSON.stringify(cardIds));
                res = await api.getGuestCart({ ids: cardIds });
            } else {
                const userId = user._id;
                const data = { cardId, userId }
                await api.deleteCartItem(data);
                res = await api.getCart(userId)
            }
            setFullData(res.data)
            toast.success('Removed from the Cart')
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleProceed = async (cardId) => {
        try {
            const user = JSON.parse(localStorage.getItem('login-info'))
            if (!user) {
                toast.error('Need to Login First');
                navigate('/login');
            }
            const userId = user._id;
            const data = { userId, cardId }
            const res = await api.postLearn(data);
            console.log(res.data, res.status)
            if (res.status == 200) {
                toast.success('Added to Your Learning')
            }
            const res1 = await api.getCart(userId);
            setFullData(res1.data)
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        const getCart = async () => {
            const user = JSON.parse(localStorage.getItem('login-info'))
            let res;
            if (!user) {
                const cardIds = JSON.parse(localStorage.getItem('guest-cart'))
                console.log(cardIds);
                res = await api.getGuestCart({ ids: cardIds });
            } else {
                const userId = user._id;
                res = await api.getCart(userId)
            }
            console.log(res.data);
            setFullData(res.data)

        }
        getCart()
    }, [])

    // console.log(fullData)

    return (
        <>
            <Header categories={categories} />
            <div className='cart-container'>
                {fullData.length > 0 ? <>
                    {fullData.map((item) => (
                        <div key={item.id || item._id} className='individual-cart'>
                            <img src={`${base_url}${item.thumbnail}`} alt="thumbnail" />
                            <h4>{item.title}</h4>
                            <em>{item.description}</em>
                            <div className="data">
                                <span style={{ gap: '4px' }}>{item.name || item.userId.name}</span>, <span>{item.profession || item.userId.profession}</span>
                            </div>
                            <h3>${item.price}</h3>
                            <div className="btnGroup">
                                <button className='remove-btn1' onClick={() => handleDelete(item.id || item._id)}>Remove</button>
                                <button onClick={() => handleProceed(item.id || item._id)} className='add'>Proceed Course</button>
                            </div>
                        </div>

                    ))}
                </> : <>
                    <Link to='/' className='home'>Explore Some Course</Link>
                </>}
            </div>
        </>
    )
}

export default Cart