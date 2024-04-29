import React, { useEffect, useState, useContext } from "react";
import styles from "./gamehistory.module.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_BASE_URL from "../../environment/api.js";
import myContext from "../Context/MyContext.jsx";

const GameHistory = () => {
  const { timeLeft, setTimeLeft } = useContext(myContext);
  const { setIssueNum } = useContext(myContext);
  const [selectedButton, setSelectedButton] = useState("gameHistory");
  const [currentPage, setCurrentPage] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameIssue, setGameIssue] = useState(null);

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

  // const getGameIssue = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_BASE_URL}/api/game/get-currentGame-issue`
  //     );
  //     if (!response.data) {
  //       throw new Error("Failed to fetch game issue data");
  //     }
  //     await getGameHistory();
  //     setGameIssue(response.data?.data);
  //     setIssueNum(response.data?.data?.issueNumber);
  //   } catch (error) {
  //     if (axios.isCancel(error)) {
  //       console.log("Request canceled:", error.message);
  //     } else {
  //       console.error("Error fetching game issue data:", error);
  //     }
  //   }
  // };
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

  const fetchData = async () => {
    try {
      await getGameHistory();

      const gameIssueData = await getGameIssue();
      setGameIssue(gameIssueData);
      setIssueNum(gameIssueData?.issueNumber);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  const loadTimeLeftFromLocalStorage = () => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    if (storedTimeLeft) {
      return JSON.parse(storedTimeLeft);
    }
    return null;
  };

  // Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (!gameIssue) return { minutes: 0, seconds: 0 };

        const startTime = new Date(gameIssue.startTime);
        const endTime = new Date(gameIssue.endTime);
        const now = new Date();
        let difference;

        if (now < startTime) {
          difference = startTime - now;
        } else if (now > endTime) {
          const timeUntilNextIssue = new Date(endTime);
          timeUntilNextIssue.setSeconds(timeUntilNextIssue.getSeconds() + 60); // Assuming the next issue starts after 60 seconds
          difference = timeUntilNextIssue - now;
        } else {
          difference = endTime - now;
        }

        const totalSeconds = Math.floor(difference / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        if (minutes === 0 && seconds === 0) {
          fetchData(); // Fetch data every minute
        }

        // Save time left to local storage only when it changes
        if (
          prevTimeLeft.minutes !== minutes ||
          prevTimeLeft.seconds !== seconds
        ) {
          saveTimeLeftToLocalStorage({ minutes, seconds });
        }

        return { minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameIssue]);

  // Initial Fetch Effect
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const savedTimeLeft = loadTimeLeftFromLocalStorage();
    if (savedTimeLeft) {
      setTimeLeft(savedTimeLeft);
    }
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
      {selectedButton === "chart" && <div>Chart</div>}
      {selectedButton === "myHistory" && (
        <div className={`${styles.mygame_history_box}`}>
          <div className={`${styles.mygame_history_list}`}>
            <div className={`${styles.mygame_history_item_1}`}>
              <p>Small</p>
            </div>
            <div className={`${styles.mygame_history_item_2}`}>
              <p>2</p>
            </div>
            <div className={`${styles.mygame_history_item_3}`}>
              <p>3</p>
            </div>
          </div>
        </div>
      )}
      {/* <div>
        Time Left: {timeLeft?.minutes}: {timeLeft?.seconds}
      </div> */}
    </>
  );
};

export default GameHistory;
