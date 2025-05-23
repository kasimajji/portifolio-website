import React, { useState } from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const Certifications = ({ certificationsData }) => {
  const certifications = certificationsData?.certifications || [];
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
  };
  
  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };
  
  return (
    <CertificationsSection id="certifications">
      <div className="container">
        <SectionTitle>Certifications</SectionTitle>
        
        <CertificationsGrid>
          {certifications.map((certification, index) => (
            <CertificationCard key={index}>
              <CertificateImage onClick={() => openCertificateModal(certification)}>
                <img 
                  src={certification.image} 
                  alt={certification.title} 
                />
                <CertificateOverlay>
                  <CertificateInfo>
                    <CertificateTitle>{certification.title}</CertificateTitle>
                    <CertificateIssuer>{certification.issuer}</CertificateIssuer>
                    <CertificateDate>{certification.date}</CertificateDate>
                    {certification.link && (
                      <ViewButton 
                        as="a" 
                        href={certification.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt /> View Certificate
                      </ViewButton>
                    )}
                  </CertificateInfo>
                </CertificateOverlay>
              </CertificateImage>
            </CertificationCard>
          ))}
        </CertificationsGrid>
        
        {/* Certificate Modal */}
        {selectedCertificate && (
          <CertificatePopup onClick={closeCertificateModal}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              <PopupCloseButton onClick={closeCertificateModal}>
                <FaTimes />
              </PopupCloseButton>
              <PopupImage 
                src={selectedCertificate.image} 
                alt={selectedCertificate.title} 
              />
            </PopupContent>
          </CertificatePopup>
        )}
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  border: 1px solid rgba(138, 43, 226, 0.1);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4/3;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.15);
  }
  
  &:active {
    transform: scale(0.98);
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

// Certificate image and overlay
const CertificateImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CertificateOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  
  ${CertificateImage}:hover & {
    opacity: 1;
  }
`;

const CertificateInfo = styled.div`
  color: white;
  text-align: center;
`;

const CertificateTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 600;
`;

const CertificateIssuer = styled.p`
  font-size: 0.9rem;
  margin-bottom: 5px;
  opacity: 0.9;
`;

const CertificateDate = styled.p`
  font-size: 0.8rem;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const ViewButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 50px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  
  &:hover {
    background-color: #7020bd;
    transform: translateY(-2px);
  }
`;

// Simple popup components
const CertificatePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`;

const PopupContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

const PopupImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const PopupCloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  
  &:hover {
    background-color: #7020bd;
  }
`;







export default Certifications;
