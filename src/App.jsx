import "./App.css";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Lottery from "./components/Games/Lottery";
import Login from "./components/loginPage/Login";
import MyContextState from "./components/Context/MyContextState";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <MyContextState>
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/lottery" element={<Lottery />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer autoClose={2000}/>
      </MyContextState>
    </>
  );
}

export default App;
