import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaTimes, FaCertificate } from 'react-icons/fa';

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

const Certifications = ({ certificationsData }) => {
  const certifications = certificationsData?.certifications || [];
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
      setImageLoading(true);
      setImageError(false);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCertificate]);
  
  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
  };
  
  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    setImageLoading(false);
    setImageError(false);
  };
  
  // Handle keyboard events for modal accessibility
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && selectedCertificate) {
      closeCertificateModal();
    }
  }, [selectedCertificate]);

  useEffect(() => {
    if (selectedCertificate) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedCertificate, handleKeyDown]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };
  
  return (
    <CertificationsSection id="certifications">
      <div className="container">
        <SectionTitle>Certifications</SectionTitle>
        
        {certifications.length === 0 ? (
          <div>No certifications found</div>
        ) : (
          <CertificationsGrid>
            {certifications.map((certification, index) => (
              <CertificationCard key={certification.id || index} onClick={() => openCertificateModal(certification)}>
                <CertificateImage>
                  <img 
                    src={getImageUrl(certification.image)} 
                    alt={certification.title}
                    onError={(e) => {
                      console.log('Certificate image load error for:', getImageUrl(certification.image));
                      e.target.src = getImageUrl('images/certification-placeholder.jpg');
                    }}
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
        )}
        
        {/* Certificate Modal with Framer Motion */}
        <AnimatePresence>
          {selectedCertificate && (
            <CertificateModal>
              <ModalOverlay 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeCertificateModal}
              />
              <ModalContent
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalHeader>
                  <ModalTitle>{selectedCertificate.title}</ModalTitle>
                  <ModalSubtitle>
                    {selectedCertificate.issuer} • {selectedCertificate.date}
                  </ModalSubtitle>
                </ModalHeader>
                
                <ModalImageContainer>
                  {imageLoading && (
                    <LoadingSpinner>
                      <FaCertificate /> Loading...
                    </LoadingSpinner>
                  )}
                  {imageError ? (
                    <ErrorMessage>
                      <FaCertificate />
                      <p>Unable to load certificate image</p>
                      {selectedCertificate.link && (
                        <ErrorLink 
                          href={selectedCertificate.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View Online Certificate
                        </ErrorLink>
                      )}
                    </ErrorMessage>
                  ) : (
                    <ModalImage 
                      src={getImageUrl(selectedCertificate.image)} 
                      alt={selectedCertificate.title}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      style={{ display: imageLoading ? 'none' : 'block' }}
                    />
                  )}
                </ModalImageContainer>
                
                {selectedCertificate.link && !imageError && (
                  <ModalFooter>
                    <ModalLink 
                      href={selectedCertificate.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> View Full Certificate
                    </ModalLink>
                  </ModalFooter>
                )}
                
                <ModalCloseButton onClick={closeCertificateModal}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalContent>
            </CertificateModal>
          )}
        </AnimatePresence>
      </div>
    </CertificationsSection>
  );
};

// Styled Components
const CertificationsSection = styled.section`
  padding: 80px 0 60px;
  background-color: var(--section-bg, rgba(248, 250, 252, 0.7));
  min-height: 50vh;
  
  @media (max-width: 768px) {
    padding: 60px 0 40px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
  width: 100%;
  color: var(--text-color, #1e293b);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: var(--primary-color, #8a2be2);
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
  background-color: var(--card-bg, rgba(255, 255, 255, 0.8));
  border-radius: var(--border-radius, 12px);
  box-shadow: var(--card-shadow, 0 4px 20px rgba(0, 0, 0, 0.08));
  transition: var(--transition, all 0.3s ease);
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
  background-color: var(--primary-color, #8a2be2);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 50px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: var(--transition, all 0.3s ease);
  text-decoration: none;
  
  &:hover {
    background-color: #7020bd;
    transform: translateY(-2px);
  }
`;

// Modal Components with Framer Motion
const CertificateModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  width: 95%;
  max-width: 800px;
  max-height: 90vh;
  background-color: var(--card-bg, #ffffff);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(138, 43, 226, 0.1);
  background-color: var(--card-bg, #ffffff);
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: var(--primary-color, #8a2be2);
  font-weight: 600;
`;

const ModalSubtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-light, #64748b);
  margin: 0;
`;

const ModalImageContainer = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color, rgba(255, 255, 255, 0.7));
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ModalFooter = styled.div`
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(138, 43, 226, 0.1);
  background-color: var(--card-bg, #ffffff);
`;

const ModalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: var(--primary-color, #8a2be2);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: var(--transition, all 0.3s ease);
  
  &:hover {
    background-color: #7020bd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  color: var(--text-light, #64748b);
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(138, 43, 226, 0.2);
    color: var(--primary-color, #8a2be2);
    transform: scale(1.1);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: 200px;
  color: var(--primary-color, #8a2be2);
  font-size: 1.1rem;
  
  svg {
    font-size: 2rem;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: 200px;
  color: var(--text-light, #64748b);
  text-align: center;
  
  svg {
    font-size: 3rem;
    color: var(--primary-color, #8a2be2);
    opacity: 0.7;
  }
  
  p {
    margin: 0;
    font-size: 1.1rem;
  }
`;

const ErrorLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--primary-color, #8a2be2);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition, all 0.3s ease);
  
  &:hover {
    background-color: #7020bd;
    transform: translateY(-2px);
  }
`;

export default Certifications;
