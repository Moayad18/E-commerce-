// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

import "./slideProduct.css";
import Product from "./Product";

const SlideProduct = ({ title, data }) => {
  return (
    <div className="slide_product slide">
      <div className="container">
        <div className="top_slide">
          <h2>{title}</h2>
          <p>lorem ipsum dolor sit amet</p>
        </div>
        <>
          <Swiper
            spaceBetween={20}
            loop={data && data.length > 5 ? true : false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="mySwiper"
          >
            {data &&
              data.map((item) => (
                <SwiperSlide key={item.id}>
                  <Product item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default SlideProduct;
