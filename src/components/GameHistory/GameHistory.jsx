import React, { useEffect, useState, useContext } from "react";
import styles from "./gamehistory.module.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_BASE_URL from "../../environment/api.js";
import myContext from "../Context/MyContext.jsx";
import io from "socket.io-client";
const GameHistory = () => {
  const { timeLeft, setTimeLeft } = useContext(myContext);
  const { setIssueNum } = useContext(myContext);
  const [selectedButton, setSelectedButton] = useState("gameHistory");
  const [currentPage, setCurrentPage] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameIssue, setGameIssue] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const saveTimeLeftToLocalStorage = (timeLeft) => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
  };
  const pageSize = 15;
  const data = {
    list: [
      {
        issueNumber: "20240420010731",
        number: "6",
        colour: "red",
        premium: "Small",
      },
    ],
    pageNo: 1,
    totalPage: Math.ceil(1684 / pageSize),
    totalCount: 16838,
  };

  const handleCardClick = (cardId) => {
    setSelectedCard(selectedCard === cardId ? null : cardId); // Toggle the selected card
  };
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getColorForPremium = (category, number, color) => {
    if (number === "0") {
      return "linear-gradient(to top, rgba(253, 86, 92, 1) 50%, rgba(182, 89, 254, 1) 50.01%)";
    } else if (number === "5") {
      return "linear-gradient(to top, rgba(71, 186, 124, 1) 50%, rgba(236, 76, 223, 1) 50.01%)";
    } else {
      switch (parseInt(number)) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 8:
          return typeof color === "string" && color === "green"
            ? "rgba(71, 186, 124, 1)"
            : "rgba(253, 86, 92, 1)"; // Green if color is green, otherwise red
        case 1:
        case 3:
        case 7:
        case 9:
          return typeof color === "string" && color.includes("red")
            ? "linear-gradient(to top, rgba(253, 86, 92, 1) 50%, rgba(182, 89, 254, 1) 50.01%)"
            : "rgba(71, 186, 124, 1)"; // Red if color is red, otherwise green
        default:
          return "rgba(253, 86, 92, 1)"; // Red
      }
    }
  };
  const getGameHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/game/get-game-history?page=1`
      );
      setGameHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const paginatedData = gameHistory.data?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
  const getGameIssue = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/game/get-currentGame-issue`
      );
      if (!response.data) {
        throw new Error("Failed to fetch game issue data");
      }
      return response.data.data; // Return the game issue data
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching game issue data:", error);
      }
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  // const fetchData = async () => {
  //   try {
  //     await getGameHistory();

  //     const gameIssueData = await getGameIssue();
  //     setGameIssue(gameIssueData);
  //     setIssueNum(gameIssueData?.issueNumber);
  //   } catch (error) {
  //     console.error("Error fetching game data:", error);
  //   }
  // };

  // const loadTimeLeftFromLocalStorage = () => {
  //   const storedTimeLeft = localStorage.getItem("timeLeft");
  //   if (storedTimeLeft) {
  //     return JSON.parse(storedTimeLeft);
  //   }
  //   return null;
  // };

  // Timer Effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       if (!gameIssue) return { minutes: 0, seconds: 0 };

  //       const startTime = new Date(gameIssue.startTime);
  //       const endTime = new Date(gameIssue.endTime);
  //       const now = new Date();
  //       let difference;

  //       if (now < startTime) {
  //         difference = startTime - now;
  //       } else if (now > endTime) {
  //         const timeUntilNextIssue = new Date(endTime);
  //         timeUntilNextIssue.setSeconds(timeUntilNextIssue.getSeconds() + 60); // Assuming the next issue starts after 60 seconds
  //         difference = timeUntilNextIssue - now;
  //       } else {
  //         difference = endTime - now;
  //       }

  //       const totalSeconds = Math.floor(difference / 1000);
  //       const minutes = Math.floor(totalSeconds / 60);
  //       const seconds = totalSeconds % 60;

  //       if (minutes === 0 && seconds === 0) {
  //         fetchData(); // Fetch data every minute
  //       }

  //       // Save time left to local storage only when it changes
  //       if (
  //         prevTimeLeft.minutes !== minutes ||
  //         prevTimeLeft.seconds !== seconds
  //       ) {
  //         saveTimeLeftToLocalStorage({ minutes, seconds });
  //       }

  //       return { minutes, seconds };
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [gameIssue]);

  // Initial Fetch Effect
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const savedTimeLeft = loadTimeLeftFromLocalStorage();
  //   if (savedTimeLeft) {
  //     setTimeLeft(savedTimeLeft);
  //   }
  // }, []);
  useEffect(() => {
    const socket = io("http://192.168.1.28:4000"); // Replace with your WebSocket server URL

    // Subscribe to the "gameIssue" event
    socket.on("gameIssueGenerated", (data) => {
      console.log("data", data);
      // console.log("issueNumber",data?.data?.issueNumber);
      // setGameIssue(data);
      // setIssueNum(data?.issueNumber);
    });

    // Cleanup function
    // return () => {
    //   socket.disconnect(); // Disconnect the WebSocket connection when component unmounts
    // };
  }, []);
  return (
    <>
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
            selectedButton === "chart"
              ? styles.chart_btn_selected
              : styles.chart_btn
          }`}
          onClick={() => handleButtonClick("chart")}
        >
          Chart
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
              {paginatedData?.map((item, index) => (
                <tr key={index}>
                  <td>{item.issueNumber}</td>
                  <td
                    style={{
                      color: getColorForPremium(
                        item.category,
                        item.number,
                        item.color
                      ),
                      // WebkitBackgroundClip: "text",
                      // WebkitTextFillColor: "transparent",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
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
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`paginationBtn ${currentPage === 0 ? "disabled" : ""}`}
            >
              Previous
            </button>
            <span>
              {currentPage + 1}/{data.totalPage}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === data.totalPage - 1}
              className={`paginationBtn ${
                currentPage === data.totalPage - 1 ? "disabled" : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
      {selectedButton === "chart" && (
        // <div className={`${styles.chart_box}`}>
        //   <div className={`row ${styles.chart_box_title}`}>
        //     <div className="col-4">
        //       <p>Period</p>
        //     </div>
        //     <div className="col-8">
        //       <p>Number</p>
        //     </div>
        //   </div>

        //   here start the code
        // </div>
        <div className={`${styles.chart_box}`}>
          <div className={`row ${styles.chart_box_title}`}>
            <div className="col-4">
              <p>Statistic (last 100 Periods)</p>
            </div>
            <div className="col-8">
              <p>Number</p>
            </div>
          </div>

          {/* Content */}
          <div className={`row ${styles.chart_content}`}>
            {/* Winning number */}
            <div className="col-4">
              <p>Winning number</p>
            </div>
            <div className="col-8">
              <div className={`${styles.Winning_Num}`}>
                <p>9</p>
                <p>14</p>
                <p>15</p>
                <p>8</p>
                <p>9</p>
                <p>9</p>
                <p>5</p>
                <p>14</p>
                <p>5</p>
                <p>12</p>
              </div>
            </div>

            {/* Missing */}
            <div className="col-4">
              <p>Missing</p>
            </div>
            <div className="col-8">
              <div className={`${styles.Missing_Num}`}>
                <p>19</p>
                <p>1</p>
                <p>2</p>
                <p>5</p>
                <p>27</p>
                <p>8</p>
                <p>9</p>
                <p>7</p>
                <p>0</p>
                <p>6</p>
              </div>
            </div>

            {/* Avg missing */}
            <div className="col-4">
              <p>Avg missing</p>
            </div>
            <div className="col-8">
              <div className={`${styles.AVG_Num}`}>
                <div>10</div>
                <div>6</div>
                <div>7</div>
                <div>11</div>
                <div>10</div>
                <div>9</div>
                <div>15</div>
                <div>7</div>
                <div>19</div>
                <div>8</div>
              </div>
            </div>

            {/* Frequency */}
            <div className="col-4">
              <p>Frequency</p>
            </div>
            <div className="col-8">
              <div className={`${styles.MAX_NUM}`}>
                <div>9</div>
                <div>14</div>
                <div>15</div>
                <div>8</div>
                <div>9</div>
                <div>9</div>
                <div>5</div>
                <div>14</div>
                <div>5</div>
                <div>12</div>
              </div>
            </div>

            {/* Max consecutive */}
            <div className="col-4">
              <p>Max consecutive</p>
            </div>
            <div className="col-8">
              <div className={`${styles.MAX_CON_NUM}`}>
                <div>2</div>
                <div>3</div>
                <div>3</div>
                <div>2</div>
                <div>2</div>
                <div>1</div>
                <div>1</div>
                <div>2</div>
                <div>1</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedButton === "myHistory" && (
        <div className="row dashboard-cards">
          <div
            className={`card col-md-12 ${styles.mygame_history_item_2}`}
            onClick={() => handleCardClick(1)}
          >
            <div className={`${styles.MyGameRecordList__C}`}>
              <div className={`${styles.MyGameRecordList__item_1}`}>small</div>
              <div className="MyGameRecordList__C-item-m">
                <div className="MyGameRecordList__C-item-m-top">
                  20240429011019
                </div>
                <div className="MyGameRecordList__C-item-m-bottom">
                  2024-04-29 16:58:09
                </div>
              </div>
              <div className="MyGameRecordList__C-item-r">
                <div className="">Failed</div>
                <span>-₹0.98</span>
              </div>
            </div>
            {selectedCard === 1 && (
              <div>
                <div className={`${styles.card_Details}`}>
                  <h2>Details</h2>
                  <div className={`${styles.card_Details_1}`}>
                    <p>Order Number</p>
                    <p>WG2024042916580928159291a</p>
                  </div>
                  <div className={`${styles.card_Details_2}`}>
                    <p>Period</p>
                    <p>20240429011019</p>
                  </div>

                  <div className={`${styles.card_Details_3}`}>
                    <p>Purchase Amount</p>
                    <p>₹1.00</p>
                  </div>

                  <div className={`${styles.card_Details_4}`}>
                    <p>Quantity</p>
                    <p>1</p>
                  </div>

                  <div className={`${styles.card_Details_5}`}>
                    <p>Amount After Tax</p>
                    <p className="red">₹0.98</p>
                  </div>

                  <div className={`${styles.card_Details_6}`}>
                    <p>Tax</p>
                    <p>₹0.02</p>
                  </div>

                  <div className={`${styles.card_Details_7}`}>
                    <p>Result</p>
                    <div>
                      <div className={styles.MyGameRecordList__C_inlineB}>
                        8
                      </div>
                      <div
                        className={`${styles.MyGameRecordList__C_inlineB} ${styles.redColor}`}
                      >
                        Red
                      </div>
                      <div className={styles.MyGameRecordList__C_inlineB}>
                        Big
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.card_Details_8}`}>
                    <p>Select</p>
                    <p>Small</p>
                  </div>

                  <div className={`${styles.card_Details_9}`}>
                    <p>Status</p>
                    <p className="red">Failed</p>
                  </div>

                  <div className={`${styles.card_Details_10}`}>
                    <p>Win/Lose</p>
                    <p className="red">- ₹0.98</p>
                  </div>

                  <div className={`${styles.card_Details_11}`}>
                    <p>Order Time</p>
                    <p>2024-04-29 16:58:09</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GameHistory;
