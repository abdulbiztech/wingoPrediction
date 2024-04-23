import "./App.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import Lottery from "./components/Games/Lottery";
import CountdownPopup from "./components/CountDown";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Banner/>} />
        <Route path="/lottery" element={<Lottery/>} />
        <Route path="/count" element={<CountdownPopup/>} />


      </Routes>
    </>
  );
}

export default App;
