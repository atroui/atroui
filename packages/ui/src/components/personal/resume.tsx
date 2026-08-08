import type { ReactNode } from "react";
import {
  Briefcase,
  Building2,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { cn } from "../../lib/utils";

/** Edit this blob after install — printable via `.resume-print`. */
const CONTENT = {
  name: "Your Name",
  title: "Product engineer",
  summary:
    "Designer-engineer who ships calm interfaces and durable systems. Comfortable across product, frontend, and delivery.",
  email: "hello@example.com",
  phone: "+1 555 000 0000",
  location: "Remote",
  experience: [
    {
      role: "Founding Engineer",
      company: "Example Studio",
      period: "2024 — Present",
      description: [
        "Owned end-to-end product delivery for client MVPs.",
        "Built reusable UI systems and host-bound tools.",
      ],
    },
    {
      role: "Frontend Engineer",
      company: "Acme",
      period: "2022 — 2024",
      description: [
        "Shipped design-system primitives used across web apps.",
        "Improved Core Web Vitals and accessibility baselines.",
      ],
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "State University",
      year: "2022",
    },
  ],
  skills: ["TypeScript", "React", "Next.js", "Design systems", "Product"],
  projects: [
    {
      title: "Personal site kit",
      description: "Narrow chrome and indie home sections for AtroUI.",
      href: "https://www.atroui.com",
    },
    {
      title: "Studio tools",
      description: "OG, scope, and thumbnail demos.",
      href: "https://www.atroui.com/docs",
    },
  ],
};

export type ResumeExperience = {
  role: string;
  company: string;
  period: string;
  description: string[];
};

export type ResumeEducation = {
  degree: string;
  school: string;
  year: string;
};

export type ResumeProject = {
  title: string;
  description: string;
  href?: string;
};

export type ResumeProps = {
  name?: string;
  title?: string;
  summary?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: ResumeExperience[];
  education?: ResumeEducation[];
  skills?: string[];
  projects?: ResumeProject[];
  className?: string;
};

export function Resume({
  name = CONTENT.name,
  title = CONTENT.title,
  summary = CONTENT.summary,
  email = CONTENT.email,
  phone = CONTENT.phone,
  location = CONTENT.location,
  experience = CONTENT.experience,
  education = CONTENT.education,
  skills = CONTENT.skills,
  projects = CONTENT.projects,
  className,
}: ResumeProps = {}) {
  return (
    <div
      className={cn(
        "resume-print overflow-hidden rounded-[10px] border border-border-subtle bg-background",
        className,
      )}
    >
      <header className="border-b border-border-subtle bg-muted/40 p-6 sm:p-8">
        <div className="space-y-3">
          <div>
            <h2 className="text-[1.75rem] font-medium tracking-[-0.02em] text-foreground sm:text-[2rem]">
              {name}
            </h2>
            <p className="mt-1 text-[15px] text-muted-foreground">{title}</p>
          </div>
          <p className="max-w-[52ch] text-[14px] leading-[1.65] text-muted-foreground">
            {summary}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <MetaChip href={`mailto:${email}`} icon={Mail}>
              {email}
            </MetaChip>
            {phone ? (
              <MetaChip href={`tel:${phone.replace(/\s+/g, "")}`} icon={Phone}>
                {phone}
              </MetaChip>
            ) : null}
            <MetaChip icon={MapPin}>{location}</MetaChip>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="p-6 sm:p-8 lg:col-span-2">
          <section aria-labelledby="resume-experience">
            <SectionLabel id="resume-experience" icon={Briefcase}>
              Experience
            </SectionLabel>
            <div className="space-y-8 pl-2">
              {experience.map((job) => (
                <div
                  key={`${job.role}-${job.company}-${job.period}`}
                  className="relative pl-7"
                >
                  <span
                    aria-hidden
                    className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground"
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-[15px] font-medium text-foreground">
                      {job.role}
                    </h3>
                    <span className="w-fit font-mono text-[11px] text-muted-foreground">
                      {job.period}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {job.company}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[13.5px] leading-[1.6] text-muted-foreground">
                    {job.description.map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-[8px] h-[3px] w-[3px] shrink-0 rounded-full bg-muted-foreground/50"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-8 border-t border-border-subtle bg-muted/30 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <section aria-labelledby="resume-education">
            <SectionLabel id="resume-education" icon={GraduationCap}>
              Education
            </SectionLabel>
            <div className="space-y-4">
              {education.map((ed) => (
                <div
                  key={`${ed.degree}-${ed.school}`}
                  className="border-l border-border-subtle pl-3"
                >
                  <h3 className="text-[14px] font-medium text-foreground">
                    {ed.degree}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">
                    {ed.school}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {ed.year}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="resume-skills">
            <SectionLabel id="resume-skills" icon={Code2}>
              Skills
            </SectionLabel>
            <ul className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-[4px] border border-border-subtle bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {projects.length > 0 ? (
          <div className="border-t border-border-subtle p-6 sm:p-8 lg:col-span-3">
            <section aria-labelledby="resume-projects">
              <SectionLabel id="resume-projects" icon={Code2}>
                Selected work
              </SectionLabel>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <li
                    key={project.title}
                    className="rounded-[8px] border border-border-subtle p-3.5"
                  >
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13.5px] font-medium text-foreground hover:underline"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <h3 className="text-[13.5px] font-medium text-foreground">
                        {project.title}
                      </h3>
                    )}
                    <p className="mt-1.5 text-[12.5px] leading-[1.55] text-muted-foreground">
                      {project.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SectionLabel({
  id,
  icon: Icon,
  children,
}: {
  id: string;
  icon: typeof Briefcase;
  children: ReactNode;
}) {
  return (
    <h3
      id={id}
      className="mb-4 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      {children}
    </h3>
  );
}

function MetaChip({
  href,
  icon: Icon,
  children,
}: {
  href?: string;
  icon: typeof Mail;
  children: ReactNode;
}) {
  const className =
    "inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground";
  const inner = (
    <>
      <Icon className="h-3 w-3" strokeWidth={1.75} aria-hidden />
      {children}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cn(className, "hover:text-foreground")}>
        {inner}
      </a>
    );
  }
  return <span className={className}>{inner}</span>;
}
