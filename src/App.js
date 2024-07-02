import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import './header.css';
import './popup.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <BrowserRouter>
      <header className="header">
        <nav>
          <Link className="header-link" to="/">Tab1</Link>
          <Link className="header-link" to="/tab2">Tab2</Link>
          <Link className="header-link" to="/tab3">Tab3</Link>
          <button className="popup-button" onClick={togglePopup}>Open Popup</button>
        </nav>
      </header>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner" ref={popupRef}>
            <button className="close-button" onClick={togglePopup}>Close</button>
            <h1>Hello World!</h1>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Tab1 />} />
        <Route path="/tab1" element={<Tab1 />} />
        <Route path="/tab2" element={<Tab2 />} />
        <Route path="/tab3" element={<Tab3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
