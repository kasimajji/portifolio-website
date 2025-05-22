import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaPython, FaJava, FaJs, FaHtml5, FaCss3Alt, FaDatabase, 
  FaCode, FaBrain, FaFire, FaCogs, FaNetworkWired, FaTable, 
  FaCalculator, FaChartLine, FaChartBar, FaChartPie, FaChartArea,
  FaBolt, FaServer, FaAws, FaMicrosoft, FaGoogle
} from 'react-icons/fa';

const Skills = ({ skillsData }) => {
  const skills = skillsData?.Skills?.[0] || {};
  const [activeCategory, setActiveCategory] = useState(Object.keys(skills)[0] || '');

  // Helper function to get appropriate icon for each skill
  const getSkillIcon = (skill) => {
    const skillIconMap = {
      // Programming Languages
      'Python': <FaPython />,
      'R': <FaCode />,
      'SQL': <FaDatabase />,
      'Java': <FaJava />,
      'JavaScript': <FaJs />,
      'HTML': <FaHtml5 />,
      'CSS': <FaCss3Alt />,
      
      // Machine Learning
      'TensorFlow': <FaBrain />,
      'PyTorch': <FaFire />,
      'Scikit-learn': <FaCogs />,
      'Keras': <FaNetworkWired />,
      
      // Data Analysis
      'Pandas': <FaTable />,
      'NumPy': <FaCalculator />,
      'Matplotlib': <FaChartLine />,
      'Seaborn': <FaChartBar />,
      'Tableau': <FaChartPie />,
      'Power BI': <FaChartArea />,
      
      // Big Data
      'Hadoop': <FaDatabase />,
      'Spark': <FaBolt />,
      'Hive': <FaServer />,
      
      // Cloud
      'AWS': <FaAws />,
      'Azure': <FaMicrosoft />,
      'GCP': <FaGoogle />,
      
      // Default
      'default': <FaCode />
    };
    
    // Check for partial matches
    for (const [key, value] of Object.entries(skillIconMap)) {
      if (skill.includes(key)) {
        return value;
      }
    }
    
    return skillIconMap.default;
  };

  return (
    <SkillsSection id="skills">
      <div className="container">
        <SectionTitle>Skills</SectionTitle>
        
        <SkillsTabs>
          <SkillsTabsHeader>
            {Object.keys(skills).map((category) => (
              <SkillTab 
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </SkillTab>
            ))}
          </SkillsTabsHeader>
          
          <SkillsTabsContent>
            {Object.entries(skills).map(([category, skillsList]) => (
              <SkillCategory 
                key={category}
                className={activeCategory === category ? 'active' : ''}
              >
                {skillsList.split(', ').map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillIcon>
                      {getSkillIcon(skill)}
                    </SkillIcon>
                    <SkillName>{skill}</SkillName>
                  </SkillItem>
                ))}
              </SkillCategory>
            ))}
          </SkillsTabsContent>
        </SkillsTabs>
      </div>
    </SkillsSection>
  );
};

// Styled Components
const SkillsSection = styled.section`
  padding: 80px 0;
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

const SkillsTabs = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SkillsTabsHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(138, 43, 226, 0.2);
  overflow-x: auto;
  padding-bottom: 5px;
  gap: 10px;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 20px;
  }
`;

const SkillTab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-light);
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &.active {
    color: var(--primary-color);
  }
  
  &.active::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 3px;
  }
`;

const SkillsTabsContent = styled.div`
  min-height: 300px;
`;

const SkillCategory = styled.div`
  display: none;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  animation: fadeIn 0.5s ease;
  
  &.active {
    display: grid;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const SkillItem = styled.div`
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(138, 43, 226, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const SkillName = styled.div`
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.95rem;
`;

export default Skills;
