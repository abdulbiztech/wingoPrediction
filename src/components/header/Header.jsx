import React from "react";
import styles from "./header.module.css";
const Header = () => {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-dark ${styles.cus_navbar}`}
      >
        <div className="container">
          <a className="navbar-brand text-white" href="#">
            <img
              src="/src/assets/GameVerseHub.png"
              className={` img-fluid ${styles.GameLogo}`}
              alt=""
            />
          </a>
          <a className={`${styles.decentra_link}`} href="#">
            {" "}
            <span> powerd by</span> <span>GAMEVERSEHUB</span>
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <form
                className={`d-flex mx-2 d-md-block d-none ${styles.main_form_tag}`}
              >
                <input
                  className={`form-control me-2 my-md-0 ${styles.cus_form}`}
                  placeholder="search items and games"
                  type="search"
                  aria-label="Search"
                />
                <i className={`bi bi-search ${styles.serach_icon}`}></i>
              </form>
              <li className={`nav-item ${styles.cus_navitem}`}>
                <a
                  className={`nav-link active ${styles.cus_navlink}`}
                  aria-current="page"
                  href="/store"
                >
                  Store
                </a>
              </li>

              <li className={`nav-item ${styles.cus_navitem}`}>
                <a
                  className={`nav-link ${styles.cus_navlink}`}
                  aria-current="page"
                  href="/games"
                >
                  Game
                </a>
              </li>

              <li className={`nav-item  ${styles.cus_navitem}`}>
                <a
                  className={`nav-link ${styles.cus_navlink}`}
                  aria-current="page"
                  href="/news"
                >
                  News
                </a>
              </li>
            </ul>
            <form className={`d-flex mx-2`}>
              <button className={`btn ${styles.connect_btn}`}>Connect</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
