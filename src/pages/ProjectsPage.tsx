
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { ProjectCard } from '../components/ProjectCard';
import { fetchRepos } from '../store/portfolioData';

export const ProjectsPage = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepos().then(data => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  return (
    <PageWrapper title="The Archive" subtitle="A curated collection of technical explorations, open-source contributions, and production-grade systems." number="02">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
          ))
        ) : (
          repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))
        )}
      </div>
    </PageWrapper>
  );
};
