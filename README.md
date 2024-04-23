# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



<!-- 2 min code logic

import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "./lottery.module.css";
import GameHistory from "../GameHistory/GameHistory";

const Lottery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [time, setTime] = useState(60);
  const [minutes, setMinutes] = useState(1);
  const [selectedOption, setSelectedOption] = useState("x1");

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const seconds = time % 60;
  const tensPlace = Math.floor(seconds / 10);
  const unitsPlace = seconds % 10;

  return (
    <>
      <Header />
      <div className={`${styles.mainContainer}`}>
        <div className="container my-5">
          <div className="row">
            <div className="col-6">
              <div className="wallet-box">
                <div className={`card ${styles.wallet_card}`}>
                  <div className="card-body">
                    <div className={` ${styles.price_box}`}>
                      <div className={`${styles.balance_show}`}>
                        <p>₹ 0.15</p>
                        <button className="btn">
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                      </div>
                      <div className={`${styles.balance_title}`}>
                        <i className="bi bi-wallet2"></i>
                        <p> Wallet balance</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-6">
                        <button className={`btn ${styles.withbtn}`}>
                          Withdraw
                        </button>
                      </div>
                      <div className="col-6">
                        <button className={`btn ${styles.depobtn}`}>
                          Deposit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.time_box}`}>
                {[
                  { text: "Win Go 1 Min" },
                  { text: "Win Go 3 Min" },
                  { text: "Win Go 5 Min" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.time_box_wihing} ${
                      activeIndex === index ? styles.cus_active : ""
                    }`}
                    onClick={() => handleItemClick(index)}
                  >
                    <img src="/src/assets/time-img.png" alt="" />
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="col-6">
                  <div className={` ${styles.play_box}`}>
                    <div className={` ${styles.how_box}`}>
                      <button className={`btn ${styles.btn_howplay}`}>
                        {" "}
                        <i className="bi bi-file-earmark"></i> How to play
                      </button>
                    </div>
                    <div className={` ${styles.win_res}`}>
                      <p>
                        Win Go <strong>1Min</strong>
                      </p>
                      <div className={` ${styles.number_img}`}>
                        <img src="/src/assets/number-1.png" alt="" />
                        <img src="/src/assets/number-2.png" alt="" />
                        <img src="/src/assets/number-3.png" alt="" />

                        <img src="/src/assets/number-4.png" alt="" />

                        <img src="/src/assets/number-5.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className={` ${styles.play_box}`}>
                    <div className={` ${styles.remain_box_text}`}>
                      <p>Time remaining</p>
                    </div>
                    <div className={` ${styles.remain_time}`}>
                      <div className={` ${styles.number_count}`}>
                        <button className={`btn ${styles.count_num}`}>
                          {minutes}
                        </button>
                        <button className={`btn ${styles.count_num}`}>:</button>
                        <button className={`btn ${styles.count_num}`}>
                          {tensPlace}
                        </button>
                        <button className={`btn ${styles.count_num}`}>
                          {unitsPlace}
                        </button>
                      </div>
                    </div>
                    <div className={`${styles.remain_box}`}>
                      <p
                        className={` ${styles.bolder_num}`}
                        data-number="20240418011079"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.clr_btn_box}`}></div>

            <div className={` ${styles.play_num_box}`}></div>

            <div className={`${styles.num_boxbtn}`}></div>

            <div className={`${styles.num_play_boxbtn}`}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lottery; -->