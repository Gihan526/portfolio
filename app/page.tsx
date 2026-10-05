import Image from "next/image";
import SiteNav from "./site-nav";
import reasonedLogo from "@/public/reasoned-logo.png";
import founderDiaryLogo from "@/public/founder-diary-logo.png";

const experience = [
  {
    id: "now",
    company: "Reasoned.",
    logo: reasonedLogo,
    role: "Software Engineer Intern",
    dates: "Aug 2026 – present",
    description:
      "Built real-time AI voice assistants and an AI CV tailoring engine with Go, React, and TypeScript.",
  },
  {
    id: "founder-diary",
    company: "Founder Diary",
    logo: founderDiaryLogo,
    href: "https://founderdiary.in",
    role: "Software Developer Intern",
    dates: "Jul – Sep 2026",
    description:
      "Built REST APIs, integrated AI features, and connected frontend components to backend services.",
  },
];

export default function Home() {
  return (
    <div className="portfolio" id="home">
      <SiteNav />
      <main aria-labelledby="profile-name">
        <header className="profile">
          <div className="profile-photo">
            <Image
              src="/figma-profile.jpg"
              alt="Gihan Ariyasena working on his laptop"
              width={72}
              height={72}
              sizes="72px"
              preload
            />
          </div>
          <div className="profile-intro">
            <h1 id="profile-name">Gihan Ariyasena</h1>
            <p>Software Developer &amp; Computer Science Student</p>
          </div>
          <nav className="profile-links" aria-label="Social and contact links">
            <a href="https://github.com/Gihan526" target="_blank" rel="noopener noreferrer" aria-label="GitHub">github</a>
            <a href="https://www.linkedin.com/in/gihan-ariyasena-267123357" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">linkedin</a>
            <a href="https://x.com/gihan_ahk" target="_blank" rel="noopener noreferrer" aria-label="X">x</a>
            <a href="mailto:gihanariyasena526@gmail.com">email</a>
            <a href="/Gihan_Resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
          </nav>
          <p className="profile-bio">
            Hey, I’m Gihan, a Computer Science student who enjoys building
            practical, reliable software with a focus on backend systems, cloud,
            and AI.
          </p>
        </header>

        <section className="experience" id="work" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          <ul className="experience-list">
            {experience.map((entry) => (
              <li className="experience-item" id={entry.id} key={entry.company}>
                <div className="company-mark" aria-hidden="true">
                  <Image src={entry.logo} alt="" sizes="36px" />
                </div>
                <div className="experience-content">
                  <div className="experience-heading">
                    <h3>
                      {entry.href ? (
                        <a href={entry.href} target="_blank" rel="noopener noreferrer">
                          {entry.company}
                        </a>
                      ) : entry.company}
                    </h3>
                    <p className="experience-meta">
                      <span className="experience-separator" aria-hidden="true">·</span>
                      <span>{entry.role}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.dates}</span>
                    </p>
                  </div>
                  <p className="experience-description">{entry.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>


      </main>
    </div>
  );
}
