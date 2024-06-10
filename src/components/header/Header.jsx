import React, { useContext, useEffect } from "react";
import styles from "./header.module.css";
import GameVerseHub from "../../assets/GameVerseHub.png"
import { useNavigate } from "react-router-dom";
import myContext from "../Context/MyContext.jsx";
import axios from "axios";
import API_BASE_URL from "../../environment/api.js";
import { toast } from "react-toastify";
const Header = () => {
  const { userId, setUserId } = useContext(myContext);
  const { balance, setBalance } = useContext(myContext);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [setUserId]);

  const handleConnectClick = () => {
    navigate('/login');
  };


  const handleRemoveUserId = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/user-logOut/${userId}`);
      if (response.data.status) {
        console.log(response.data.message);
        setUserId(0);
        setBalance(0)
        localStorage.removeItem('userId');
        navigate('/login');
        toast.success("Logout successful!");
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-dark ${styles.cus_navbar}`}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src={GameVerseHub}
            className={`img-fluid ${styles.GameLogo}`}
            alt="GameVerseHub Logo"
          />
        </a>
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>

        <div className="collapse  navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className={`nav-item ${styles.cus_navitem}`}>
              <a className={`nav-link active ${styles.cus_navlink}`} href="/">About</a>
            </li>
            <li className={`nav-item ${styles.cus_navitem}`}>
              <a className={`nav-link ${styles.cus_navlink}`} href="/">Game</a>
            </li>
            <li className={`nav-item ${styles.cus_navitem}`}>
              <a className={`nav-link ${styles.cus_navlink}`} href="/">News</a>
            </li>
          </ul>

          {/* Connect Button */}


          {userId ? (
            <div className={`form-inline my-2 my-lg-0 ${styles.user_box}`}>
              <p>Username: {userId.substring(0, 20) + "..."}</p>
              <button onClick={handleRemoveUserId} className={`btn ${styles.connect_btn}`} type="button">Logout</button>
            </div>
          ) : (
            <form className={`form-inline my-2 my-lg-0 ${styles.connect_form}`}>
              <button onClick={handleConnectClick} className={`btn ${styles.connect_btn}`} type="button">Connect</button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
