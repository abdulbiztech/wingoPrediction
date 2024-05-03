import React, { useState, useEffect, createContext, useContext } from "react";
import Header from "../header/Header";
import styles from "./lottery.module.css";
import GameHistory from "../GameHistory/GameHistory";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL from "../../environment/api.js";
import myContext from "../Context/MyContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Lottery = () => {
  const { countDown, issueNum } = useContext(myContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [selectedOption, setSelectedOption] = useState("x1");
  const [showPopup, setShowPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState(1);
  const [isBettingAllowed, setIsBettingAllowed] = useState(true);
  const betAmounts = [1, 5, 10, 20, 50, 100];
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleIncrement = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    setSelectedButton(randomNumber.toString());
    setShowModal(true);
    setSelectedColor(
      randomNumber % 2 === 0
        ? "linear-gradient(180deg, #40ad72 51.48%, #b659fe 51.49%)"
        : "#fd565c"
    );
  };

  const getBalance = async () => {
    const userId = 1;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/user/get-balance?userId=${userId}`
      );

      if (!response.data) {
        throw new Error("Failed to fetch user balance data");
      }
      setBalance(response?.data?.data?.walletBalance);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching user balance data:", error);
      }
    }
  };
  const generateBetData = (selectType, amount) => {
    return {
      userId: 1,
      issueNumber: issueNum,
      selectType: selectType,
      amount: amount,
      betCount: amount,
      gameId: 1,
    };
  };

  const placeBet = async (selectType, amount) => {
    const data = generateBetData(selectType, amount);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/predict`,
        data
      );
      if (response.data.status) {
        console.log("Bet placed successfully");
        toast.success("Bet placed successfully");
        setShowModal(false);
        setAmount(1);
      } else {
        console.error("Failed to place bet:", response.data.message);
        toast.error(`Failed to place bet: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      toast.error(`Error placing bet: ${error.message}`);
    }
  };
  useEffect(() => {
    if (countDown === 5) {
      setShowPopup(true);
      setIsBettingAllowed(false); // Disable betting when time reaches 5 seconds
    }
  }, []);

  useEffect(() => {
    if (countDown <= 5) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [countDown]);

  useEffect(() => {
    getBalance();
  }, []);

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
                        <p>$ {balance}</p>
                        <button
                          className={`btn ${styles.balance_box}`}
                          onClick={getBalance}
                        >
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
                        <button className={`btn ${styles.count_num}`}>:</button>
                        <button className={`btn ${styles.count_num}`}>
                          {countDown}
                        </button>
                      </div>
                    </div>
                    <div className={`${styles.remain_box}`}>
                      <p className={` ${styles.bolder_num}`}>{issueNum}</p>
                    </div>
                  </div>
                </div>
              </div>
              <section className={`${styles.betting_card}`}>
                {show && (
                  <div className={`${styles.betting_card_mark}`}>
                    <div>0</div>
                    <div>{countDown}</div>
                  </div>
                )}
                <div className={`${styles.clr_btn_box}`}>
                  <div className={`${styles.clr_btn}`}>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("green");
                        setSelectedColor("#40ad72");
                      }}
                      className={`btn ${styles.green}`}
                    >
                      {" "}
                      Green
                    </button>
                  </div>
                  <div className={`${styles.clr_btn}`}>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("violet");
                        setSelectedColor("#b659fe");
                      }}
                      className={`btn ${styles.violet}`}
                    >
                      {" "}
                      Violet
                    </button>
                  </div>
                  <div className={`${styles.clr_btn}`}>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("red");
                        setSelectedColor("#fd565c");
                      }}
                      className={`btn ${styles.red}`}
                    >
                      {" "}
                      Red
                    </button>
                  </div>
                </div>

                <div className={` ${styles.play_num_box}`}>
                  <div className={`${styles.numberbox_img}`}>
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("0");
                        setSelectedColor(
                          "linear-gradient(180deg, #FD565C 50.96%, #b659fe 50.97%)"
                        );
                      }}
                      src="/src/assets/number-0.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("1");
                        setSelectedColor("#40ad72");
                      }}
                      src="/src/assets/number-1.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("2");
                        setSelectedColor("#fd565c");
                      }}
                      src="/src/assets/number-2.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("3");
                        setSelectedColor("#40ad72");
                      }}
                      src="/src/assets/number-3.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("4");
                        setSelectedColor("#fd565c");
                      }}
                      src="/src/assets/number-4.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("5");
                        setSelectedColor(
                          "linear-gradient(180deg, #40ad72 51.48%, #b659fe 51.49%)"
                        );
                      }}
                      src="/src/assets/number-5.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("6");
                        setSelectedColor("#fd565c");
                      }}
                      src="/src/assets/number-6.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("7");
                        setSelectedColor("#40ad72");
                      }}
                      src="/src/assets/number-7.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("8");
                        setSelectedColor("#fd565c");
                      }}
                      src="/src/assets/number-8.png"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("9");
                        setSelectedColor("#40ad72");
                      }}
                      src="/src/assets/number-9.png"
                      alt=""
                    />
                  </div>
                </div>

                <div className={`${styles.num_boxbtn}`}>
                  <button
                    className={`btn ${styles.num_boxbtn_random}`}
                    onClick={() => getRandomNumber()}
                  >
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
                  <button
                    className={`btn ${styles.num_play_boxbtn_big}`}
                    onClick={() => {
                      setShowModal(true);
                      setSelectedButton("big");
                      setSelectedColor("big");
                    }}
                  >
                    Big
                  </button>
                  <button
                    className={`btn ${styles.num_play_boxbtn_small}`}
                    onClick={() => {
                      setShowModal(true);
                      setSelectedButton("small");
                      setSelectedColor("small");
                    }}
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
        <Modal.Header
          className={`${styles.pop_up_head}`}
          style={{
            background: `${selectedColor}`,
          }}
        >
          <div className={`${styles.pop_up_title}`}>
            <p>Win Go 1Min</p>
          </div>
          <div className={`${styles.pop_up_selected}`}>
            <span>Select</span>
            <span>{selectedButton}</span>
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
                <button
                  className={`btn ${styles.pop_up_body_btn}`}
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="text"
                  value={amount} // Use value instead of defaultValue
                  onChange={handleAmountChange}
                  className={` ${styles.pop_up_body_btn_1}`}
                />
                <button
                  className={`btn ${styles.pop_up_body_btn}`}
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className={`${styles.pop_up_body_line}`}>
              <div className="div"></div>
              <div className={`${styles.pop_up_body_line_content}`}>
                {betAmounts.map((betAmount, index) => (
                  <button
                    key={index}
                    className={`btn ${styles.pop_up_body_line_content_btn}`}
                    onClick={() => setAmount(betAmount)}
                  >
                    {`x${betAmount}`}
                  </button>
                ))}
              </div>
            </div>
            <div className={`${styles.pop_up_body_line}`}>
              <div className={`${styles.pop_up_body_line_agree}`}>
                <input
                  type="radio"
                  id="agree"
                  name="agreement"
                  className="radio-btn"
                  defaultChecked
                />
                <span>I agree Pre-sale-rules</span>
              </div>
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
          <Button
            className={`btn ${styles.pop_up_submit_btn}`}
            onClick={() => placeBet(selectedButton, amount)}
          >
            Total Amount
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Lottery;
