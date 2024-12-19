import React, { useState } from "react";
import ExchangeRate from "./component/ExchangeRate";
import Contact from "./component/Contact";
import './App.css';
function App() {
  const [showContact, setShowContact] = useState(false);
 const globalStyle = {
    backgroundImage: 'url("background.avif")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    color: "white",
  };
  return (
    <div className="container" style={globalStyle}>
      <div className="row align-items-center">
        {/* Left Side */}
        <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
          <h1 className="display-5 fw-bold text-white mb-3">
            Free Online Currency Converter
          </h1>
          <p className="lead text-white">
            Convert My Money is a simple currency converter that allows you to
            quickly check the latest currency exchange rates. Upon exit, the app
            saves the currencies you've selected. With more than 160 currencies
            and hourly updated conversion rates, Convert My Money is becoming a
            popular and proven choice when converting foreign currencies.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={() => setShowContact(!showContact)}
          >
            {showContact ? "Hide Contact" : "Show Contact"}
          </button>
          {showContact && (
            <div style={{ marginTop: "20px" }}>
              <Contact />
            </div>
          )}
        </div>
 {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center">
          <div className="p-4 bg-info rounded mt-5 shadow-sm w-100" style={{ maxWidth: "400px" }}>
            <ExchangeRate />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
