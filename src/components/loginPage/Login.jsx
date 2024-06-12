// import React, { useState, useContext } from "react";
// import styles from "./Login.module.css";
// import axios from "axios";
// import myContext from "../Context/MyContext.jsx";
// import API_BASE_URL from "../../environment/api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const { setBalance, setUserId } = useContext(myContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Use the production API endpoint
//       const response = await axios.get(`https://demosoftech.com/GVTest/api/Fund/Login?userId=${username}&password=${password}`);
//       console.log("response",response);
//       setUserId(response?.data?.data[0]?.userid);
//       console.log("User ID:", response?.data?.data[0]?.userid);
//       localStorage.setItem('userId', response?.data?.data[0]?.userid);
//       navigate('/lottery');
//       toast.success("Login successful!");
//     } catch (error) {
//       console.error('Error:', error);
//       setErrorMessage('An error occurred while processing your request. Please try again later.');
//       toast.error('An error occurred while processing your request. Please try again later.');
//     }
//   };

//   return (
//     <>
//       <div className={`${styles.logbg}`}>
//         <div className={`${styles.overlay}`}></div>
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className={`${styles.loginbox}`}>
//                 <div className="text-center">
//                   <h2>Login</h2>
//                 </div>
//                 <div className={`${styles.logibtnbox}`}>
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-2">
//                       <label
//                         htmlFor="username"
//                         className={`${styles.form_label}`}
//                       >
//                         Username
//                       </label>
//                     </div>
//                     <div className="input-group mb-3">
//                       <span className={`input_group_text ${styles.input_group_text}`} id="basic-addon1">
//                         <i className="bi bi-person-vcard"></i>
//                       </span>
//                       <input
//                         type="text"
//                         className={`${styles.cus_control} form-control`}
//                         placeholder="Username"
//                         aria-label="Username"
//                         aria-describedby="basic-addon1"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <label
//                         htmlFor="password"
//                         className={`${styles.form_label}`}
//                       >
//                         Password <span className="text-danger">*</span>
//                       </label>
//                     </div>
//                     <div className="input-group mb-3">
//                       <span className={`input_group_text ${styles.input_group_text}`} >
//                         <i className="bi bi-person-rolodex"></i>
//                       </span>
//                       <input
//                         type="password"
//                         className={`${styles.cus_control} form-control`}
//                         placeholder="Password"
//                         aria-label="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
//                     </div>
//                     <div className="text-center">
//                       <button
//                         type="submit"
//                         className={`${styles.cus_register_btn} btn`}
//                       >
//                         Login
//                       </button>
//                     </div>
//                   </form>
//                   {errorMessage && (
//                     <div className="text-danger mt-3 text-center">{errorMessage}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import myContext from "../Context/MyContext.jsx";
import API_BASE_URL from "../../environment/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading status
  const { setBalance, setUserId } = useContext(myContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get(`https://demosoftech.com/GVTest/api/Fund/Login?userId=${username}&password=${password}`);
      console.log("response",response);
      setUserId(response?.data?.data[0]?.userid);
      console.log("User ID:", response?.data?.data[0]?.userid);
      localStorage.setItem('userId', response?.data?.data[0]?.userid);
      navigate('/lottery');
      toast.success("Login successful!");
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while processing your request. Please try again later.');
      toast.error('An error occurred while processing your request. Please try again later.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

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
                      <label htmlFor="username" className={`${styles.form_label}`}> Username </label>
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
