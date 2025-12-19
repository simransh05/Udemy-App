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
import './HomePage.css'
function HomePage() {
    const { currentUser } = useContext(loginContext)

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

    return (
        <div>
            <Header />

            {currentUser && <SubHeader />}

            <div className="container-slider">
                <Slider {...settings}>
                    <Slide1 />
                    <Slide2 />
                    <Slide1 />
                    <Slide2 />
                    <Slide1 />
                </Slider>
            </div>
            {currentUser && <Cards />}
        </div >
    )
}

export default HomePage
