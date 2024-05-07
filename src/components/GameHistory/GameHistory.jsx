import React, { useEffect, useState, useContext } from "react";
import styles from "./gamehistory.module.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_BASE_URL from "../../environment/api.js";
import myContext from "../Context/MyContext.jsx";
import io from "socket.io-client";
import { Modal, Button } from "react-bootstrap";
const GameHistory = (props) => {
  // console.log("GameHistory",props);
  const { setIsplace, isplace } = props;
  const { issueNum, setIssueNum } = useContext(myContext);
  const { countDown, setCountDown } = useContext(myContext);
  const { userBet, setUserBet } = useContext(myContext);
  const [selectedButton, setSelectedButton] = useState("gameHistory");
  const [gameHistory, setGameHistory] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userResults, setUserResults] = useState("");
  const [betPlaced, setBetPlaced] = useState(false);
  const pageSize = 13;
  const [currentPageMyhistory, setCurrentPageMyHistory] = useState(1);
  const [totalPagesMyhistory, setTotalPagesMyhistory] = useState(1);
  const [paginatedDataMyHis, setPaginatedDataMyHis] = useState([]);
  const itemsPerPage = 10;
  const [resultAnnounced, setResultAnnounced] = useState(false);

  const handleCardClick = (cardId) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };
  const getColorForPremium = (number) => {
    const numString = String(number).toLowerCase();
    if (numString === "0") {
      return styles.gradientRedViolet2;
    } else if (numString === "5") {
      return styles.gradientGreenViolet2;
    } else if (["2", "4", "6", "8"].includes(numString)) {
      return styles.redColor2;
    } else if (["1", "3", "7", "9"].includes(numString)) {
      return styles.greenColor2;
    } else {
      return ""; // Return default style
    }
  };


  const getColorForSelectType = (selectType) => {
    if (selectType.toLowerCase() === "0") {
      return styles.gradientRedViolet;
    } else if (selectType.toLowerCase() === "5") {
      return styles.gradientGreenViolet;
    } else if (["2", "4", "6", "8"].includes(selectType.toLowerCase())) {
      return styles.redColor;
    } else if (["1", "3", "7", "9"].includes(selectType.toLowerCase())) {
      return styles.greenColor;
    } else if (selectType.toLowerCase() === "small") {
      return styles.smallColor;
    } else if (selectType.toLowerCase() === "big") {
      return styles.bigColor;
    } else if (selectType.toLowerCase() === "green") {
      return styles.greenColor;
    } else if (selectType.toLowerCase() === "violet") {
      return styles.violetColor;
    } else if (selectType.toLowerCase() === "red") {
      return styles.redColor;
    } else {
      return "";
    }
  };

  const getColorForSelect = (selectType) => {
    if (selectType.toLowerCase() === "0") {
      return styles.gradientRedViolet;
    } else if (selectType.toLowerCase() === "5") {
      return styles.gradientGreenViolet;
    } else if (["2", "4", "6", "8"].includes(selectType.toLowerCase())) {
      return styles.redColor;
    } else if (["1", "3", "7", "9"].includes(selectType.toLowerCase())) {
      return styles.greenColor;
    } else {
      return "";
    }
  };
  const handleButtonClick = (buttonName) => {
    setSelectedButton((prevButton) =>
      prevButton === buttonName ? prevButton : buttonName
    );
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handlePageMyHistory = (page) => {
    if (page >= 1 && page <= totalPagesMyhistory) {
      setCurrentPageMyHistory(page);
    }
  };
  const getGameHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/game/get-game-history?page=${currentPage}`
      );
      setGameHistory(response?.data?.data);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching game history:", error);
    }
  };
  const getUserBetHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/user/bet-history?userId=1&page=${currentPageMyhistory}`
      );
      setUserBet(response.data.data);
      setTotalPagesMyhistory(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching user bet history:", error);
    }
  };

  const getUserResult = async () => {
    if (!issueNum) {
      console.error("Error: No issue number available.");
      return;
    }

    const data = {
      userId: 1,
      issueNumber: issueNum,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/game/announce-results`,
        data
      );
      if (response) {
        setResultAnnounced(true);
        setUserResults(response.data.message);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("404 Not Found: The endpoint does not exist.");
      } else {
        console.error("Error fetching user bet history:", error);
      }
    }
  };
  const placeBetsData = (placeBets) => {
    if (placeBets) {
      setBetPlaced(true);
    }
  };
  useEffect(() => {
    if (countDown === 0) {
      getUserResult();
      getUserBetHistory();
      // setIsplace(false);
    }
  }, [countDown]);
  useEffect(() => {
    if (isplace === true) {
      getUserBetHistory();
      setIsplace(false);
    }
  }, [isplace]);

  useEffect(() => {
    getGameHistory();
    getUserBetHistory();
    const socket = io(`${API_BASE_URL}`);
    const countDownIssue = (countdownUpdate) => {
      setIssueNum(countdownUpdate?.issueNumber);
      setCountDown(countdownUpdate?.remainingTime);
      if (countdownUpdate?.remainingTime === 0) {
        getGameHistory();
        getUserBetHistory();
      }
    };
    socket.on("countdownUpdate", countDownIssue);
    socket.on("placeBets", placeBetsData);
    return () => {
      socket.disconnect();
    };
  }, [currentPageMyhistory, currentPage, setIssueNum, setCountDown]);

  useEffect(() => {
    if (countDown === 0) {
      getUserBetHistory();
      setBetPlaced(false);
    }
  }, [countDown, betPlaced]);

  useEffect(() => {
    setPaginatedData(
      gameHistory.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [gameHistory, currentPage, pageSize]);
  useEffect(() => {
    setPaginatedDataMyHis(
      userBet?.slice(
        (currentPageMyhistory - 1) * itemsPerPage,
        currentPageMyhistory * itemsPerPage
      )
    );
  }, [userBet, currentPageMyhistory, itemsPerPage]);

  return (
    <>
      <Modal show={resultAnnounced} onHide={() => setResultAnnounced(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Result Announced</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{userResults}</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setResultAnnounced(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.gameHistory}>
        <button
          className={`btn ${
            selectedButton === "gameHistory"
              ? styles.gamehistory_btn_selected
              : styles.gamehistory_btn
          }`}
          onClick={() => handleButtonClick("gameHistory")}
        >
          Game History
        </button>

        <button
          className={`btn ${
            selectedButton === "myHistory"
              ? styles.myhistory_btn_selected
              : styles.myhistory_btn
          }`}
          onClick={() => handleButtonClick("myHistory")}
        >
          My History
        </button>
      </div>

      {selectedButton === "gameHistory" && (
        <>
          {gameHistory.length === 0 ? (
            <div className={`${styles.noData_message}`}>No data available</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Number</th>
                  <th>Big Small</th>
                  <th>Colour</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.issueNumber}</td>

<td className={`${getColorForPremium(item.number)}`}>
  {item.number}
</td>


                    <td>{item.category}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {item.color &&
                        typeof item.color === "string" &&
                        item.color.includes("red") &&
                        item.color.includes("violet") ? (
                          <>
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#fd565c",
                              }}
                            ></div>
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#ec4cdf",
                              }}
                            ></div>
                          </>
                        ) : item.color &&
                          typeof item.color === "string" &&
                          item.color.includes("green") &&
                          item.color.includes("violet") ? (
                          <>
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#47ba7c",
                              }}
                            ></div>
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#ec4cdf",
                              }}
                            ></div>
                          </>
                        ) : item.color &&
                          typeof item.color === "string" &&
                          item.color.includes("violet") &&
                          item.number !== "5" ? (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#ec4cdf",
                            }}
                          ></div>
                        ) : item.color &&
                          typeof item.color === "string" &&
                          item.color.includes("red") &&
                          item.number !== "5" ? (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#fd565c",
                            }}
                          ></div>
                        ) : item.color === "green" ? (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#47ba7c",
                            }}
                          ></div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedButton === "myHistory" && (
        <div className="row dashboard-cards">
          {userBet.length === 0 ? (
            <div className={`${styles.noData_message}`}>No data available</div>
          ) : (
            userBet?.map((bet, index) => (
              <div
                key={index}
                className={`card col-md-12 ${styles.mygame_history_item_2}`}
                onClick={() => handleCardClick(index)}
              >
                <div className={`${styles.MyGameRecordList__C}`}>
                  {/* <div className={`${styles.MyGameRecordList__item_1}`}>
                    {bet.selectType}
                  </div> */}
                  <div
                    className={`${
                      styles.MyGameRecordList__item_1
                    } ${getColorForSelectType(
                      bet.selectType,
                      bet.number,
                      bet.color
                    )}`}
                  >
                    {bet.selectType}
                  </div>

                  <div className="MyGameRecordList__C-item-m">
                    <div className="MyGameRecordList__C-item-m-top">
                      {bet.issueNumber}
                    </div>
                    <div className="MyGameRecordList__C-item-m-bottom">
                      {bet.betResult !== "pending" && (
                        <div className="MyGameRecordList__C-item-m-bottom">
                          {bet.createdAt}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="MyGameRecordList__C-item-r">
                    <div className={`${styles.bet_result_box}`}>
                      {bet.betResult !== "pending"
                        ? bet.betResult === "win"
                          ? "Success"
                          : "Failed"
                        : "Pending"}
                    </div>
                    <span>
                      {bet.betResult !== "pending"
                        ? `$${bet.amountAfterTax}`
                        : "Pending"}
                    </span>
                  </div>
                </div>

                {selectedCard === index && (
                  <div>
                    <div className={`${styles.card_Details}`}>
                      <h2>Details</h2>
                      <div className={`${styles.card_Details_1}`}>
                        <p>Order Number</p>
                        <p>{bet.orderId}</p>
                      </div>
                      <div className={`${styles.card_Details_2}`}>
                        <p>Period</p>
                        <p>{bet.issueNumber}</p>
                      </div>

                      <div className={`${styles.card_Details_3}`}>
                        <p>Purchase Amount</p>
                        <p>{`$${bet.betAmount.toFixed(2)}`}</p>
                      </div>

                      <div className={`${styles.card_Details_4}`}>
                        <p>Quantity</p>
                        <p>{bet.betCount}</p>
                      </div>

                      <div className={`${styles.card_Details_5}`}>
                        <p>Amount After Tax</p>
                        <p
                          className={bet.betResult === "win" ? "green" : "red"}
                        >{`$${bet.amountAfterTax.toFixed(2)}`}</p>
                      </div>

                      <div className={`${styles.card_Details_6}`}>
                        <p>Tax</p>
                        <p>{`$${bet.serviceFee}`}</p>
                      </div>

                      <div className={`${styles.card_Details_7}`}>
                        <p>Result</p>
                        <div>
                          <div className={styles.MyGameRecordList__C_inlineB}>
                            {bet.number}
                          </div>
                          <div
                            className={`${styles.MyGameRecordList__C_inlineB} ${
                              bet.color === "red"
                                ? styles.redColor
                                : styles.greenColor
                            }`}
                          >
                            {bet.color}
                          </div>
                          <div className={styles.MyGameRecordList__C_inlineB}>
                            {bet.category}
                          </div>
                        </div>
                      </div>

                      <div className={`${styles.card_Details_8}`}>
                        <p>Select</p>
                        <p>{bet.selectType}</p>
                      </div>

                      <div className={`${styles.card_Details_9}`}>
                        <p>Status</p>
                        <p
                          className={bet.betResult === "win" ? "green" : "red"}
                        >
                          {bet.betResult === "win" ? "Success" : "Failed"}
                        </p>
                      </div>
                      <div className={`${styles.card_Details_10}`}>
                        <p>Win/Lose</p>
                        <p
                          className={bet.betResult === "win" ? "green" : "red"}
                        >
                          {bet.betResult === "pending"
                            ? "Pending"
                            : `$${bet.profitAmount.toFixed(2)}`}
                        </p>
                      </div>

                      <div className={`${styles.card_Details_11}`}>
                        <p>Order Time</p>
                        <p>{bet.createdAt}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageMyHistory(currentPageMyhistory - 1)}
              disabled={currentPageMyhistory === 1}
            >
              Previous
            </button>
            <span>
              {currentPageMyhistory} / {totalPagesMyhistory}
            </span>
            <button
              onClick={() => handlePageMyHistory(currentPageMyhistory + 1)}
              disabled={currentPageMyhistory === totalPagesMyhistory}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameHistory;
