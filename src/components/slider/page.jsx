import styles from "./slider.module.css";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const page = () => {
  return (
    <>
      <div className="container text-white my-5">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          modules={[Navigation, Pagination, A11y]}
          className="mySwiper"
        >
          <SwiperSlide className={` ${styles.slider_img}`}>
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/161bee1e80cc01b73bb2241caca62734f77887fa-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/55c5f17c925647006ab298bd6c68887773b19e68-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/d6ea36f4dfaa59834d7f2e793245676a65302991-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/0c8a53eceee39c093046b4b02b5a17e696716dd0-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/55c5f17c925647006ab298bd6c68887773b19e68-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/3bb73be42cb6d63f1a4fcedc55b8e66c0fab7519-281x367.png"
              alt=""
            />
          </SwiperSlide>

          {/* 2 */}
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/c7ffe0b1972a969ad53ed6ee947436ea737e588b-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/40d9000c0f407fb3855f99ccb2d194c7f95f48e1-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/55c5f17c925647006ab298bd6c68887773b19e68-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/91de268e9c0899d8d829c54bd5dc823a07d439fe-281x367.png"
              alt=""
            />
          </SwiperSlide>

          {/* 3 */}
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/d6ea36f4dfaa59834d7f2e793245676a65302991-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/40d9000c0f407fb3855f99ccb2d194c7f95f48e1-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/55c5f17c925647006ab298bd6c68887773b19e68-281x367.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={` ${styles.slider_img}`}>
            {" "}
            <img
              src="https://cdn.sanity.io/images/j6di4pid/production/d6ea36f4dfaa59834d7f2e793245676a65302991-281x367.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default page


