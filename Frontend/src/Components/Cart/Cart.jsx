import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext } from '../../App'
import { useContext } from 'react'
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const base_url = import.meta.env.VITE_BASE_URL;
function Cart() {
    const { categories } = useContext(categoryContext);
    const [fullData, setFullData] = useState([])

    const handleDelete = async (cardId) => {
        try {
            const user = JSON.parse(localStorage.getItem('login-info'))
            const userId = user._id;
            const data = { cardId, userId }
            await api.deleteCartItem(data);
            const res = await api.getCart(userId)
            setFullData(res.data)
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
            console.log(res.data,res.status)
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
            const userId = user._id;
            const res = await api.getCart(userId)
            console.log(res.data);
            setFullData(res.data)

        }
        getCart()
    }, [])

    console.log(fullData)

    return (
        <div>
            <Header categories={categories} />
            <div className='cart-container'>
                {fullData.length > 0 ? <>
                    {fullData.map((item) => (
                        <div key={item.id}>
                            <img src={`${base_url}${item.thumbnail}`} alt="thumbnail" width={250} height={200} />
                            <div>
                                <span>{item.name}</span> , <span>{item.profession}</span>
                            </div>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                            <div>$ {item.price}</div>
                            <div className="btnGroup">
                                <button className='remove-btn' onClick={() => handleDelete(item.id)}>❌</button>
                                <button onClick={()=>handleProceed(item.id)}>Proceed Course</button>
                            </div>
                        </div>

                    ))}
                </> : <>
                    <Link to='/'>Explore Some Course</Link>
                </>}
            </div>
        </div>
    )
}

export default Cart