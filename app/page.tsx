import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <section>
      <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
        Hey, I&rsquo;m Gihan, a Computer Science student who enjoys building
        practical, reliable software with a focus on backend systems,
        cloud, and AI.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <a
          href="https://github.com/Gihan526"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          <IconBrandGithub size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/gihan-ariyasena-267123357"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          <IconBrandLinkedin size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="https://x.com/gihan_ahk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          <IconBrandX size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="mailto:gihanariyasena526@gmail.com"
          aria-label="Email"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          <IconMail size={24} stroke={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
