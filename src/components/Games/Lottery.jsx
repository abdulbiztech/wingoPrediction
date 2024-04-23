import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import styles from "./lottery.module.css";
import GameHistory from "../GameHistory/GameHistory";
import { Modal, Button } from "react-bootstrap";
const Lottery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [time, setTime] = useState(60);
  const [selectedOption, setSelectedOption] = useState("x1");
  const [showPopup, setShowPopup] = useState(false);
  const [count, setCount] = useState(5);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
          return 60;
        }
        if (prevTime === 5) {
          setShowPopup(true);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const seconds = time % 60;
  const tensPlace = Math.floor(seconds / 10);
  const unitsPlace = seconds % 10;
  useEffect(() => {
    if (tensPlace === 0 && unitsPlace <= 5) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [tensPlace, unitsPlace]);

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
                        <button className={`btn ${styles.count_num}`}>0</button>
                        <button className={`btn ${styles.count_num}`}>0</button>
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
              <section className={`${styles.betting_card}`}>
                {show && (
                  <div className={`${styles.betting_card_mark}`}>
                    <div>0</div>
                    <div>{unitsPlace}</div>
                  </div>
                )}
                <div className={`${styles.clr_btn_box}`}>
                  <div className={`${styles.clr_btn}`}>
                    <button className={`btn ${styles.green}`}> Green</button>
                  </div>
                  <div className={`${styles.clr_btn}`}>
                    <button className={`btn ${styles.violet}`}> Violet</button>
                  </div>
                  <div className={`${styles.clr_btn}`}>
                    <button className={`btn ${styles.red}`}> Red</button>
                  </div>
                </div>

                <div className={` ${styles.play_num_box}`}>
                  <div className={`${styles.numberbox_img}`}>
                    <img src="/src/assets/number-0.png" alt="" />
                    <img src="/src/assets/number-1.png" alt="" />
                    <img src="/src/assets/number-2.png" alt="" />
                    <img src="/src/assets/number-3.png" alt="" />
                    <img src="/src/assets/number-4.png" alt="" />
                    <img src="/src/assets/number-5.png" alt="" />
                    <img src="/src/assets/number-6.png" alt="" />
                    <img src="/src/assets/number-7.png" alt="" />
                    <img src="/src/assets/number-8.png" alt="" />
                    <img src="/src/assets/number-9.png" alt="" />
                  </div>
                </div>

                <div className={`${styles.num_boxbtn}`}>
                  <button className={`btn ${styles.num_boxbtn_random}`}>
                    Random
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x1" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x1")}
                  >
                    x1
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x5" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x5")}
                  >
                    x5
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x10" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x10")}
                  >
                    x10
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x20" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x20")}
                  >
                    x20
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x50" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x50")}
                  >
                    x50
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x100" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x100")}
                  >
                    x100
                  </button>
                </div>

                <div className={`${styles.num_play_boxbtn}`}>
                  <button className={`btn ${styles.num_play_boxbtn_big}`}>
                    Big
                  </button>
                  <button
                    className={`btn ${styles.num_play_boxbtn_small}`}
                    onClick={() => setShowModal(true)}
                  >
                    Small
                  </button>
                </div>
              </section>
            </div>

            <div className="col-6">
              <div className={`${styles.game_record}`}>
                <GameHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className={`${styles.pop_up_head}`}>
          {/* <Modal.Title>Modal title</Modal.Title> */}

          <div className={`${styles.pop_up_title}`}>
            <p>Win Go 1Min</p>
          </div>
          <div className={`${styles.pop_up_selected}`}>
            <span>Select</span>
            <span>Big</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={`${styles.pop_up_body}`}>
            <div className={`${styles.pop_up_body_line}`}>
              Balance
              <div className={`${styles.pop_up_body_list}`}>
                <div className={`${styles.pop_up_body_line_item}`}>1</div>
                <div className={`${styles.pop_up_body_line_item}`}>10</div>
                <div className={`${styles.pop_up_body_line_item}`}>100</div>
                <div className={`${styles.pop_up_body_line_item}`}>1000</div>
              </div>
            </div>

            <div className={`${styles.pop_up_body_line}`}>
              Quantity
              <div className={`${styles.pop_up_body_line_btn}`}>
                <button className={`btn ${styles.pop_up_body_btn}`}>-</button>
                <input type="text" value={1} className={` ${styles.pop_up_body_btn_1}`} />
                {/* <button type="input" className={` ${styles.pop_up_body_btn_1}`}>1</button> */}
                <button className={`btn ${styles.pop_up_body_btn}`}>+</button>
              </div>
            </div>
            <div className={`${styles.pop_up_body_line}`}>
              <div className="div"></div>
              <div className={`${styles.pop_up_body_line_content}`}>
                <button
                  className={`btn ${styles.pop_up_body_line_content_btn}`}
                >
                  x1
                </button>
                <button
                  className={`btn ${styles.pop_up_body_line_content_btn}`}
                >
                  x5
                </button>
                <button
                  className={`btn ${styles.pop_up_body_line_content_btn}`}
                >
                  x10
                </button>
                <button
                  className={`btn ${styles.pop_up_body_line_content_btn}`}
                >
                  x20
                </button>
                <button
                  className={`btn ${styles.pop_up_body_line_content_btn}`}
                >
                  x50
                </button>
                <button
                  className={`btn ${styles.pop_up_body_line_content_btn}`}
                >
                  x100
                </button>
              </div>
            </div>

            <div className={`${styles.pop_up_body_line}`}>
              <div className={`${styles.pop_up_body_line_agree}`}>
                <input
                  type="radio"
                  id="agree"
                  name="agreement"
                  className="radio-btn"
                />
                <span>I agree Pre-sale-rules</span>
              </div>
              <div></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={`btn  ${styles.pop_up_submit}`}>
          <Button
            className={`btn ${styles.pop_up_submit_btn}`}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button className={`btn ${styles.pop_up_submit_btn}`}>
            Total Amount
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Lottery;
