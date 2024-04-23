import React, { useState } from "react";
import styles from "./gamehistory.module.css";
import ReactPaginate from "react-paginate";

const GameHistory = () => {
  const [selectedButton, setSelectedButton] = useState("gameHistory");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;

  const data = {
    list: [
      {
        issueNumber: "20240420010731",
        number: "6",
        colour: "red",
        premium: "Small",
      },
      {
        issueNumber: "20240420010730",
        number: "8",
        colour: "red",
        premium: "Small",
      },
      {
        issueNumber: "20240420010729",
        number: "4",
        colour: "red",
        premium: "Small",
      },
      {
        issueNumber: "20240420010728",
        number: "0",
        colour: "red,violet",
        premium: "Big",
      },
      {
        issueNumber: "20240420010727",
        number: "0",
        colour: "red,violet",
        premium: "Big",
      },
      {
        issueNumber: "20240420010726",
        number: "5",
        colour: "green,violet",
        premium: "Big",
      },
      {
        issueNumber: "20240420010725",
        number: "9",
        colour: "green",
        premium: "Big",
      },
      {
        issueNumber: "20240420010724",
        number: "1",
        colour: "green",
        premium: "Big",
      },
      {
        issueNumber: "20240420010723",
        number: "7",
        colour: "green",
        premium: "Big",
      },
      {
        issueNumber: "20240420010722",
        number: "8",
        colour: "red",
        premium: "Small",
      },
      {
        issueNumber: "20240420010725",
        number: "9",
        colour: "green",
        premium: "Big",
      },
      {
        issueNumber: "20240420010724",
        number: "1",
        colour: "green",
        premium: "Big",
      },
      {
        issueNumber: "20240420010723",
        number: "7",
        colour: "green",
        premium: "Big",
      },
      {
        issueNumber: "20240420010722",
        number: "8",
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

  const getColorForPremium = (premium, number, colour) => {
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
          return colour === "green"
            ? "rgba(71, 186, 124, 1)"
            : "rgba(253, 86, 92, 1)"; // Green if color is green, otherwise red
        case 1:
        case 3:
        case 7:
        case 9:
          return colour.includes("red")
            ? "linear-gradient(to top, rgba(253, 86, 92, 1) 50%, rgba(182, 89, 254, 1) 50.01%)"
            : "rgba(71, 186, 124, 1)"; // Red if color is red, otherwise green
        default:
          return "rgba(253, 86, 92, 1)"; // Red
      }
    }
  };

  const paginatedData = data.list.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

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
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.issueNumber}</td>
                  <td
                    style={{
                      background: getColorForPremium(
                        item.premium,
                        item.number,
                        item.colour
                      ),
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.number}
                  </td>
                  <td>{item.premium}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {item.colour.includes("red") &&
                      item.colour.includes("violet") ? (
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
                      ) : item.colour.includes("green") &&
                        item.colour.includes("violet") ? (
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
                      ) : item.colour.includes("violet") &&
                        item.number !== "5" ? (
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#ec4cdf",
                          }}
                        ></div>
                      ) : item.colour.includes("red") && item.number !== "5" ? (
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#fd565c",
                          }}
                        ></div>
                      ) : item.colour === "green" ? (
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
    </>
  );
};

export default GameHistory;
