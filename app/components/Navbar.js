'use client'

import React, { useState,useEffect } from 'react';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 navbar">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative"> {/* Added relative positioning */}
              <div className="dropdown">
                  <button className="dropbtn">Dropdown
                      <i className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content z-50"> {/* Added absolute positioning and higher z-index */}
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                      <a href="#">Link 3</a>
                  </div>
              </div>
          </div>
      </nav>
  );
};

export default Navbar;
