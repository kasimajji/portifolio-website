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
    --background-color: #ffffff;
    --section-bg: #f8fafc;
    --card-bg: #ffffff;
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    --transition: all 0.3s ease;
    --gradient-bg: linear-gradient(135deg, #8a2be2, #ff69b4); /* Purple to pink gradient */
    --profile-gradient: linear-gradient(135deg, #4a00e0, #8e2de2); /* Dark purple to violet gradient */
    --name-gradient: linear-gradient(135deg, #4a00e0, #8e2de2); /* Blue to violet gradient for name */
    --border-radius: 12px;
    --nav-bg: rgba(255, 255, 255, 0.95);
    --nav-text: #1e293b;
    --footer-bg: linear-gradient(to right, #0f172a, #1e293b);
    --footer-text: #ffffff;
  }

  /* Dark mode */
  [data-theme="dark"] {
    --primary-color: #8a2be2; /* Keep vibrant purple */
    --secondary-color: #ff69b4; /* Keep pink */
    --accent-color: #00bfff; /* Keep bright blue */
    --dark-color: #f1f5f9;
    --light-color: #0f172a;
    --text-color: #f1f5f9;
    --text-light: #a1a1aa;
    --background-color: #0f172a; /* Dark blue background */
    --section-bg: #1e293b; /* Slightly lighter dark blue */
    --card-bg: #1e293b;
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    --nav-bg: rgba(15, 23, 42, 0.95);
    --nav-text: #f1f5f9;
    --footer-bg: linear-gradient(to right, #0f172a, #1e293b);
    --footer-text: #ffffff;
    --profile-gradient: linear-gradient(135deg, #8a2be2, #4a00e0); /* Reversed gradient for dark mode */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    position: relative;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
    height: auto;
    min-height: 100vh;
    font-size: 0.95rem; /* Decreased base font size */
    background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
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
`;

export default GlobalStyles;
