import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { loginContext } from '../../App'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import './Header.css'
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import Explore from '../Explore/Explore'
import api from '../../utils/api'
function Header({ categories }) {
    const { isLogin, setIsLogin } = useContext(loginContext)
    const [fullData, setFullData] = useState([])
    const [search, setSearch] = useState('')
    const getInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(" ");
        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const getuser = JSON.parse(localStorage.getItem('login-info'));

    useEffect(() => {
        const info = localStorage.getItem("login-info");
        if (info) {
            setIsLogin(true);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.getAllCards();
            setFullData(res.data.data)
        }
        fetchData();
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }


    const searchName = fullData.filter(card => card.title.toLowerCase().includes(search.toLowerCase()) ||
        card.description.toLowerCase().includes(search.toLowerCase()))


    return (
        <div className='container' >
            <div className="image">
                <Link to='/'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZvP14HBpcaL_rzKBwwhDakccjqhKxzJLag&s" alt="Udemy" width='75' height='80' />
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Explore categories={categories} />
            </div>
            <div style={{ position: 'relative', width: '300px' }}>
                <input
                    label="Search"
                    name="search"
                    type="text"
                    onChange={handleChange}
                    value={search}
                    style={{width: '300px' , height:'50px', fontSize:'12px' , margin:'8px'}}
                />

                {search.length > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%', 
                            left: 0,
                            width: '100%',
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            zIndex: 1000,
                        }}
                    >
                        {searchName.map(item => (
                            <div
                            {...console.log(item)}
                                key={item._id}
                                style={{ padding: '8px', borderBottom: '1px solid #eee', cursor: 'pointer' }}
                            >
                                <Link to={`/${item.category}`} style={{textDecoration:'none', color:'inherit'}} onClick={()=>setSearch('')}>
                                    <div>{item.title}</div>
                                    <div style={{ fontSize: '12px', color: '#555' }}>{item.description}</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='link-info'>
                <Link to='/teach'>Teach on Udemy</Link>
            </div>

            {isLogin && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='link-info'>
                <Link to='/my-learning'>My Learning</Link>
            </div>}


            {isLogin && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link to='/fav'>
                    <MdFavoriteBorder style={{ height: '40px', width: '40px' }} />
                </Link>
            </div>}


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link to='/cart'>
                    <IoCartOutline style={{ height: '40px', width: '40px', }} />
                </Link>
            </div>


            {isLogin ? <div className="initials">{getInitials(getuser.name)}</div> :
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to='/login'>Login</Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to='/signup'>Signup</Link>
                    </div>
                </>
            }
        </div>
    )
}

export default Header
