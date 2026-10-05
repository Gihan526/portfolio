import type { Metadata } from "next";
import SiteNav from "../site-nav";

export const metadata: Metadata = {
  title: "About — Gihan Ariyasena",
};

export default function About() {
  return (
    <div className="portfolio">
      <SiteNav />
      <main aria-labelledby="about-heading">
        <h1 id="about-heading" className="about-heading">About</h1>
        <div className="profile-bio">
          <p>
            I got into programming through <strong>machine learning</strong>: I
            taught myself <strong>Python</strong> to understand how models
            actually learn from data, not just how to call a library. That
            curiosity pushed me to implement the UMAP algorithm from scratch,
            maths, nearest-neighbour logic, bugs and all. I’m still learning ML
            and AI on my own, mostly by building projects that show me what I
            understand and what to improve.
          </p>
          <p>
            The same curiosity led me to <strong>full-stack development</strong>
            {" "}and <strong>hackathons</strong>, where I learned to ship working
            ideas under pressure. My teams went on to win <strong>first place</strong>
            {" "}at a university hackathon and the <strong>Most Innovative Concept</strong>
            {" "}award at the Hemas AIthon.
          </p>
        </div>
      </main>
    </div>
  );
}
