import "./App.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import Lottery from "./components/Games/Lottery";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Banner/>} />
        <Route path="/lottery" element={<Lottery/>} />

      </Routes>
    </>
  );
}

export default App;
