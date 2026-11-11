import { ArrowUpRight, Clock } from "lucide-react";
import { projects, type Project } from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="03"
          label="Projects"
          title="Selected Work."
          titleId="projects-title"
          align="split"
          subtitle="Small steps, practical experience, continuous improvement."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.number} delay={i * 120} className={i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft">
      {/* Preview */}
      <div className="relative aspect-[16/11] overflow-hidden border-b border-border bg-secondary">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <CodePreview project={project} />
        )}
        <span className="font-display absolute right-5 top-3 text-[3.5rem] leading-none text-primary/10 transition-colors duration-500 group-hover:text-gold/40">
          {project.number}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[0.7rem] text-gold">Project {project.number}</p>
        <h3 className="font-display mt-2 text-[1.65rem] leading-tight text-primary">{project.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[0.68rem] text-primary">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <div className="border-t border-border pt-5">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                <span className="link-underline">View Project</span>
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground" title="This project's link will be added soon">
                <Clock className="size-3.5 text-gold" aria-hidden />
                View Project — coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function CodePreview({ project }: { project: Project }) {
  return (
    <div aria-hidden className="dot-grid absolute inset-0 flex items-end p-5 sm:p-6">
      <div className="w-full translate-y-3 overflow-hidden rounded-md border border-border bg-card shadow-card transition-transform duration-700 group-hover:translate-y-0">
        <div className="flex items-center gap-1.5 border-b border-border bg-background px-3 py-2">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-gold/70" />
          <span className="ml-2 font-mono text-[0.62rem] text-muted-foreground">{project.preview.file}</span>
        </div>
        <pre className="overflow-hidden px-4 py-3 font-mono text-[0.66rem] leading-[1.75] text-foreground/80">
          {project.preview.lines.map((line, i) => (
            <div key={i} className="flex gap-3 whitespace-pre">
              <span className="w-3 select-none text-right text-muted-foreground/60">{i + 1}</span>
              <span>{line || " "}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
