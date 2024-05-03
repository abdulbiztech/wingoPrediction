import React, { useState } from "react";
import myContext from "./MyContext";

const MyContextState = (props) => {
  const [issueNum, setIssueNum] = useState("");
  const [countDown, setCountDown] = useState(null);

  return (
    <myContext.Provider
      value={{
        issueNum,
        setIssueNum,
        countDown,
        setCountDown,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default MyContextState;
