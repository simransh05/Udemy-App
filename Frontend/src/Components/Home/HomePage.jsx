import React from 'react'
import Header from '../Header/Header'
import { useContext } from 'react'
import { loginContext } from '../../App'
import SubHeader from '../SubHead/SubHeader';
import Cards from '../Cards/Cards';
import Slider from "react-slick";
import { useEffect } from 'react';
function HomePage() {
    const { isLogin, setIsLogin } = useContext(loginContext);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const info = localStorage.getItem("login-info");
        if (info) {
            setIsLogin(true);
        }
    }, []);

    return (
        <div>
            <Header />

            {/* every explore have a route when u click any the route become the data  */}

            {/* iflogin then the expore content in the menu type on hover draw down menu */}
            {isLogin && <SubHeader />}

            {/* slider */}
            <Slider {...settings}>
                {/* all the slides */}
            </Slider>

            {/* if login then the content also trending how it check by rating */}
            {isLogin && <Cards />}
        </div>
    )
}

export default HomePage
