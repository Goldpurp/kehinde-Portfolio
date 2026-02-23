
export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  desc: string;
  tags: string[];
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  license?: { name: string };
}
