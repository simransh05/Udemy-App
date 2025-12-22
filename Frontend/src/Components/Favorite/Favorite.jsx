import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext, counterContext, loginContext } from '../../App'
import { useContext } from 'react'
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import './Favorite.css'
import ROUTES from '../../Constant/Routes';

function Favorite() {
    const { setCounter } = useContext(counterContext);
    const { currentUser, setCurrentUser } = useContext(loginContext)
    const [fullData, setFullData] = useState(null)
    useEffect(() => {
        const getCart = async () => {
            const userId = currentUser?._id;
            const res = await api.getFav(userId)
            setFullData(res.data)

        }
        getCart()
    }, [])

    const handleCart = async (cardId) => {
        try {
            const userId = currentUser._id;
            const data = { cardId, userId }
            await api.postCart(data);
            const res = await api.getFav(userId)
            setCounter((prev) => ({ ...prev, fav: prev.fav - 1 }))
            setCounter((prev) => ({ ...prev, cart: prev.cart + 1 }))
            setFullData(res.data)
            toast.success('Added in Cart')
        } catch (err) {
            console.log(err.message);
        }

    }

    const handleDelete = async (cardId) => {
        try {
            const userId = currentUser._id;
            const data = { cardId, userId }
            await api.deleteFavItem(data);
            const res = await api.getFav(userId)
            setCounter((prev) => ({ ...prev, fav: prev.fav - 1 }))
            setFullData(res.data)
            toast.success(`Removed from your Favorite`);
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleProceed = async (cardId) => {
        try {
            const userId = currentUser._id;
            const data = { userId, cardId }
            const res = await api.postLearn(data);
            setCounter((prev) => ({ ...prev, fav: prev.fav - 1 }))
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
            <Header />
            <div className='fav-container'>
                {fullData?.length > 0 ? <>
                    <div className="main-container">
                        {fullData.map((item) => (
                            <div key={item.id} className='individual-fav'>
                                <img src={`${item.thumbnail}`} alt="thumbnail" />
                                <h4>{item.title}</h4>
                                <em>{item.description}</em>
                                <div className="data">
                                    <span style={{ gap: '4px' }}>{item.name}</span>, <span>{item.profession}</span>
                                </div>
                                <h3>${item.price}</h3>
                                <div className="btnGroup">
                                    <button className='remove-btn' onClick={() => handleDelete(item.id)}>❌</button>
                                    <button onClick={() => handleCart(item.id)} className='add1'>Add to Cart</button>
                                    <button onClick={() => handleProceed(item.id)} className='add1'>Proceed Course</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </> : <>
                    <Link to={ROUTES.HOME} className='home'>Explore Some Courses</Link>
                </>}
            </div>
        </div>
    )
}

export default Favorite
