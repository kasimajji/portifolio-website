import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaDownload } from 'react-icons/fa';

// Helper function to get the correct image URL for GitHub Pages
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If the path is already a full URL (starts with http), return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // For GitHub Pages deployment, we need to handle the subdirectory correctly
  if (process.env.NODE_ENV === 'production') {
    // In production (GitHub Pages), use the homepage from package.json
    const basePath = '/portifolio-website';
    // Remove leading slash from imagePath to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${basePath}/${cleanPath}`;
  } else {
    // For local development, use the path as-is
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  }
};

const Hero = ({ profileData, projectsData, certificationsData }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [isSubtitleTyping, setIsSubtitleTyping] = useState(false);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastSection, setLastSection] = useState('home');
  
  const fullName = 'Kasi Majji';
  const subtitles = useMemo(() => [
    'A Data Scientist',
    'A Machine Learning Engineer', 
    'AI Architect with Global Mindset',
    'An Indian Origin, U.S based Human'
  ], []);

  // Name typing animation effect
  useEffect(() => {
    if (isTyping) {
      setDisplayText('');
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullName.length) {
          setDisplayText(fullName.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(false);
            setIsSubtitleTyping(true); // Start subtitle animation after name
          }, 500);
        }
      }, 150);
      
      return () => clearInterval(typingInterval);
    } else {
      setDisplayText(fullName);
    }
  }, [isTyping, fullName]);

  // Subtitle typing and backspacing animation
  useEffect(() => {
    if (isSubtitleTyping) {
      const currentSubtitle = subtitles[currentSubtitleIndex];
      let currentIndex = 0;
      let isDeleting = false;
      
      const subtitleInterval = setInterval(() => {
        if (!isDeleting) {
          // Typing phase
          if (currentIndex <= currentSubtitle.length) {
            setSubtitleText(currentSubtitle.slice(0, currentIndex));
            currentIndex++;
          } else {
            // Pause before starting to delete
            setTimeout(() => {
              isDeleting = true;
            }, 1500); // Reduced from 2000ms to 1500ms
          }
        } else {
          // Backspacing phase
          if (currentIndex > 0) {
            currentIndex--;
            setSubtitleText(currentSubtitle.slice(0, currentIndex));
          } else {
            // Move to next subtitle
            clearInterval(subtitleInterval);
            setTimeout(() => {
              setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
            }, 300); // Reduced from 500ms to 300ms
          }
        }
      }, isDeleting ? 30 : 70); // Faster: was 50:100, now 30:70
      
      return () => clearInterval(subtitleInterval);
    }
  }, [isSubtitleTyping, currentSubtitleIndex, subtitles]);

  // Scroll detection to trigger animation
  useEffect(() => {
    let animationTimeout;
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let currentSection = 'home';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      // Only trigger animation when coming FROM another section TO home
      if (currentSection === 'home' && lastSection !== 'home' && !isTyping) {
        clearTimeout(animationTimeout);
        animationTimeout = setTimeout(() => {
          setIsTyping(true);
          setIsSubtitleTyping(false);
          setSubtitleText('');
          setCurrentSubtitleIndex(0);
          setHasAnimated(true);
        }, 300);
      }
      
      setLastSection(currentSection);
    };

    // Trigger animation on initial load only
    if (!hasAnimated) {
      const initialAnimation = setTimeout(() => {
        setIsTyping(true);
        setHasAnimated(true);
      }, 1200);
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(animationTimeout);
        clearTimeout(initialAnimation);
      };
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(animationTimeout);
      };
    }
  }, [isTyping, hasAnimated, lastSection]);

  return (
    <HeroSection id="home">
      <div className="container">
        <HeroContent>
          <HeroText>
            <TypingContainer>
              <NameHeading>
                {displayText}
                <TypingCursor $visible={isTyping}>|</TypingCursor>
              </NameHeading>
            </TypingContainer>
            <SubtitleContainer>
              <Subtitle>
                {subtitleText}
                <SubtitleCursor $visible={isSubtitleTyping}>|</SubtitleCursor>
              </Subtitle>
            </SubtitleContainer>
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
                <StatNumber>{projectsData?.projects?.length || 7}+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{certificationsData?.certifications?.length || 5}+</StatNumber>
                <StatLabel>Certifications</StatLabel>
              </StatItem>
            </HeroStats>
            
            <CTAButtons>
              <PrimaryButton href="#projects">
                <FaCode /> View Projects
              </PrimaryButton>
              <SecondaryButton href={getImageUrl(profileData?.resumeLink)} target="_blank">
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
              <ProfileImage 
                src={getImageUrl(profileData?.profilePhoto)} 
                alt="Kasi Majji" 
                onError={(e) => {
                  console.log('Image load error for:', getImageUrl(profileData?.profilePhoto));
                  e.target.src = getImageUrl('images/profile-placeholder.jpg');
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', getImageUrl(profileData?.profilePhoto));
                }}
              />
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

// Keyframe animations
const blink = keyframes`
  from, to {
    color: transparent;
  }
  50% {
    color: var(--primary-color);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const HeroSection = styled.section`
  padding: 100px 0 40px 0; /* Added top padding to account for fixed navbar */
  background-color: var(--background-color);
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 60px); /* Adjust for navbar height */
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    padding: 120px 0 60px 0; /* More padding on mobile */
    min-height: calc(100vh - 80px);
  }
  
  @media (max-width: 768px) {
    padding: 140px 0 80px 0; /* Even more padding on smaller screens */
    min-height: calc(100vh - 100px);
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    text-align: center;
    gap: 30px;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 20px;
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
  font-size: 4.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.2;
  background: var(--name-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  font-style: normal;
  animation: ${fadeInUp} 0.8s ease-out;
  text-shadow: 0 2px 8px rgba(138, 43, 226, 0.15);
  transform: translateZ(0);
  
  @media (max-width: 992px) {
    font-size: 3.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.8rem;
  }
`;

const TypingCursor = styled.span`
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  animation: ${blink} 0.7s step-end infinite;
  color: var(--primary-color);
  font-weight: 300;
  margin-left: 2px;
`;

const SubtitleContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 15px;
  line-height: 1.2;
  min-height: 1.5rem; /* Prevent layout shift */
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SubtitleCursor = styled.span`
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  animation: ${blink} 0.7s step-end infinite;
  color: var(--primary-color);
  font-weight: 300;
  margin-left: 2px;
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
  justify-content: flex-start;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
