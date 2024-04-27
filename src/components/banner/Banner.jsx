import React from "react";
import styles from "./banner.module.css";
import Slider from "../slider/page";
import Header from "../header/Header";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <Header />

        <div className="container-fluid my-1 mx-1">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className={`carousel-item active ${styles.cus_carousel_item}`}>
            <img
              src="/src/assets/banner1.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className={`carousel-item ${styles.cus_carousel_item}`}>
            <img
              src="/src/assets/banner.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className={`carousel-item ${styles.cus_carousel_item}`}>
            <img
              src="/src/assets/banner3.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className={`carousel-control-prev ${styles.prev_nav}`}
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className={`carousel-control-next ${styles.prev_next}`}
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>

      {/* OUR GAMES */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 col-4 text-center">
            <div className={` ${styles.line}`}></div>
          </div>
          <div className="col-md-2 col-4 text-center">
            <div className={` ${styles.title_box}`}>
              <p className="mb-0">OUR GAMES</p>
            </div>
          </div>
          <div className="col-md-5 col-4 text-center">
            <div className={` ${styles.line}`}></div>
          </div>
        </div>

        <div className="sliderbox">
          <Slider />
        </div>
      </div>

      {/* Lottery Games */}
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className={` ${styles.heading}`}>
              <img src="/src/assets/lottery_logo.png" alt="" />
              <h3>Lottery</h3>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <Link to="/lottery">
              <div className={` ${styles.banner}`}>
                <img
                  src="/src/assets/wingo-banner.jpg"
                  alt=""
                  className={` ${styles.banner_img}`}
                />
                <img
                  src="/src/assets/3icons-wingo.png"
                  alt=""
                  className={` ${styles.lottery_icon_img}`}
                />
                <span className={` ${styles.lottery_span}`}>Win Go</span>
                <h4 className={` ${styles.lottery_h4}`}>
                  <div>Guess Number</div>
                  <div>Green/Red/Purple to win</div>
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
