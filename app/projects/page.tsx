import type { Metadata } from "next";
import SiteNav from "../site-nav";
import PageContent from "../page-content";
import BouncingBall from "../demos/BouncingBall";
import DiaShimmer from "../demos/DiaShimmer";
import Confetti from "../demos/Confetti";

export const metadata: Metadata = {
  title: "Projects — Gihan Ariyasena",
};

const projects = [
  {
    title: "Basketball Bounce",
    href: "https://basketball-phi.vercel.app/",
    Demo: BouncingBall,
    description: "A playful physics experiment with adjustable gravity, bounce, spin, and squish.",
  },
  {
    title: "Dia Text Shimmer",
    href: "https://diaeffect-xwtw.vercel.app/",
    Demo: DiaShimmer,
    description: "An interactive text shimmer experiment.",
  },
  {
    title: "GitHub Confetti",
    href: "https://github-gihank.vercel.app/",
    Demo: Confetti,
    description: "A contribution grid with a playful confetti trigger.",
  },
];

const repositories = [
  {
    name: "shell-chat",
    href: "https://github.com/Gihan526/shell-chat",
    stack: "TS · Bun",
    description: "Real-time terminal chat app with a TUI client and server.",
  },
  {
    name: "umap-algorithm-from-scratch",
    href: "https://github.com/Gihan526/umap-algorithm-from-scratch",
    stack: "Python · ML",
    description: "UMAP dimensionality-reduction algorithm implemented from scratch.",
  },
  {
    name: "leetcode-discord-rich-presence",
    href: "https://github.com/Gihan526/leetcode-discord-rich-presence",
    stack: "JS · Node.js",
    description: "Shows your current LeetCode problem as a Discord status.",
  },
];

export default function Projects() {
  return (
    <div className="portfolio">
      <SiteNav />
      <PageContent labelledBy="projects-heading">
        <section className="repository-projects" aria-labelledby="projects-heading">
          <h1 id="projects-heading" className="about-heading">Projects</h1>
          <ul className="text-project-list">
            {repositories.map((repository) => (
              <li key={repository.href}>
                <div className="text-project-heading">
                  <h2>
                    <a href={repository.href} target="_blank" rel="noopener noreferrer">
                      {repository.name}
                    </a>
                  </h2>
                  <p className="text-project-stack">{repository.stack}</p>
                  <a
                    className="text-project-github"
                    href={repository.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${repository.name} on GitHub (opens in a new tab)`}
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p className="text-project-description">{repository.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="projects" aria-labelledby="playground-heading">
          <h2 id="playground-heading">Playground</h2>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card${index === 0 ? " project-card-featured" : ""}`}
                key={project.href}
                aria-label={project.title}
              >
                <div className="project-demo">
                  <project.Demo />
                </div>
                <div className="project-copy">
                  <a className="project-title" href={project.href} target="_blank" rel="noopener noreferrer"
                    aria-label={`Open ${project.title} (opens in a new tab)`}>
                    <h3>{project.title}</h3>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </PageContent>
    </div>
  );
}
