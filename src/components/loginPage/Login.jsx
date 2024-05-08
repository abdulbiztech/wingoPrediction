import React from "react";
import styles from "./Login.module.css"; // Import your CSS module
import Header from "../header/Header";

const Login = () => {
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
                  <form>
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
                        type="text"
                        className={`${styles.cus_control} form-control`}
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
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
                {/* <div className={`${styles.bottom_linklogin} text-center`}>
                  <p>
                    Already have an account? <a href="login.html">Login</a>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
