import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <Copyright>&copy; {currentYear} Kasi Majji. All Rights Reserved.</Copyright>
          <SocialLinks>
            <SocialLink href="https://github.com/kasimajji" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/kasi-majji" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="mailto:kasi.majji24@gmail.com">
              <FaEnvelope />
            </SocialLink>
          </SocialLinks>
        </FooterContent>
      </div>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background: var(--footer-bg);
  color: var(--footer-text);
  padding: 30px 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: var(--footer-text);
  font-size: 1.2rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-color);
    transform: translateY(-3px);
  }
`;

export default Footer;
