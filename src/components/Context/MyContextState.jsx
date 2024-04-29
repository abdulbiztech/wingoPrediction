import React, { useState } from "react";
import myContext from "./MyContext";
const MyContextState = (props) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Retrieve timeLeft from localStorage or set default value if not found
    const savedTimeLeft = localStorage.getItem("timeLeft");
    return savedTimeLeft ? JSON.parse(savedTimeLeft) : { minutes: 0, seconds: 0 };
  });
  const [issueNum, setIssueNum] = useState("");

  const [datas, setDatas] = useState("Hi");

  return (
    <myContext.Provider
      value={{ datas, setDatas, timeLeft, setTimeLeft,issueNum,setIssueNum}}
    >
      {props.children}
    </myContext.Provider>
  );
};
export default MyContextState;
