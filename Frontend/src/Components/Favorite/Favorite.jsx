import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { categoryContext } from '../../App'
import { useContext } from 'react'
import api from '../../utils/api';
import { Link } from 'react-router-dom';
const base_url = import.meta.env.VITE_BASE_URL;

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
        } catch (err) {
            console.log(err.message);
        }

    }

    const handleDelete = async (cardId)=>{
        try {
            const user = JSON.parse(localStorage.getItem('login-info'))
            const userId = user._id;
            const data = { cardId, userId }
            console.log(data)
            await api.deleteFavItem(data);
            const res = await api.getFav(userId)
            console.log(res.data);
            setFullData(res.data)
        } catch (err) {
            console.log(err.message)
        }
    }


    return (
        <div>
            <Header categories={categories} />
            <div className='fav-container'>
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
                                <button className='remove-btn' onClick={()=>handleDelete(item.id)}>❌</button>
                                <button onClick={() => handleCart(item.id)}>Add to Cart</button>
                                <button>Proceed Course</button>
                            </div>
                        </div>

                    ))}
                </> : <>
                    <Link to='/'>Add to Fav</Link>
                </>}
            </div>
        </div>
    )
}

export default Favorite
