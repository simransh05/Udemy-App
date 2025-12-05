import React, { useEffect } from 'react'
import { useContext } from 'react'
import { loginContext } from '../../App'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import './Header.css'
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import Explore from '../Explore/Explore'
function Header({ categories }) {
    const { isLogin, setIsLogin } = useContext(loginContext)
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

            {/* search */}
            <TextField
                label="Search"
                name="search"
                type="text"
                onChange={(e) => e.target.value}
                margin="normal"
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='link-info'>
                <Link to='/teach'>Teach on Udemy</Link>
            </div>

            {isLogin && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='link-info'>
                <Link to='/my-learning'>My Learning</Link>
            </div>}


            {isLogin && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button>
                    <MdFavoriteBorder style={{ height: '40px', width: '40px' }} />
                </Button>
            </div>}


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button>
                    <IoCartOutline style={{ height: '40px', width: '40px', }} />
                </Button>
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
