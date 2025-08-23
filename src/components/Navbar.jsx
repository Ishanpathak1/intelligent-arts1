// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToTop = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-6 shadow-md bg-white sticky top-0 z-50 font-[Lato]">
        <Link
          to="/"
          onClick={(e) => {
            scrollToTop(e, '/');
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-2"
        >
          <img src="/logo.webp" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 text-base md:text-lg font-semibold">
            <Link to="/" onClick={(e) => scrollToTop(e, '/')}>Home</Link>
            <Link to="/books" onClick={(e) => scrollToTop(e, '/books')}>Books</Link>
            <Link to="/authors" onClick={(e) => scrollToTop(e, '/authors')}>Authors</Link>
            <Link to="/archives" onClick={(e) => scrollToTop(e, '/archives')}>Archives</Link>
            <Link to="/about" onClick={(e) => scrollToTop(e, '/about')}>About</Link>
            <Link to="/affiliates" onClick={(e) => scrollToTop(e, '/affiliates')}>Affiliates</Link>
            <Link to="/contact" onClick={(e) => scrollToTop(e, '/contact')}>Contact</Link>
          </div>

          {isAuthenticated() && (
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-base md:text-lg font-bold hover:text-blue-600 transition-colors admin-glow"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
          >
            {isMobileMenuOpen ? (
              // X icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isAuthenticated() && (
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          </div>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200 shadow-md sticky top-[88px] z-40">
          <div className="flex flex-col py-2">
            <Link className="px-6 py-3 text-base font-semibold" to="/" onClick={(e) => { scrollToTop(e, '/'); setIsMobileMenuOpen(false); }}>Home</Link>
            <Link className="px-6 py-3 text-base font-semibold" to="/books" onClick={(e) => { scrollToTop(e, '/books'); setIsMobileMenuOpen(false); }}>Books</Link>
            <Link className="px-6 py-3 text-base font-semibold" to="/authors" onClick={(e) => { scrollToTop(e, '/authors'); setIsMobileMenuOpen(false); }}>Authors</Link>
            <Link className="px-6 py-3 text-base font-semibold" to="/archives" onClick={(e) => { scrollToTop(e, '/archives'); setIsMobileMenuOpen(false); }}>Archives</Link>
            <Link className="px-6 py-3 text-base font-semibold" to="/about" onClick={(e) => { scrollToTop(e, '/about'); setIsMobileMenuOpen(false); }}>About</Link>
            <Link className="px-6 py-3 text-base font-semibold" to="/affiliates" onClick={(e) => { scrollToTop(e, '/affiliates'); setIsMobileMenuOpen(false); }}>Affiliates</Link>
            <Link className="px-6 py-3 text-base font-semibold" to="/contact" onClick={(e) => { scrollToTop(e, '/contact'); setIsMobileMenuOpen(false); }}>Contact</Link>

            {isAuthenticated() && (
              <div className="border-t border-gray-200 mt-2 pt-2">
                {user?.role === 'admin' && (
                  <Link className="px-6 py-3 text-base font-bold hover:text-blue-600 admin-glow block" to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="mx-6 my-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
