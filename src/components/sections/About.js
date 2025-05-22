import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const About = ({ profileData }) => {
  return (
    <AboutSection id="about">
      <div className="container">
        <SectionTitle>About Me</SectionTitle>
        
        {/* Two-column layout for intro video and text */}
        <AboutContent>
          <AboutVideoContainer>
            <IntroVideoPlaceholder>
              <i className="fas fa-play-circle"></i>
              <p>Intro Video</p>
            </IntroVideoPlaceholder>
          </AboutVideoContainer>
          
          <AboutText>
            <p dangerouslySetInnerHTML={{ __html: profileData?.aboutMe?.replace(/\n/g, '<br>') || '' }}></p>
            <DownloadButton href="/images/DS_KM_github.pdf" target="_blank">
              <FaDownload /> Download Resume
            </DownloadButton>
          </AboutText>
        </AboutContent>
        
        {/* Journey section with horizontal timeline */}
        <JourneySection>
          <h3>My Journey</h3>
          <HorizontalTimeline>
            {profileData?.journey?.split('\n\n').map((item, index) => {
              const parts = item.split('\n');
              const title = parts[0]; // Role/Position
              const dateRange = parts[1]; // Date range
              const company = parts[2]; // Company name
              const description = parts.slice(3).join('\n'); // Description
              
              return (
                <TimelineItem key={index}>
                  <TimelineContent>
                    <h4>{title}</h4>
                    <div className="timeline-date">{dateRange}</div>
                    <div className="timeline-company">{company}</div>
                    <p className="timeline-description">{description}</p>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </HorizontalTimeline>
        </JourneySection>
        
        {/* Two-column layout for What Drives Me and Beyond Work */}
        <AboutBottomSections>
          <DrivesMeSection>
            <h3>What Drives Me</h3>
            <DrivesContent>
              {profileData?.drivesMe?.split('\n\n').map((item, index) => {
                const parts = item.split('\n');
                const title = parts[0];
                const description = parts.slice(1).join('\n');
                
                return (
                  <DriveItem key={index}>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </DriveItem>
                );
              })}
            </DrivesContent>
          </DrivesMeSection>
          
          <BeyondSection>
            <h3>Beyond Work</h3>
            <p>{profileData?.beyondWork}</p>
          </BeyondSection>
        </AboutBottomSections>
      </div>
    </AboutSection>
  );
};

// Styled Components
const AboutSection = styled.section`
  padding: 100px 0;
  background-color: var(--section-bg);
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

const AboutContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const AboutVideoContainer = styled.div`
  flex: 1;
  max-width: 45%;
  
  @media (max-width: 992px) {
    max-width: 100%;
    width: 100%;
  }
`;

const IntroVideoPlaceholder = styled.div`
  background-color: rgba(138, 43, 226, 0.1);
  border-radius: 15px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  border: 2px dashed var(--primary-color);
  
  i {
    font-size: 3rem;
    margin-bottom: 15px;
  }
`;

const AboutText = styled.div`
  flex: 1;
  max-width: 55%;
  text-align: left;
  padding-left: 20px;
  
  p {
    margin-bottom: 30px;
    font-size: 1rem;
    line-height: 1.8;
  }
  
  @media (max-width: 992px) {
    max-width: 100%;
    padding-left: 0;
  }
`;

const DownloadButton = styled.a`
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
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
  }
`;

const JourneySection = styled.div`
  margin-top: 60px;
  margin-bottom: 70px;
  
  h3 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 1.8rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: var(--primary-color);
      border-radius: 2px;
    }
  }
`;

const HorizontalTimeline = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin: 0 auto;
  max-width: 100%;
  position: relative;
`;

const TimelineItem = styled.div`
  position: relative;
  padding: 0;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TimelineContent = styled.div`
  padding: 25px 20px;
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-top: 4px solid var(--primary-color);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    opacity: 0.8;
  }
  
  h4 {
    margin-bottom: 10px;
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .timeline-date {
    font-size: 0.9rem;
    color: var(--text-light);
    margin-bottom: 15px;
    font-weight: 500;
  }
  
  .timeline-company {
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--text-color);
  }
  
  .timeline-description {
    font-size: 0.9rem;
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 0;
  }
`;

const AboutBottomSections = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 50px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const DrivesMeSection = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.6rem;
    text-align: left;
    margin-bottom: 20px;
  }
`;

const DrivesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DriveItem = styled.div`
  background-color: var(--card-bg);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h4 {
    color: var(--primary-color);
    margin-bottom: 15px;
  }
`;

const BeyondSection = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.6rem;
    text-align: left;
    margin-bottom: 20px;
  }
  
  p {
    background-color: var(--card-bg);
    padding: 20px;
    border-radius: 10px;
    box-shadow: var(--card-shadow);
    line-height: 1.8;
  }
`;

export default About;
