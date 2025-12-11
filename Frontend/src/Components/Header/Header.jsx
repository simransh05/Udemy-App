import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { loginContext } from '../../App';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './Header.css';
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import Explore from '../Explore/Explore';
import api from '../../utils/api';
import { FiLogOut } from "react-icons/fi";

function Header({ categories }) {
    const { isLogin, setIsLogin } = useContext(loginContext)
    const [fullData, setFullData] = useState([])
    const [search, setSearch] = useState('')

    const getInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const getuser = JSON.parse(localStorage.getItem('login-info'));

    useEffect(() => {
        const info = localStorage.getItem("login-info");
        if (info) setIsLogin(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.getAllCards();
            setFullData(res.data.data)
        }
        fetchData();
    }, [])

    const handleChange = (e) => setSearch(e.target.value);

    const searchName = fullData.filter(card =>
        card.title.toLowerCase().includes(search.toLowerCase()) ||
        card.description.toLowerCase().includes(search.toLowerCase())
    );

    const logout = () => {
        const confirm = window.confirm('Are you sure yu want to Logout');
        if (confirm) {
            setIsLogin(false);
            localStorage.clear();
        }
    };

    return (
        <div className='header-container'>

            <div className="header-image">
                <Link to='/'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZvP14HBpcaL_rzKBwwhDakccjqhKxzJLag&s"
                        alt="Udemy" width='75' height='70'  />
                </Link>
            </div>

            <div className="center-flex">
                <Explore categories={categories} />
            </div>

            <div className="search-box">
                <input
                    name="search"
                    type="text"
                    onChange={handleChange}
                    value={search}
                    className="search-input"
                />

                {search.length > 0 && (
                    <div className="search-dropdown">
                        {searchName.map(item => (
                            <div key={item._id} className="search-item">
                                <Link to={`/${item.category}`} className="search-link" onClick={() => setSearch('')}>
                                    <div>{item.title}</div>
                                    <div className="search-desc">{item.description}</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='center-flex'>
                <Link to='/teach' className='link-info'>Teach on Udemy</Link>
            </div>

            {isLogin && (
                <div className='center-flex'>
                    <Link to='/my-learning' className='link-info'>My Learning</Link>
                </div>
            )}

            {isLogin && (
                <div className='center-flex'>
                    <Link to='/fav'>
                        <MdFavoriteBorder className="icon-size" />
                    </Link>
                </div>
            )}

            <div className='center-flex'>
                <Link to='/cart'>
                    <IoCartOutline className="icon-size" />
                </Link>
            </div>

            {isLogin ? (
                <>
                    <div className="initials">{getInitials(getuser.name)}</div>
                    <button className="logout-btn icon-size" onClick={logout}>
                        <FiLogOut style={{ width: '50px', height: '40px' }} />
                    </button>
                </>
            ) : (
                <>
                    <div className='center-flex'>
                        <Link to='/login'>Login</Link>
                    </div>
                    <div className='center-flex'>
                        <Link to='/signup'>Signup</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Header;