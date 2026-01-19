/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

import hero1 from "../img/banner_Hero1.jpg";
import hero2 from "../img/banner_Hero2.jpg";
import hero3 from "../img/banner_Hero3.jpg";
const HeroSlider = () => {
  return (
    <>
      <div className="hero">
        <div className="container">
          <Swiper
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="content">
                <h4>Introduction the new</h4>
                <h3>
                  Microsoft Xbox <br /> Series X
                </h3>
                <p>Windows Xp/10/7/8 ps3, Tv Box</p>
                <Link to={"/"} className="btn">
                  Shop Now
                </Link>
              </div>
              <img src={hero1} alt="slider1" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="content">
                <h4>Introduction the new</h4>
                <h3>
                  Microsoft Xbox <br /> Series X
                </h3>
                <p>Windows Xp/10/7/8 ps3, Tv Box</p>
                <Link to={"/"} className="btn">
                  Shop Now
                </Link>
              </div>
              <img src={hero2} alt="slider1" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="content">
                <h4>Introduction the new</h4>
                <h3>
                  Microsoft Xbox <br /> Series X
                </h3>
                <p>Windows Xp/10/7/8 ps3, Tv Box</p>
                <Link to={"/"} className="btn">
                  Shop Now
                </Link>
              </div>
              <img src={hero3} alt="slider1" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HeroSlider;
