import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import myContext from "../Context/MyContext.jsx";
import API_BASE_URL from "../../environment/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setBalance, setUserId } = useContext(myContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('UserId and Password are required.');
      toast.error('UserId and Password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://demosoftech.com/GVTest/api/Fund/Login`, {
        params: {
          userId: username,
          password: password
        }
      });

      if (response.data?.data && response.data?.data.length > 0) {
        console.log("response", response);
        setUserId(response?.data?.data[0]?.userid);
        console.log("User ID:", response?.data?.data[0]?.userid);
        sessionStorage.setItem('userId', response?.data?.data[0]?.userid);
        navigate('/lottery');
        toast.success("Login successful!");
      } else {
        setErrorMessage('Invalid UserId or Password.');
        toast.error('Invalid UserId or Password.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setErrorMessage('Server error occurred. Please try again later.');
          toast.error('Server error occurred. Please try again later.');
        } else {
          setErrorMessage('Invalid UserId or Password.');
          toast.error('Invalid UserId or Password.');
        }
      } else {
        setErrorMessage('An error occurred while processing your request. Please try again later.');
        toast.error('An error occurred while processing your request. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

console.log("password",password);
  return (
    <>
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
                      <label htmlFor="UserId" className={`${styles.form_label}`}> UserId </label>
                    </div>
                    <div className="input-group mb-3">
                      <span className={`input_group_text ${styles.input_group_text}`} id="basic-addon1">
                        <i className="bi bi-person-vcard"></i>
                      </span>
                      <input
                        type="text"
                        className={`${styles.cus_control} form-control`}
                        placeholder="UserId"
                        aria-label="UserId"
                        aria-describedby="basic-addon1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="password" className={`${styles.form_label}`}>
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
                        disabled={isLoading} // Disable button while loading
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </form>
                  {errorMessage && (
                    <div className="text-danger mt-3 text-center">{errorMessage}</div>
                  )}
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
