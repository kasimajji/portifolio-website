import React from 'react';
import styled from 'styled-components';
import { FaGraduationCap, FaLaptopCode, FaUniversity, FaBuilding } from 'react-icons/fa';

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
            {profileData?.introductionVideo ? (
              <IntroVideo src={profileData.introductionVideo} title="Introduction Video" allowFullScreen />
            ) : (
              <IntroVideoPlaceholder>
                <i className="fas fa-play-circle"></i>
                <p>Intro Video</p>
              </IntroVideoPlaceholder>
            )}
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
              
              // Select appropriate icon based on the journey item
              let TimelineIcon;
              if (title.includes('Data Science') || title.includes('AI')) {
                TimelineIcon = FaLaptopCode;
              } else if (title.includes('University') || title.includes('Northern Illinois')) {
                TimelineIcon = FaUniversity;
              } else if (title.includes('Consultancy') || title.includes('TCS')) {
                TimelineIcon = FaBuilding;
              } else {
                TimelineIcon = FaGraduationCap;
              }
              
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
                        <TimelineIcon size={24} />
                      </TimelineCenter>
                      <TimelineEmpty />
                    </>
                  ) : (
                    <>
                      <TimelineEmpty />
                      <TimelineCenter>
                        <TimelineIcon size={24} />
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
        
        {/* What Drives Me section with vertical line and content */}
        <WhatDrivesMeSection>
          <SectionHeading>
            <h3>WHAT DRIVES ME</h3>
            <VerticalLine />
          </SectionHeading>
          
          <DrivesContent>
            {profileData?.whatDrivesMe?.split('\n').map((item, index) => {
              // Check if the item contains a colon to separate title and description
              const colonIndex = item.indexOf(':');
              if (colonIndex !== -1) {
                const title = item.substring(0, colonIndex).trim();
                const description = item.substring(colonIndex + 1).trim();
                
                // Determine which emoji to use based on the title
                let emoji = '🔍'; // Default emoji
                if (title.toLowerCase().includes('curiosity')) {
                  emoji = '🔍';
                } else if (title.toLowerCase().includes('full-stack')) {
                  emoji = '🔧';
                } else if (title.toLowerCase().includes('value')) {
                  emoji = '📈';
                }
                
                return (
                  <DriveItem key={index}>
                    <DriveItemTitle>
                      <span className="emoji">{emoji}</span> <span className="title">{title}</span>
                    </DriveItemTitle>
                    <DriveItemDescription>{description}</DriveItemDescription>
                  </DriveItem>
                );
              }
              return null; // Skip items without a colon
            }).filter(Boolean)}
          </DrivesContent>
        </WhatDrivesMeSection>
        
        {/* Beyond The Work section with vertical line */}
        <BeyondWorkSection>
          <SectionHeading>
            <h3>BEYOND THE WORK</h3>
            <VerticalLine />
          </SectionHeading>
          
          <BeyondContent>
            {profileData?.beyondTheWork?.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </BeyondContent>
        </BeyondWorkSection>
      </div>
    </AboutSection>
  );
};

// Styled Components
const AboutSection = styled.section`
  padding: 80px 0 60px; /* Adjusted padding for fixed navbar */
  background-color: var(--section-bg);
  
  @media (max-width: 768px) {
    padding: 60px 0 40px; /* Reduced padding on mobile */
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 5px; /* Reduced from 10px to 5px */
  position: relative;
  display: inline-block;
  color: var(--text-color);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px; /* Reduced from -6px to -4px */
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px; /* Reduced from 4px to 3px */
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const AboutContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Changed from flex-start to center to align video with text */
  gap: 20px;
  margin-top: 10px; /* Added margin-top to reduce space from title */
  margin-bottom: 20px;
  
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

const IntroVideo = styled.iframe`
  width: 100%;
  height: 300px;
  border-radius: 15px;
  border: none;
  box-shadow: var(--card-shadow);
  margin-top: 35px; /* Reduced from 50px to 35px */
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
  margin-top: 35px; /* Reduced from 50px to 35px */
  
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
  padding-right: 0; /* Remove any right padding to eliminate crossed space */
  color: var(--text-color);
  
  p {
    margin-bottom: 10px;
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-color);
  }
  
  .highlight-title {
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
    margin-bottom: 12px;
    max-width: 100%; /* Ensure title doesn't overflow */
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

// ... (rest of the code remains the same)
const JourneySection = styled.div`
  margin-top: 20px; /* Even further reduced top margin */
  margin-bottom: 20px; /* Even further reduced bottom margin */
  color: var(--text-color);
  
  h3 {
    text-align: center;
    margin-bottom: 15px; /* Even further reduced bottom margin */
    font-size: 1.2rem; /* Even smaller font size */
    position: relative;
    color: var(--text-color);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 35px;
      height: 2px;
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
  padding: 0 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px; /* Start at the center of the first icon */
    bottom: 25%; /* End at the center of the last icon */
    left: 50%;
    width: 2px;
    background: var(--primary-color);
    transform: translateX(-50%);
  }
  
  /* Apply a pseudo-element to cover the line after the last icon */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 2px;
    height: 15px;
    background-color: var(--background-gradient);
    transform: translateX(-50%);
    z-index: 1;
  }
`;

const TimelineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 25px 1fr;
  margin-bottom: ${props => props.isLast ? '0' : '6px'}; /* Even further reduced vertical spacing */
  position: relative;
  width: 100%;
`;

const TimelineItemLeft = styled.div`
  padding-right: 10px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const TimelineItemRight = styled.div`
  padding-left: 10px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const TimelineEmpty = styled.div`
  /* Empty space for the timeline layout */
`;

const TimelineCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically */
  position: relative;
  z-index: 2;
  color: var(--primary-color);
  background-color: var(--background-gradient);
  width: 20px; /* Even smaller icon container */
  height: 20px; /* Even smaller icon container */
  border-radius: 50%;
  margin: 0 auto; /* Center horizontally */
  box-shadow: 0 0 0 2px var(--card-bg);
`;

// Removed TimelineDot as we're using icons instead

const TimelineContent = styled.div`
  padding: 8px 10px; /* Even further reduced padding */
  background-color: var(--card-bg);
  border-radius: 6px;
  box-shadow: var(--card-shadow);
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-left: 2px solid var(--primary-color);
  color: var(--text-color);
  
  h4 {
    margin-bottom: 1px;
    color: var(--primary-color);
    font-size: 0.85rem; /* Even smaller font size */
    font-weight: 600;
  }
  
  .timeline-date {
    font-size: 0.65rem; /* Even smaller font size */
    color: var(--text-light);
    margin-bottom: 2px;
    font-weight: 500;
    font-style: italic;
  }
  
  .timeline-company {
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 0.75rem; /* Even smaller font size */
    color: var(--text-color);
  }
  
  .timeline-description {
    font-size: 0.65rem; /* Even smaller font size */
    color: var(--text-light);
    line-height: 1.2; /* Even further reduced line height */
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    text-align: center;
    border-left: none;
    border-top: 2px solid var(--primary-color);
    padding: 6px;
  }

`;

// What Drives Me section styling
const WhatDrivesMeSection = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  color: var(--text-color);
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-right: 15px;
    white-space: nowrap;
  }
`;

const VerticalLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #e0e0e0;
`;

const DrivesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 20px;
`;

const DriveItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 15px;
`;

const DriveItemTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: var(--text-color);
  
  .emoji {
    margin-right: 10px;
    font-size: 1.1rem;
  }
  
  .title {
    color: var(--primary-color);
  }
`;

const DriveItemDescription = styled.p`
  margin: 0;
  padding-left: 30px;
  color: var(--text-color);
  line-height: 1.5;
  font-size: 0.95rem;
`;

// Beyond Work section styling
const BeyondWorkSection = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  color: var(--text-color);
`;

const BeyondContent = styled.div`
  padding-left: 20px;
  
  p {
    margin: 0 0 10px 0;
    line-height: 1.5;
    font-size: 0.95rem;
    color: var(--text-color);
  }
`;

export default About;
