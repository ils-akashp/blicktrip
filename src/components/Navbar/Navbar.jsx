import React, { useEffect, useState } from 'react';
import './navbar.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension(){
    return {
          width: window.innerWidth,
          height: window.innerHeight
    }
  }

  useEffect(() => {
    const updateDimension = () => {
          setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);


    return(() => {
        window.removeEventListener('resize', updateDimension);
    })
}, [screenSize])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`} style={{height : isMenuOpen && screenSize.width <= 768 ? '180px' : 'inherit'}}>
      <div className="navbar__brand">
      <img src={process.env.PUBLIC_URL + "/assets/events/logo.png"} />
      </div>
      <button className="navbar__toggle" onClick={toggleMenu}>
        {/* <span className="navbar__toggle-icon"></span> */}
        {
            isMenuOpen ? <img src={process.env.PUBLIC_URL + "/assets/events/close.png"} /> :   <img src={process.env.PUBLIC_URL + "/assets/events/hamburger.png"} />
        }
      
        
      </button>
      <ul className="navbar__menu">
        <li className="navbar__menu-item">
          <a href="#home">Dashboard</a>
        </li>
        <li className="navbar__menu-item">
          <a href="#about">Events</a>
        </li>
        <li className="navbar__menu-item">
          <a href="#services">Help</a>
        </li>
        <li className="navbar__menu-item">
          <a href="#contact">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
