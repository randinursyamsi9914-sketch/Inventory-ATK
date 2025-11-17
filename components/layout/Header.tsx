import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: 'inventory' | 'transactions' | 'reports') => void;
  currentPage: 'inventory' | 'transactions' | 'reports';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inventaris', page: 'inventory' },
    { name: 'Transaksi', page: 'transactions' },
    { name: 'Laporan', page: 'reports' },
  ];

  const handleNavigate = (page: 'inventory' | 'transactions' | 'reports') => {
    onNavigate(page);
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">ATK Stock App</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavigate(item.page as 'inventory' | 'transactions' | 'reports')}
              className={`text-lg font-medium py-2 px-4 rounded-full transition-all duration-300
                ${currentPage === item.page
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-white hover:bg-blue-700 hover:shadow-inner'
                }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2"
            aria-label="Open menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 mt-4 py-2 rounded-lg shadow-xl">
          <nav className="flex flex-col space-y-2 px-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page as 'inventory' | 'transactions' | 'reports')}
                className={`block text-left text-lg font-medium py-2 px-4 rounded-md transition-all duration-300
                  ${currentPage === item.page
                    ? 'bg-blue-500 text-white'
                    : 'text-white hover:bg-blue-600'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
