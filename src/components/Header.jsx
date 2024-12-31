import React, { useState, useEffect } from 'react';

function Header() {
  const [contract, setContract] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollStart = 20;

  // Handle scroll events and toggle contract state
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setContract(scrollPosition > scrollStart);
  };

  // Toggle menu for mobile view
  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    // Add scroll listener on mount and clean up on unmount
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 py-4 text-white flex justify-between items-center z-10">
      <div
        className={`container mx-auto flex justify-between items-center px-8 py-4 transition-all duration-200 rounded-[30px] ${
          contract ? 'max-w-[1000px] bg-[#00000080]' : 'max-w-[1550px]'
        }`}
        style={{
          backgroundColor: contract && window.innerWidth > 768 ? '#00000080' : 'transparent',
        }}
      >
        <a className="text-3xl font-bold flex-[1] text-center md:text-start" href="/">
          CodeCanarias.
        </a>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu (visible on desktop) */}
        <nav className="flex-[3] flex justify-center md:flex hidden">
          <ul className="flex space-x-6 text-white text-lg">
            <li><a href="#about">Servicios</a></li>
            <li><a href="#contact">Productos</a></li>
            <li><a href="#contact">Nosotros</a></li>
          </ul>
        </nav>

        {/* Conectemos Button (visible on desktop) */}
        <div className="flex-[1] flex justify-end hidden md:flex">
          <button className="bg-black text-white py-4 px-8 rounded-[20px]">
            Conectemos
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-20" />
      )}
    </header>
  );
}

export default Header;
