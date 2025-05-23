import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Skills = ({ skillsData }) => {
  const skills = skillsData?.Skills?.[0] || {};
  
  return (
    <SkillsSection id="skills">
      <div className="container">
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
      </div>
    </SkillsSection>
  );
};

// Styled Components
const SkillsSection = styled.section`
  padding: 40px 0;
  background-color: var(--section-bg);
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
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const CategoryHeading = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  min-width: 180px;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
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
  background-color: #e0e0e0;
`;

const SkillPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
`;

const SkillPill = styled.div`
  background-color: #f8f9fa;
  color: var(--text-color);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    background-color: var(--primary-color);
    color: white;
  }
`;

export default Skills;
