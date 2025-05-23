import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Light mode (default) */
    --primary-color: #8a2be2; /* Vibrant purple */
    --secondary-color: #ff69b4; /* Pink */
    --accent-color: #00bfff; /* Bright blue */
    --dark-color: #0f172a;
    --light-color: #f1f5f9;
    --text-color: #1e293b;
    --text-light: #64748b;
    --background-color: rgba(255, 255, 255, 0.7);
    --background-gradient: linear-gradient(135deg, rgba(208, 188, 255, 0.7), rgba(176, 217, 255, 0.7));
    --backdrop-filter: blur(10px);
    --section-bg: rgba(248, 250, 252, 0.7);
    --card-bg: rgba(255, 255, 255, 0.8);
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    --transition: all 0.3s ease;
    --gradient-bg: linear-gradient(135deg, #8a2be2, #00bfff); /* Purple to blue gradient */
    --profile-gradient: linear-gradient(135deg, #4a00e0, #8e2de2); /* Dark purple to violet gradient */
    --name-gradient: linear-gradient(135deg, #4a00e0, #00bfff); /* Purple to blue gradient for name */
    --border-radius: 12px;
    --nav-bg: rgba(255, 255, 255, 0.85);
    --nav-text: #1e293b;
    --footer-bg: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
    --footer-text: #ffffff;
  }

  /* Dark mode */
  [data-theme="dark"] {
    --primary-color: #8a2be2; /* Vibrant purple */
    --secondary-color: #00bfff; /* Bright blue */
    --accent-color: #00bfff; /* Bright blue */
    --dark-color: #f1f5f9;
    --light-color: #0f172a;
    --text-color: #f1f5f9;
    --text-light: #a1a1aa;
    --background-color: rgba(15, 10, 40, 0.95);
    --background-gradient: linear-gradient(to right, #0e1e4a, #2b0a3d);
    --backdrop-filter: blur(5px);
    --section-bg: rgba(22, 18, 48, 0.7);
    --card-bg: rgba(22, 18, 48, 0.8);
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    --nav-bg: rgba(15, 10, 40, 0.9);
    --nav-text: #f1f5f9;
    --footer-bg: linear-gradient(to right, #0e1e4a, #2b0a3d);
    --footer-text: #ffffff;
    --gradient-bg: linear-gradient(135deg, #8a2be2, #00bfff);
    --profile-gradient: linear-gradient(135deg, #8a2be2, #4a00e0);
    --name-gradient: linear-gradient(135deg, #8a2be2, #00bfff);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    position: relative;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
    height: 100%;
    min-height: 100vh;
    font-size: 0.95rem; /* Decreased base font size */
    background: var(--background-gradient);
    backdrop-filter: var(--backdrop-filter);
    margin: 0;
    padding: 0;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  /* Loading Screen */
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .loader {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(138, 43, 226, 0.1);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
    position: relative;
    display: inline-block;
  }

  .section-title::after {
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

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(30px, 30px) rotate(10deg); }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default GlobalStyles;
