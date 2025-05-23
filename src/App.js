import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/Themes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    profileData: null,
    projectsData: null,
    certificationsData: null,
    skillsData: null
  });
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };
  
  // Load data from public folder
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, projectsRes, certificationsRes, skillsRes] = await Promise.all([
          fetch(`${process.env.PUBLIC_URL}/data/profile.json`),
          fetch(`${process.env.PUBLIC_URL}/data/projects.json`),
          fetch(`${process.env.PUBLIC_URL}/data/certifications.json`),
          fetch(`${process.env.PUBLIC_URL}/data/skills.json`)
        ]);

        const [profileData, projectsData, certificationsData, skillsData] = await Promise.all([
          profileRes.json(),
          projectsRes.json(),
          certificationsRes.json(),
          skillsRes.json()
        ]);

        setData({
          profileData,
          projectsData,
          certificationsData,
          skillsData
        });
      } catch (error) {
        console.error('Error loading data:', error);
        // Set empty data structure if loading fails
        setData({
          profileData: {},
          projectsData: { projects: [] },
          certificationsData: { certifications: [] },
          skillsData: { skills: [] }
        });
      }
    };

    loadData();
  }, []);
  
  // Load saved theme from localStorage or set dark theme as default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Set dark theme as default and save to localStorage
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Increased time to allow data loading
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading || !data.profileData) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App" data-theme={theme}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero profileData={data.profileData} />
          <About profileData={data.profileData} />
          <Skills skillsData={data.skillsData} />
          <Projects projectsData={data.projectsData} />
          <Certifications certificationsData={data.certificationsData} />
          <Contact contactData={data.profileData} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
