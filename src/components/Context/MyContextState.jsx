import React, { useState } from "react";
import myContext from "./MyContext";

const MyContextState = (props) => {
  const [issueNum, setIssueNum] = useState("");
  const [countDown, setCountDown] = useState(null);
  const [userBet, setUserBet] = useState([]);


  return (
    <myContext.Provider
      value={{
        issueNum,
        setIssueNum,
        countDown,
        setCountDown,
        userBet,
        setUserBet
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default MyContextState;
