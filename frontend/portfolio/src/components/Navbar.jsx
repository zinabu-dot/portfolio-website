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
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>
            Portfolio
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Desktop Navigation */}
            {window.innerWidth >= 768 ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    style={{
                      color: isActive(item.path) ? 'var(--primary)' : 'var(--text)',
                      textDecoration: 'none',
                      fontWeight: isActive(item.path) ? '600' : '400',
                      transition: 'color 0.2s ease',
                      marginRight: '1rem'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            ) : (
              /* Mobile Menu Button */
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  fontSize: '1.5rem'
                }}
              >
                {isOpen ? '✕' : '☰'}
              </button>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--text)'
              }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && window.innerWidth < 768 && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            paddingBottom: '1rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '1rem'
          }}>
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
    </nav>
  );
};

export default Navbar;