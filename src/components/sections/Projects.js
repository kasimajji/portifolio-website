import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const Projects = ({ projectsData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = projectsData?.projects || [];
  const categories = projectsData?.categories || [];

  const filterProjects = (category) => {
    setActiveFilter(category);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

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
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal>
            <ModalOverlay onClick={closeProjectModal} />
            <ModalContent>
              <ModalCloseButton onClick={closeProjectModal}>
                <FaTimes />
              </ModalCloseButton>
              
              <ModalImage>
                <img src={selectedProject.image} alt={selectedProject.title} />
              </ModalImage>
              
              <ModalBody>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                <ModalCategory>{selectedProject.category}</ModalCategory>
                <ModalDescription>{selectedProject.description}</ModalDescription>
                
                <ModalSection>
                  <ModalSectionTitle>Key Features</ModalSectionTitle>
                  <ModalFeaturesList>
                    {selectedProject.features.map((feature, index) => (
                      <ModalFeatureItem key={index}>{feature}</ModalFeatureItem>
                    ))}
                  </ModalFeaturesList>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle>Technologies Used</ModalSectionTitle>
                  <ModalTags>
                    {selectedProject.tags.map((tag, index) => (
                      <ModalTag key={index}>{tag}</ModalTag>
                    ))}
                  </ModalTags>
                </ModalSection>
                
                <ModalLinks>
                  {selectedProject.github && (
                    <ModalLink href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub /> View Code
                    </ModalLink>
                  )}
                  {selectedProject.demo && (
                    <ModalLink href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> Live Demo
                    </ModalLink>
                  )}
                </ModalLinks>
              </ModalBody>
            </ModalContent>
          </ProjectModal>
        )}
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

const ProjectCategory = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  color: var(--primary-color);
  background-color: rgba(138, 43, 226, 0.1);
  padding: 5px 12px;
  border-radius: 50px;
  margin-bottom: 15px;
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

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProjectTag = styled.span`
  font-size: 0.8rem;
  color: var(--text-light);
  background-color: var(--light-color);
  padding: 4px 10px;
  border-radius: 50px;
`;

// Modal Styled Components
const ProjectModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  z-index: 1001;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
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
  background-color: var(--light-color);
  color: var(--text-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  z-index: 1002;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--text-color);
`;

const ModalCategory = styled.span`
  display: inline-block;
  font-size: 0.9rem;
  color: var(--primary-color);
  background-color: rgba(138, 43, 226, 0.1);
  padding: 5px 15px;
  border-radius: 50px;
  margin-bottom: 20px;
`;

const ModalDescription = styled.p`
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 25px;
`;

const ModalSection = styled.div`
  margin-bottom: 25px;
`;

const ModalSectionTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-color);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const ModalFeaturesList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ModalFeatureItem = styled.li`
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
  color: var(--text-light);
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-size: 1.5rem;
    line-height: 1;
  }
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ModalTag = styled.span`
  font-size: 0.9rem;
  color: var(--text-light);
  background-color: var(--light-color);
  padding: 5px 15px;
  border-radius: 50px;
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
  background-color: var(--primary-color);
  color: white;
  
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

export default Projects;
