import React, { useState } from "react";
import myContext from "./MyContext";
const MyContextState = (props) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds:0});

  const [datas, setDatas] = useState("Hi");

  return (
    <myContext.Provider value={{ datas, setDatas,timeLeft,setTimeLeft }}>
      {props.children}
    </myContext.Provider>
  );
};
export default MyContextState;
