
import React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';

// Layout
import { Layout } from './src/components/Layout';

// Pages
import { LandingPage } from './src/pages/LandingPage';
import { AboutPage } from './src/pages/AboutPage';
import { ProjectsPage } from './src/pages/ProjectsPage';
import { SkillsPage } from './src/pages/SkillsPage';
import { ExperiencePage } from './src/pages/ExperiencePage';
import { ContactPage } from './src/pages/ContactPage';
import { ProjectDetail } from './src/pages/ProjectDetail';
import { ExperienceDetail } from './src/pages/ExperienceDetail';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:name" element={<ProjectDetail />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
