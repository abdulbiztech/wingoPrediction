import React, { useContext, useState } from "react";
import styles from "./Login.module.css"; // Import your CSS module
import Header from "../header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import myContext from "../Context/MyContext.jsx";
import API_BASE_URL from "../../environment/api";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { balance, setBalance } = useContext(myContext);
  const { userId, setUserId } = useContext(myContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/user-login`, {
        username: username,
        password: password
      });
      console.log('Response:', response.data.data);
      setBalance(response?.data?.data?.userBalance);
      setUserId(response?.data?.data?.userId)
      navigate('/lottery');
    } catch (error) {
      if (error.response) {

        console.error('Server responded with error status:', error.response.status);
        console.error('Error response data:', error.response.data);
        if (error.response.status === 400) {
          setErrorMessage('Invalid username or password. Please try again.');
        } else {
          setErrorMessage('An error occurred while processing your request. Please try again later.');
        }
      } else if (error.request) {
        console.error('No response received from server:', error.request);
        setErrorMessage('No response received from server. Please check your network connection and try again.');
      } else {
        console.error('Error setting up request:', error.message);
        setErrorMessage('An error occurred while processing your request. Please try again later.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <div className={`${styles.logbg}`}>
        <div className={`${styles.overlay}`}></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={`${styles.loginbox}`}>
                <div className="text-center">
                  <h2>Login</h2>
                </div>
                <div className={`${styles.logibtnbox}`}>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label
                        htmlFor="sponsorAddress"
                        className={`${styles.form_label}`}
                      >
                        Username
                      </label>
                    </div>
                    <div className="input-group mb-3">
                      <span className={`input_group_text ${styles.input_group_text}`} id="basic-addon1">
                        <i className="bi bi-person-vcard"></i>
                      </span>
                      <input
                        type="text"
                        className={`${styles.cus_control} form-control`}
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="userAddress"
                        className={`${styles.form_label}`}
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="input-group mb-3">
                      <span className={`input_group_text ${styles.input_group_text}`} >
                        <i className="bi bi-person-rolodex"></i>
                      </span>
                      <input
                        type="password"
                        className={`${styles.cus_control} form-control`}
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className={`${styles.cus_register_btn} btn`}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;