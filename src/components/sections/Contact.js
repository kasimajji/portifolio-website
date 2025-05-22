import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = ({ contactData }) => {
  return (
    <ContactSection id="contact">
      <div className="container">
        <SectionTitle>Get In Touch</SectionTitle>
        
        <ContactContent>
          <ContactText>
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new projects, opportunities, or partnerships. 
              Feel free to reach out through any of the platforms below.
            </p>
          </ContactText>
          
          <ContactTiles>
            <ContactTile href="https://github.com/kasimajji" target="_blank" rel="noopener noreferrer">
              <ContactTileIcon>
                <FaGithub />
              </ContactTileIcon>
              <ContactTileTitle>GitHub</ContactTileTitle>
              <ContactTileDescription>View my code repositories</ContactTileDescription>
            </ContactTile>
            
            <ContactTile href="https://linkedin.com/in/kasi-majji" target="_blank" rel="noopener noreferrer">
              <ContactTileIcon>
                <FaLinkedin />
              </ContactTileIcon>
              <ContactTileTitle>LinkedIn</ContactTileTitle>
              <ContactTileDescription>Connect with me professionally</ContactTileDescription>
            </ContactTile>
            
            <ContactTile href="mailto:kasi.majji24@gmail.com">
              <ContactTileIcon>
                <FaEnvelope />
              </ContactTileIcon>
              <ContactTileTitle>Email</ContactTileTitle>
              <ContactTileDescription>kasi.majji24@gmail.com</ContactTileDescription>
            </ContactTile>
          </ContactTiles>
        </ContactContent>
      </div>
    </ContactSection>
  );
};

// Styled Components
const ContactSection = styled.section`
  padding: 100px 0;
  background-color: var(--background-color);
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const ContactContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const ContactText = styled.div`
  text-align: center;
  margin-bottom: 50px;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: var(--text-color);
  }
  
  p {
    color: var(--text-light);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.8;
  }
`;

const ContactTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactTile = styled.a`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 40px 30px;
  text-align: center;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-color);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-bg);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(138, 43, 226, 0.15);
  }
`;

const ContactTileIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: var(--light-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  transition: var(--transition);
  
  ${ContactTile}:hover & {
    background: var(--primary-color);
    color: white;
    transform: scale(1.1);
  }
`;

const ContactTileTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 10px;
  transition: var(--transition);
  
  ${ContactTile}:hover & {
    color: var(--primary-color);
  }
`;

const ContactTileDescription = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
`;

export default Contact;
