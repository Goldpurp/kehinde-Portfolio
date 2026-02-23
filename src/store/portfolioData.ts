
export const portfolioConfig = {
  name: "Kehinde Razaq",
  role: "Software Developer",
  bio: "Software developer with practical experience across front-end and back-end roles. Experienced in building user-focused interfaces, implementing backend logic, and supporting products from development to launch.",
  githubUsername: "kehinderazaq", 
  location: "Lagos, Nigeria",
  email: "kehinderazaq03@gmail.com",
  socials: {
    github: "https://github.com/kehinderazaq",
    linkedin: "https://linkedin.com/in/kehinderazaq",
    twitter: "https://twitter.com/kehinderazaq",
  },
  experience: [
    {
      id: "konvato-intern",
      title: "Backend Engineering Intern",
      company: "Konvato (Startup)",
      period: "10/25 - Present",
      desc: "Working with backend and full-stack engineers to bring the product to life. Assisting in building backend logic and APIs using C# and .NET.",
      tags: ["C#", ".NET", "API", "Backend"]
    },
    {
      id: "fanful-junior",
      title: "Junior Developer",
      company: "Fanful",
      period: "08/24 - 05/25",
      desc: "Built and maintained front-end features in collaboration with the engineering team. Translated product requirements into functional and user-friendly interfaces.",
      tags: ["React", "TypeScript", "UI/UX", "Code Review"]
    },
    {
      id: "weddn-frontend",
      title: "Front-End Developer",
      company: "Weddn (Startup)",
      period: "10/24 - 12/24",
      desc: "Designed and built user-facing interfaces in collaboration with a small engineering team. Implemented responsive layouts and front-end functionality.",
      tags: ["React", "Responsive Design", "Frontend"]
    },
    {
      id: "fanful-intern",
      title: "Software Development Intern",
      company: "Fanful",
      period: "03/23 - 08/23",
      desc: "Assisted in building UI components and supporting feature development. Worked with shared codebases and version control systems.",
      tags: ["UI Components", "Git", "Collaboration"]
    },
    {
      id: "altschool-junior",
      title: "Junior Front-End Engineer",
      company: "AltSchool Africa",
      period: "08/21 - 01/23",
      desc: "Built responsive UI components and improved user experience. Collaborated on team projects and participated in code reviews.",
      tags: ["React", "JavaScript", "CSS", "Teamwork"]
    }
  ]
};

export const fetchRepos = async () => {
  try {
    const res = await fetch(`https://api.github.com/users/${portfolioConfig.githubUsername}/repos?sort=updated&per_page=20`);
    const data = await res.json();
    return Array.isArray(data) ? data.filter((r: any) => !r.fork) : [];
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
};

export const fetchRepoDetail = async (name: string) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${portfolioConfig.githubUsername}/${name}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching repo detail:", error);
    return null;
  }
};
