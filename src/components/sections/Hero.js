import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaDownload } from 'react-icons/fa';

const Hero = ({ profileData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <HeroSection id="home">
      <div className="container">
        <HeroContent>
          <HeroText>
            <TypingContainer>
              <NameHeading>Kasi Majji</NameHeading>
            </TypingContainer>
            <Subtitle>An Indian origin, U.S.-based Human</Subtitle>
            <Description>
              Transforming data into intelligent systems that drive business value
            </Description>
            
            <Keywords>
              <Keyword>Data</Keyword>
              <KeywordSeparator>|</KeywordSeparator>
              <Keyword>Train</Keyword>
              <KeywordSeparator>|</KeywordSeparator>
              <Keyword>Deploy</Keyword>
              <KeywordSeparator>|</KeywordSeparator>
              <Keyword>Repeat</Keyword>
            </Keywords>
            
            <HeroStats>
              <StatItem>
                <StatNumber>2.5+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>7+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>5+</StatNumber>
                <StatLabel>Certifications</StatLabel>
              </StatItem>
            </HeroStats>
            
            <CTAButtons>
              <PrimaryButton href="#projects">
                <FaCode /> View Projects
              </PrimaryButton>
              <SecondaryButton href="/images/DS_KM_github.pdf" target="_blank">
                <FaDownload /> Download Resume
              </SecondaryButton>
            </CTAButtons>
            
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
          </HeroText>
          
          <ProfileCircle>
            <ProfileGradient />
            <ProfileImageContainer>
              <ProfileImage src="/images/profile-photo.png" alt="Kasi Majji" />
            </ProfileImageContainer>
          </ProfileCircle>
        </HeroContent>
      </div>
      <BackgroundParticles />
    </HeroSection>
  );
};

// Background Particles Component
const BackgroundParticles = () => {
  return (
    <ParticlesContainer>
      <Meteor className="meteor-1" />
      <Meteor className="meteor-2" />
      <Meteor className="meteor-3" />
      <Orb className="orb-1" />
      <Orb className="orb-2" />
      <Orb className="orb-3" />
    </ParticlesContainer>
  );
};

// Styled Components
const HeroSection = styled.section`
  padding: 0;
  background-color: var(--background-color);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroText = styled.div`
  flex: 0.8;
  max-width: 500px;
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const TypingContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const NameHeading = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.1;
  background: var(--name-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
`;

const Subtitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 15px;
  line-height: 1.2;
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  margin-bottom: 15px;
  color: var(--text-color);
  max-width: 90%;
  line-height: 1.4;
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const Keywords = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const Keyword = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;

const KeywordSeparator = styled.span`
  color: var(--text-light);
`;

const HeroStats = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: var(--text-light);
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 30px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
  font-size: 0.9rem;
  background: var(--gradient-bg);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 30px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
  font-size: 0.9rem;
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 50px;
    z-index: -2;
    transform: translateY(100%);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }
  
  &:hover::after {
    transform: translateY(0);
    transition: transform 0.6s;
  }
  
  &:hover {
    color: white;
    border-color: transparent;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.3);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--light-color);
  color: var(--text-color);
  font-size: 1.2rem;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ProfileCircle = styled.div`
  position: relative;
  width: 440px;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 992px) {
    width: 350px;
    height: 350px;
  }
  
  @media (max-width: 480px) {
    width: 280px;
    height: 280px;
  }
`;

const ProfileGradient = styled.div`
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: var(--profile-gradient);
  opacity: 0.8;
  animation: rotate 8s linear infinite;
  
  @media (max-width: 992px) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: 480px) {
    width: 240px;
    height: 240px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    background: var(--background-color);
    z-index: 1;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);
  transition: transform 0.5s ease;
  
  @media (max-width: 992px) {
    width: 280px;
    height: 280px;
  }
  
  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
  }
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const Meteor = styled.div`
  position: fixed;
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 100%);
  transform-origin: 0 0;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  box-shadow: 0 0 10px 1px rgba(255,255,255,0.5);
  animation: meteor 10s linear infinite;
  
  &.meteor-1 {
    top: 10%;
    left: 30%;
    animation-delay: 0s;
    animation-duration: 15s;
  }
  
  &.meteor-2 {
    top: 30%;
    left: 80%;
    animation-delay: 3s;
    animation-duration: 12s;
  }
  
  &.meteor-3 {
    top: 70%;
    left: 10%;
    animation-delay: 7s;
    animation-duration: 18s;
  }
  
  @keyframes meteor {
    0% {
      transform: translate(-100%, -100%) rotate(45deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translate(200%, 200%) rotate(45deg);
      opacity: 0;
    }
  }
`;

const Orb = styled.div`
  position: fixed;
  border-radius: 50%;
  filter: blur(20px);
  pointer-events: none;
  z-index: -1;
  animation: float-orb 15s ease-in-out infinite;
  
  &.orb-1 {
    width: 300px;
    height: 300px;
    bottom: -150px;
    left: -150px;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, rgba(138, 43, 226, 0) 70%);
    animation-duration: 20s;
  }
  
  &.orb-2 {
    width: 200px;
    height: 200px;
    top: -100px;
    right: -100px;
    background: radial-gradient(circle, rgba(255, 105, 180, 0.3) 0%, rgba(255, 105, 180, 0) 70%);
    animation-duration: 15s;
    animation-delay: 2s;
  }
  
  &.orb-3 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    right: 10%;
    background: radial-gradient(circle, rgba(0, 191, 255, 0.2) 0%, rgba(0, 191, 255, 0) 70%);
    animation-duration: 25s;
    animation-delay: 5s;
  }
  
  @keyframes float-orb {
    0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    50% { transform: translate(20px, -20px) scale(1.1); opacity: 0.7; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  }
`;

export default Hero;
