import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaLinkedin, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Projects = ({ projectsData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const projects = projectsData?.projects || [];
  const categories = projectsData?.categories || [];
  const modalRef = useRef(null);

  useEffect(() => {
    if (selectedProject) {
      // Disable scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
      
      // Re-enable scrolling when modal is closed
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [selectedProject]);

  const filterProjects = (category) => {
    setActiveFilter(category);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset image index when opening modal
    console.log(`Project modal opened: ${project.title}`);
  };
  
  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.additionalImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.additionalImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.additionalImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.additionalImages.length - 1 : prevIndex - 1
      );
    }
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  // Handle click outside modal to close it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeProjectModal();
    }
  };
  
  // Handle keyboard events for modal accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && selectedProject) {
      closeProjectModal();
    }
  };

  // Add event listeners for modal accessibility
  useEffect(() => {
    if (selectedProject) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      
      // Lock scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus trap - focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore scroll when modal is closed
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category.toLowerCase() === activeFilter);

  return (
    <ProjectsSection id="projects">
      <div className="container">
        <SectionTitle>Projects</SectionTitle>
        
        <ProjectFilters>
          <FilterButton 
            className={activeFilter === 'all' ? 'active' : ''} 
            onClick={() => filterProjects('all')}
          >
            All Projects
          </FilterButton>
          <FilterButton 
            className={activeFilter === 'machine-learning' ? 'active' : ''} 
            onClick={() => filterProjects('machine-learning')}
          >
            Machine Learning
          </FilterButton>
          <FilterButton 
            className={activeFilter === 'deep-learning' ? 'active' : ''} 
            onClick={() => filterProjects('deep-learning')}
          >
            Deep Learning
          </FilterButton>
          <FilterButton 
            className={activeFilter === 'nlp' ? 'active' : ''} 
            onClick={() => filterProjects('nlp')}
          >
            NLP
          </FilterButton>
          <FilterButton 
            className={activeFilter === 'data-visualization' ? 'active' : ''} 
            onClick={() => filterProjects('data-visualization')}
          >
            Data Visualization
          </FilterButton>
          <FilterButton 
            className={activeFilter === 'gen-ai' ? 'active' : ''} 
            onClick={() => filterProjects('gen-ai')}
          >
            Gen AI
          </FilterButton>
        </ProjectFilters>
        
        <ProjectsGrid>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} onClick={() => openProjectModal(project)}>
              <ProjectImg>
                <img src={project.image} alt={project.title} />
              </ProjectImg>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectCategory>{project.category}</ProjectCategory>
                <ProjectDescription>{project.description.substring(0, 100)}...</ProjectDescription>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal onClick={closeProjectModal}>
              <ModalOverlay 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <ModalContent
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                tabIndex={-1}
              >
              <ModalCloseButton onClick={closeProjectModal}>
                <FaTimes />
              </ModalCloseButton>
              
              {/* Top section with two columns */}
              <ModalTopSection>
                {/* Top Left: Title, Description, Skills, Links */}
                <ModalTopLeft>
                  <ModalTitle>{selectedProject.title}</ModalTitle>
                  <ModalShortDescription>{selectedProject.description}</ModalShortDescription>
                  
                  <ModalSectionTitle>Skills & Technologies</ModalSectionTitle>
                  <ModalTags>
                    {selectedProject.tags.map((tag, index) => (
                      <ModalTag key={index}>{tag}</ModalTag>
                    ))}
                  </ModalTags>
                  
                  <ModalLinks>
                    {selectedProject.github && (
                      <ModalLink href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> GitHub
                      </ModalLink>
                    )}
                    {selectedProject.demo && (
                      <ModalLink href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> Demo
                      </ModalLink>
                    )}
                    {selectedProject.linkedinPost && (
                      <ModalLink href={selectedProject.linkedinPost} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin /> LinkedIn Post
                      </ModalLink>
                    )}
                  </ModalLinks>
                </ModalTopLeft>
                
                {/* Top Right: Image Carousel */}
                <ModalTopRight>
                  {selectedProject.additionalImages && selectedProject.additionalImages.length > 0 ? (
                    <ImageCarousel>
                      <CarouselImage>
                        <img 
                          src={selectedProject.additionalImages[currentImageIndex].url} 
                          alt={selectedProject.additionalImages[currentImageIndex].description || `Screenshot ${currentImageIndex + 1}`} 
                        />
                      </CarouselImage>
                      
                      <CarouselNavigation>
                        <CarouselButton onClick={prevImage}>
                          <FaArrowLeft />
                        </CarouselButton>
                        <CarouselCaption>
                          {selectedProject.additionalImages[currentImageIndex].description || `Screenshot ${currentImageIndex + 1}`}
                        </CarouselCaption>
                        <CarouselButton onClick={nextImage}>
                          <FaArrowRight />
                        </CarouselButton>
                      </CarouselNavigation>
                      
                      <CarouselIndicators>
                        {selectedProject.additionalImages.map((_, index) => (
                          <CarouselIndicator 
                            key={index} 
                            active={index === currentImageIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                          />
                        ))}
                      </CarouselIndicators>
                    </ImageCarousel>
                  ) : (
                    <ImagePlaceholder>
                      <img src={selectedProject.image} alt={selectedProject.title} />
                    </ImagePlaceholder>
                  )}
                </ModalTopRight>
              </ModalTopSection>
              
              {/* Divider Line */}
              <ModalDivider />
              
              {/* Bottom section with two columns */}
              <ModalBottomSection>
                {/* Bottom Left: Project Explanation */}
                <ModalBottomLeft>
                  <ModalSectionTitle>Project Explanation</ModalSectionTitle>
                  <ModalDescription dangerouslySetInnerHTML={{ __html: selectedProject.fullDescription.replace(/\n/g, '<br>') }} />
                </ModalBottomLeft>
                
                {/* Bottom Right: Video Explanation */}
                <ModalBottomRight>
                  <ModalSectionTitle>Video Explanation</ModalSectionTitle>
                  <ModalVideoContainer>
                    {selectedProject.youtubeVideo ? (
                      <iframe 
                        src={selectedProject.youtubeVideo} 
                        title={`${selectedProject.title} Video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <VideoPlaceholder>
                        <span>Video coming soon</span>
                      </VideoPlaceholder>
                    )}
                  </ModalVideoContainer>
                </ModalBottomRight>
              </ModalBottomSection>
              </ModalContent>
            </ProjectModal>
          )}
        </AnimatePresence>
      </div>
    </ProjectsSection>
  );
};

// Styled Components
const ProjectsSection = styled.section`
  padding: 40px 0;
  background-color: var(--background-color);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
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

const ProjectFilters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
`;

const FilterButton = styled.button`
  padding: 10px 22px;
  border: none;
  background-color: var(--light-color);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover, &.active {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  border: 1px solid rgba(138, 43, 226, 0.1);
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-bg);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImg = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
`;

const ProjectInfo = styled.div`
  padding: 25px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: var(--text-color);
`;

const ProjectDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--text-color);
  font-weight: 600;
`;

const ProjectCategory = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  color: var(--primary-color);
  background-color: rgba(138, 43, 226, 0.1);
  padding: 5px 15px;
  border-radius: 50px;
  margin-bottom: 20px;
`;

// Modal Styled Components
const ProjectModal = styled(motion.div)`
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
  padding: 0;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  pointer-events: auto; /* Capture clicks */
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  z-index: 1001;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  pointer-events: auto; /* Capture clicks */
  padding: 0; /* Remove default padding */
  display: flex;
  flex-direction: column;

  
  /* Ensure modal is not cut off on smaller screens */
  @media (max-height: 700px) {
    max-height: 90vh;
  }
  
  @media (max-width: 600px) {
    width: 95%;
    max-height: 90vh;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 20px;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  color: var(--text-light);
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
    background: rgba(0, 0, 0, 0.2);
    color: var(--primary-color);
  }
`;

const ModalHeader = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalDescription = styled.p`
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1rem;
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ModalSkillTag = styled.span`
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ModalLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 25px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition);
  background-color: ${props => props.href?.includes('github') ? '#333' : 'var(--primary-color)'};
  color: white;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
  
  &:nth-child(2) {
    background-color: var(--light-color);
    color: var(--text-color);
    
    &:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ModalTag = styled.span`
  font-size: 0.8rem;
  color: var(--text-color);
  background-color: var(--light-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ModalSectionTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-color);
  font-weight: 600;
`;

const ModalVideoContainer = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-style: italic;
`;

// New Modal Components
const ModalTopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ModalTopLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTopRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalBottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 0 30px 30px 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ModalBottomLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalBottomRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
`;

const ModalShortDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-light);
  margin-bottom: 20px;
`;

const ImageCarousel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CarouselImage = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const CarouselNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #f9f9f9;
`;

const CarouselButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: scale(1.1);
  }
`;

const CarouselCaption = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
  text-align: center;
  flex-grow: 1;
  padding: 0 10px;
`;

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: #f9f9f9;
  position: relative;
`;

const CarouselIndicator = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--primary-color)' : '#ccc'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#999'};
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default Projects;
