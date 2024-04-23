import React, { useState, useEffect } from "react";

function CountdownPopup() {
  const [count, setCount] = useState(20);
  const [popupCount, setPopupCount] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [cardDisabled, setCardDisabled] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          setShowPopup(false);
          setCount(20);
          setCardDisabled(false);
          return 20;
        }
        if (prevCount === 5 && !showPopup) {
          setShowPopup(true);
          setPopupCount(5);
          setCardDisabled(true);
          return 5;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [showPopup]);

  useEffect(() => {
    if (showPopup) {
      const popupCountdown = setInterval(() => {
        setPopupCount((prevCount) => {
          if (prevCount === 1) {
            clearInterval(popupCountdown);
            setShowPopup(false);
            return 5;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(popupCountdown);
    }
  }, [popupCount]);

  return (
    <div>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #000000",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          {popupCount > 0 ? (
            <div>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                {popupCount}
              </div>
              {/* <div style={{ fontSize: '16px' }}>Popup countdown</div> */}
            </div>
          ) : (
            "Popup time up!"
          )}
        </div>
      )}

      <div class="card" disabled={cardDisabled}>
        <div class="card-body">
          <h4 class="card-title">Card title</h4>
          <p class="card-text">Some example text. Some example text.</p>
          <a href="#" class="card-link">
            Card link
          </a>
          <a href="#" class="card-link">
            Another link
          </a>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: "24px" }}>
        {count > 0 ? count : "Time up!"}
      </div>
    </div>
  );
}

export default CountdownPopup;
