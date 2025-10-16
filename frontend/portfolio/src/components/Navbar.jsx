import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon as Menu, XMarkIcon as X, SunIcon as Sun, MoonIcon as Moon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  color: isActive(item.path) ? 'var(--primary)' : 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: isActive(item.path) ? '600' : '400',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                onMouseLeave={(e) => e.target.style.color = isActive(item.path) ? 'var(--primary)' : 'var(--text)'}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-nav">
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text)'
              }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            paddingBottom: '1rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '1rem'
          }} className="mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                style={{
                  color: isActive(item.path) ? 'var(--primary)' : 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: isActive(item.path) ? '600' : '400',
                  padding: '0.5rem 0'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;