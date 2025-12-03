import React from 'react'
import { useContext } from 'react'
import { loginContext } from '../../App'
import Teach from '../Teach/Teach'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

function Header() {
    const { isLogin } = useContext(loginContext)
    return (
        <div>
            {/* heading */}
            {/* explore */}
            {/* search */}
            {/* Teach on udemy */}
            <Link to='/teach'></Link>
            {/* my learning */}
            {isLogin && <div></div>}
            {/* fav */}
            {isLogin && <div></div>}
            {/* cart */}

            {isLogin ? <Avatar /> :
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </>
            }
        </div>
    )
}

export default Header
