import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext, counterContext, loginContext } from '../../App'
import { useContext } from 'react'
import api from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css'
import ROUTES from '../../Constant/Routes';
const base_url = import.meta.env.VITE_BASE_URL;
function Cart() {
    const navigate = useNavigate();
    const { setCounter } = useContext(counterContext);
    const { currentUser, setCurrentUser } = useContext(loginContext)
    const [fullData, setFullData] = useState([])

    const handleDelete = async (cardId) => {
        try {
            console.log(cardId);
            let res;
            if (!currentUser) {
                let cardIds = JSON.parse(localStorage.getItem('guest-cart'))
                console.log(cardIds);
                cardIds = cardIds.filter(item => item !== cardId);
                localStorage.setItem('guest-cart', JSON.stringify(cardIds));
                res = await api.getGuestCart({ ids: cardIds });
            } else {
                const userId = currentUser._id;
                const data = { cardId, userId }
                await api.deleteCartItem(data);
                res = await api.getCart(userId)
            }
            setCounter((prev) => ({ ...prev, cart: prev.cart - 1 }))
            setFullData(res.data)
            toast.success('Removed from the Cart')
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleProceed = async (cardId) => {
        try {
            if (!currentUser) {
                toast.error('Need to Login First');
                navigate(ROUTES.LOGIN);
            }
            const userId = currentUser._id;
            const data = { userId, cardId }
            const res = await api.postLearn(data);
            console.log(res.data, res.status)
            if (res.status == 200) {
                toast.success('Added to Your Learning')
            }
            setCounter((prev) => ({ ...prev, cart: prev.cart - 1 }))
            const res1 = await api.getCart(userId);
            setFullData(res1.data)
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        const getCart = async () => {
            let res;
            if (!currentUser) {
                const cardIds = JSON.parse(localStorage.getItem('guest-cart'))
                console.log(cardIds);
                res = await api.getGuestCart({ ids: cardIds });
            } else {
                const userId = currentUser._id;
                res = await api.getCart(userId)
            }
            console.log(res.data);
            setFullData(res.data)

        }
        getCart()
    }, [])

    return (
        <>
            <Header />
            <div className='cart-container'>
                {fullData.length > 0 ? <>
                    <div className="main-individual">
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
                    </div>
                </> : <>
                    <Link to={ROUTES.HOME} className='home'>Explore Some Course</Link>
                </>}
            </div>
        </>
    )
}

export default Cart