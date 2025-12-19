import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { counterContext, loginContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import './Header.css';
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import Explore from '../Explore/Explore';
import api from '../../utils/api';
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import ROUTES from '../../Constant/Routes';

function Header() {
    const { currentUser ,setCurrentUser} = useContext(loginContext)
    const { counter } = useContext(counterContext);
    const [fullData, setFullData] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const getInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

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

    const logout = async () => {
        const result = await Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to logout?',
            cancelButtonText: 'No',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            icon: 'warning',
            reverseButtons: true
        })
        if (result.isConfirmed) {
            await api.logout();
            setCurrentUser(null)
            navigate('/');
        }
    };

    console.log(currentUser)

    return (
        <div className='header-container'>

            <div className="header-image">
                <Link to='/'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZvP14HBpcaL_rzKBwwhDakccjqhKxzJLag&s"
                        alt="Udemy" width='75' height='70' />
                </Link>
            </div>

            <div className="center-flex">
                <Explore />
            </div>

            <div className="search-box">
                <IoMdSearch className='search-icon' />
                <input
                    name="search"
                    type="text"
                    onChange={handleChange}
                    value={search}
                    className="search-input"
                    placeholder='Search for anything'
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
                <Link to={ROUTES.TEACH} className='link-info'>Teach on Udemy</Link>
            </div>

            {currentUser && (
                <div className='center-flex'>
                    <Link to={ROUTES.MY_LEARNING} className='link-info'>My Learning</Link>
                </div>
            )}

            {currentUser && currentUser.role != 'learner' && <Link to={ROUTES.MY_COURSE} className='link-info'>
                My Course
            </Link>}

            {currentUser && (
                <div className='center-flex'>
                    {counter.fav > 0 && <div className='count'>
                        <div className='counter'>{counter.fav}</div>
                    </div>}
                    <Link to={ROUTES.FAV}>
                        <MdFavoriteBorder className="icon-size" />
                    </Link>
                </div>
            )}

            <div className='center-flex'>
                {counter.cart > 0 && <div className='count'>
                    <div className='counter'>{counter.cart}</div>
                </div>}
                <Link to={ROUTES.CART}>
                    <IoCartOutline className="icon-size" />
                </Link>
            </div>

            {currentUser ? (
                <>
                    <div className="initials">{getInitials(currentUser.name)}</div>
                    <button className="logout-btn icon-size" onClick={logout}>
                        <FiLogOut style={{ width: '50px', height: '40px' }} />
                    </button>
                </>
            ) : (
                <>
                    <div className='center-flex'>
                        <Link to={ROUTES.LOGIN} className='link-info'>Login</Link>
                    </div>
                    <div className='center-flex'>
                        <Link to={ROUTES.SIGNUP} className='link-info'>Signup</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Header;