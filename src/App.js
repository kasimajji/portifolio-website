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

// Sample data - In a real app, this would come from an API or JSON files
import profileData from './data/profile.json';
import projectsData from './data/projects.json';
import certificationsData from './data/certifications.json';
import skillsData from './data/skills.json';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };
  
  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero profileData={profileData} />
          <About profileData={profileData} />
          <Skills skillsData={skillsData} />
          <Projects projectsData={projectsData} />
          <Certifications certificationsData={certificationsData} />
          <Contact contactData={profileData} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
