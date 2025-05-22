import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const About = ({ profileData }) => {
  // Function to highlight the first line and important words
  const highlightContent = (text) => {
    if (!text) return '';
    
    // Split the content by paragraphs
    const paragraphs = text.split('\n\n');
    
    // Highlight the first line (title)
    if (paragraphs.length > 0) {
      paragraphs[0] = `<span class="highlight-title">${paragraphs[0]}</span>`;
    }
    
    // Join paragraphs back with line breaks
    let processedText = paragraphs.join('<br><br>');
    
    // Highlight important words
    const importantWords = [
      'Data Scientist', 'Machine Learning Engineer', 'Chicago', 'curiosity', 'passion', 
      'exploring data', 'writing code', 'running models', 'insights', 
      'Tata Consultancy Services', 'insurance data', "master's", 'Northern Illinois University',
      'real-time AI', 'ML pipelines', 'cloud systems'
    ];
    
    // Replace important words with highlighted versions
    importantWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      processedText = processedText.replace(regex, match => `<span class="highlight-word">${match}</span>`);
    });
    
    return processedText;
  };
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
            <p dangerouslySetInnerHTML={{ __html: highlightContent(profileData?.aboutMe) }}></p>
          </AboutText>
        </AboutContent>
        
        {/* Journey section with vertical timeline */}
        <JourneySection>
          <h3>My Journey</h3>
          <VerticalTimeline>
            {profileData?.journey?.split('\n\n').map((item, index, array) => {
              const parts = item.split('\n');
              const title = parts[0]; // Role/Position
              const dateRange = parts[1]; // Date range
              const company = parts[2]; // Company name
              const description = parts.slice(3).join('\n'); // Description
              
              // Alternate left and right for the timeline items
              const isEven = index % 2 === 0;
              
              return (
                <TimelineRow key={index} isLast={index === array.length - 1}>
                  {isEven ? (
                    <>
                      <TimelineItemLeft>
                        <TimelineContent>
                          <h4>{title}</h4>
                          <div className="timeline-date">{dateRange}</div>
                          <div className="timeline-company">{company}</div>
                          <p className="timeline-description">{description}</p>
                        </TimelineContent>
                      </TimelineItemLeft>
                      <TimelineCenter>
                        <TimelineDot />
                      </TimelineCenter>
                      <TimelineEmpty />
                    </>
                  ) : (
                    <>
                      <TimelineEmpty />
                      <TimelineCenter>
                        <TimelineDot />
                      </TimelineCenter>
                      <TimelineItemRight>
                        <TimelineContent>
                          <h4>{title}</h4>
                          <div className="timeline-date">{dateRange}</div>
                          <div className="timeline-company">{company}</div>
                          <p className="timeline-description">{description}</p>
                        </TimelineContent>
                      </TimelineItemRight>
                    </>
                  )}
                </TimelineRow>
              );
            })}
          </VerticalTimeline>
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
  color: var(--text-color);
  
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
  color: var(--text-color);
  
  p {
    margin-bottom: 30px;
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-color);
  }
  
  .highlight-title {
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
    margin-bottom: 15px;
  }
  
  .highlight-word {
    color: var(--primary-color);
    font-weight: 500;
  }
  
  @media (max-width: 992px) {
    max-width: 100%;
    padding-left: 0;
  }
`;



const JourneySection = styled.div`
  margin-top: 60px;
  margin-bottom: 70px;
  color: var(--text-color);
  
  h3 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 1.8rem;
    position: relative;
    color: var(--text-color);
    
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

const VerticalTimeline = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: var(--primary-color);
    transform: translateX(-50%);
  }
`;

const TimelineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  margin-bottom: ${props => props.isLast ? '0' : '30px'};
  position: relative;
  width: 100%;
`;

const TimelineItemLeft = styled.div`
  padding-right: 30px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TimelineItemRight = styled.div`
  padding-left: 30px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TimelineEmpty = styled.div`
  /* Empty space for the timeline layout */
`;

const TimelineCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 2;
`;

const TimelineDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin-top: 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
  }
`;

const TimelineContent = styled.div`
  padding: 25px 20px;
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-left: 4px solid var(--primary-color);
  color: var(--text-color);
  
  h4 {
    margin-bottom: 5px;
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .timeline-date {
    font-size: 0.9rem;
    color: var(--text-light);
    margin-bottom: 10px;
    font-weight: 500;
    font-style: italic;
  }
  
  .timeline-company {
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--text-color);
  }
  
  .timeline-description {
    font-size: 0.9rem;
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    text-align: center;
    border-left: none;
    border-top: 4px solid var(--primary-color);
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
  color: var(--text-color);
  
  h3 {
    font-size: 1.6rem;
    text-align: left;
    margin-bottom: 20px;
    color: var(--text-color);
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
  color: var(--text-color);
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h4 {
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: var(--text-color);
  }
`;

const BeyondSection = styled.div`
  flex: 1;
  color: var(--text-color);
  
  h3 {
    font-size: 1.6rem;
    text-align: left;
    margin-bottom: 20px;
    color: var(--text-color);
  }
  
  p {
    background-color: var(--card-bg);
    padding: 20px;
    border-radius: 10px;
    box-shadow: var(--card-shadow);
    line-height: 1.8;
    color: var(--text-color);
  }
`;

export default About;
