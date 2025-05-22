import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaAward } from 'react-icons/fa';

const Certifications = ({ certificationsData }) => {
  const certifications = certificationsData?.certifications || [];
  
  return (
    <CertificationsSection id="certifications">
      <div className="container">
        <SectionTitle>Certifications</SectionTitle>
        
        <CertificationsGrid>
          {certifications.map((certification, index) => (
            <CertificationCard key={index}>
              <CertificationIcon>
                <FaAward />
              </CertificationIcon>
              <CertificationInfo>
                <CertificationTitle>{certification.title}</CertificationTitle>
                <CertificationIssuer>{certification.issuer}</CertificationIssuer>
                <CertificationDate>{certification.date}</CertificationDate>
                <CertificationDescription>{certification.description}</CertificationDescription>
                {certification.link && (
                  <CertificationLink href={certification.link} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> View Certificate
                  </CertificationLink>
                )}
              </CertificationInfo>
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </div>
    </CertificationsSection>
  );
};

// Styled Components
const CertificationsSection = styled.section`
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

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  border: 1px solid rgba(138, 43, 226, 0.1);
  display: flex;
  gap: 20px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.15);
  }
`;

const CertificationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const CertificationInfo = styled.div`
  flex: 1;
`;

const CertificationTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: var(--text-color);
`;

const CertificationIssuer = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 5px;
`;

const CertificationDate = styled.div`
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 15px;
`;

const CertificationDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 15px;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const CertificationLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
    transform: translateX(5px);
  }
`;

export default Certifications;
