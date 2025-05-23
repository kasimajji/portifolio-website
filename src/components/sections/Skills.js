import React from 'react';
import styled from 'styled-components';

const Skills = ({ skillsData }) => {
  const skills = skillsData?.Skills?.[0] || {};
  
  // Debug logging
  console.log('Skills data:', skillsData);
  console.log('Processed skills:', skills);
  
  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle>Skills</SectionTitle>
        
        <SkillsContent>
          {Object.entries(skills).map(([category, skillItems]) => (
            <SkillCategoryRow key={category}>
              <CategoryHeading>
                <CategoryName>{category}</CategoryName>
                <VerticalLine />
              </CategoryHeading>
              
              <SkillPills>
                {skillItems.map((skill, index) => (
                  <SkillPill key={index}>{skill}</SkillPill>
                ))}
              </SkillPills>
            </SkillCategoryRow>
          ))}
        </SkillsContent>
      </Container>
    </SkillsSection>
  );
};

// Styled Components
const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const SkillsSection = styled.section`
  padding: 100px 0 80px;
  background-color: var(--section-bg);
  
  @media (max-width: 768px) {
    padding: 80px 0 60px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  color: var(--text-color);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const SkillsContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SkillCategoryRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
  }
`;

const CategoryHeading = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  min-width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    margin-bottom: 5px;
  }
`;

const CategoryName = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color);
  white-space: nowrap;
  margin: 0;
  padding-right: 12px;
`;

const VerticalLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: var(--text-light);
  opacity: 0.3;
`;

const SkillPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
`;

const SkillPill = styled.div`
  background-color: var(--card-bg);
  color: var(--text-color);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(138, 43, 226, 0.1);
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    background-color: var(--primary-color);
    color: white;
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.3);
    border-color: var(--primary-color);
  }
`;

export default Skills;
