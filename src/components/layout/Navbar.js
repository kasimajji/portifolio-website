import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavbarContainer $scrolled={isScrolled}>
      <div className="container">
        <Logo className="cursive-logo">
          Kasi's <span className="highlight">Portfolio</span>
        </Logo>
        
        <NavLinks $open={isMobileMenuOpen}>
          <li><NavLink href="#home" className="active">Home</NavLink></li>
          <li><NavLink href="#about">About</NavLink></li>
          <li><NavLink href="#projects">Projects</NavLink></li>
          <li><NavLink href="#skills">Skills</NavLink></li>
          <li><NavLink href="#certifications">Certifications</NavLink></li>
          <li><NavLink href="#contact">Contact</NavLink></li>
          <li>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </ThemeToggle>
          </li>
        </NavLinks>
        
        <Hamburger onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
        </Hamburger>
      </div>
    </NavbarContainer>
  );
};

// Styled Components
const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${props => props.$scrolled ? '15px 0' : '20px 0'};
  background-color: var(--nav-bg);
  z-index: 1000;
  transition: padding 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 700;
  background: var(--gradient-bg);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  font-family: 'Dancing Script', cursive;
  font-size: 30px;

  .highlight {
    color: var(--primary-color);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: var(--nav-bg);
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    gap: 20px;
    transform: ${props => props.$open ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.$open ? 1 : 0};
    transition: transform 0.3s ease, opacity 0.3s ease;
    pointer-events: ${props => props.$open ? 'all' : 'none'};
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled.a`
  font-weight: 500;
  transition: var(--transition);
  position: relative;
  color: var(--nav-text);

  &:hover, &.active {
    color: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: var(--transition);
  }

  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--nav-text);
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(138, 43, 226, 0.1);

  &:hover {
    transform: scale(1.1);
    color: var(--primary-color);
    background-color: rgba(138, 43, 226, 0.2);
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: var(--text-color);
    transition: var(--transition);

    &.open:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    &.open:nth-child(2) {
      opacity: 0;
    }

    &.open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export default Navbar;
