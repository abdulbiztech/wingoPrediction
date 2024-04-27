import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import Lottery from "./components/Games/Lottery";
import MyContextState from "./components/Context/MyContextState";

function App() {
  return (
    <>
      <MyContextState>
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/lottery" element={<Lottery />} />
        </Routes>
      </MyContextState>
    </>
  );
}

export default App;
