import React from 'react'
import Header from '../Header/Header'
import { useContext } from 'react'
import { loginContext } from '../../App'
import SubHeader from '../SubHead/SubHeader';
import Cards from '../Cards/Cards';
import Slider from "react-slick";
import { useEffect } from 'react';
import Slide1 from '../Slides/Slide1';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide2 from '../Slides/Slide2';
function HomePage() {
    const { isLogin, setIsLogin } = useContext(loginContext);

    const categories = [
        { name: "Development", sub: ["Web Development", "Mobile Development", "Game Development"] },
        { name: "Business", sub: ["Entrepreneurship", "Communication", "Management"] },
        { name: "Finance & Accounting", sub: ["Accounting & Bookkeeping", "Finance", "Investing & Trading"] },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    useEffect(() => {
        const info = localStorage.getItem("login-info");
        if (info) {
            setIsLogin(true);
        }
    }, []);

    return (
        <div>
            <Header categories={categories}/>

            {isLogin && <SubHeader categories={categories}/>}

            {/* slider */}
            <div className="container-slider" style={{
                width: '100%',
                overflow: 'hidden',
                padding: '20px 0',
            }}>
                <Slider {...settings}>
                    {/* all the slides */}
                    <Slide1 />
                    <Slide2 />
                    <Slide1 />
                    <Slide2 />
                    <Slide1 />
                </Slider>
            </div>

            {/* if login then the content also trending how it check by rating */}
            {isLogin && <Cards />}
        </div >
    )
}

export default HomePage
