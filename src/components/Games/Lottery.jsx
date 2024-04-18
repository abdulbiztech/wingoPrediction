import React from "react";
import Header from "../header/Header";
import styles from "./lottery.module.css";

const Lottery = () => {
  return (
    <>
      <Header />
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
                        <i class="bi bi-arrow-clockwise"></i>
                      </button>
                    </div>
                    <div className={`${styles.balance_title}`}>
                      <i class="bi bi-wallet2"></i>
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
              <div className={`${styles.time_box_wihing} ${styles.cus_active}`}>
                <img src="/src/assets/time-img.png" alt="" />
                <p>Win Go 1 Min</p>
              </div>
              {/* 2 */}
              <div className={`${styles.time_box_wihing}`}>
                <img src="/src/assets/time-img.png" alt="" />
                <p>Win Go 1 Min</p>
              </div>

              {/* 3 */}
              <div className={`${styles.time_box_wihing}`}>
                <img src="/src/assets/time-img.png" alt="" />
                <p>Win Go 1 Min</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className={` ${styles.play_box}`}>
                  <div className={` ${styles.how_box}`}>
                    <button className={`btn ${styles.btn_howplay}`}>
                      {" "}
                      <i class="bi bi-file-earmark"></i> How to play
                    </button>
                  </div>
                  <div className={` ${styles.win_res}`}>
                    <p>Win Go 1Min</p>
                    <div className={` ${styles.number_img}`}>
                      <img src="/src/assets/number-1.png" alt="" />
                      <img src="/src/assets/number-1.png" alt="" />
                      <img src="/src/assets/number-1.png" alt="" />

                      <img src="/src/assets/number-1.png" alt="" />

                      <img src="/src/assets/number-1.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className={` ${styles.play_box}`}>
                  <div className={` ${styles.remain_box}`}>
                    <p>Time remaining</p>
                  </div>
                  <div className={` ${styles.remain_time}`}>
                    <div className={` ${styles.number_count}`}>
                      <button className={`btn ${styles.count_num}`}>0</button>
                      <button className={`btn ${styles.count_num}`}>0</button>
                      <button className={`btn ${styles.count_num}`}>:</button>
                      <button className={`btn ${styles.count_num}`}>0</button>
                      <button className={`btn ${styles.count_num}`}>9</button>
                    </div>
                  </div>
                  <div className={`${styles.remain_box}`}>
                    <p className={` ${styles.bolder_num}`}>20240418011079</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.clr_btn_box}`}>
                <div className={`${styles.clr_btn}`}>
                  <button className="btn btn-success"> Green</button>
                </div>
                <div className={`${styles.clr_btn}`}>
                  <button className="btn btn-success"> Green</button>
                </div>
                <div className={`${styles.clr_btn}`}>
                  <button className="btn btn-success"> Green</button>
                </div>
              </div>

              <div className={` ${styles.play_num_box}`}>
                <div className={`${styles.numberbox_img}`}>
                  <img src="/src/assets/number-1.png" alt="" />
                  <img src="/src/assets/number-1.png" alt="" />
                  <img src="/src/assets/number-1.png" alt="" />

                  <img src="/src/assets/number-1.png" alt="" />

                  <img src="/src/assets/number-1.png" alt="" />
                  <img src="/src/assets/number-1.png" alt="" />
                  <img src="/src/assets/number-1.png" alt="" />
                  <img src="/src/assets/number-1.png" alt="" />
                  <img src="/src/assets/number-1.png" alt="" />
                  <img src="/src/assets/number-1.png" alt="" />
                </div>
              </div>

              <div className={`${styles.num_boxbtn}`}>
                      <button className="btn btn-danger">Random</button>
                      <button className="btn btn-success"> x1</button>
                      <button className="btn btn-primary"> x5</button>
                      <button className="btn btn-primary"> x10</button>
                      <button className="btn btn-primary"> x20</button>
                      <button className="btn btn-primary"> x50</button>
                      <button className="btn btn-primary"> x100</button>
              </div>

              <div className={`${styles.num_play_boxbtn}`}>
                      <button className="btn btn-danger">Big</button>
                      <button className="btn btn-success">Small</button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="history-box"></div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Lottery;
