"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import FinanceLab from "@/components/FinanceLab";

const categories = [
  "All",
  "Markets & Research",
  "Quantitative Finance",
  "Financial Modeling",
  "Analytics & Simulation",
  "Strategy & AI",
] as const;

function UtilityModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="utility-modal open" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="utility-card">
        <button className="utility-close" onClick={onClose} aria-label="Close">×</button>
        {children}
      </div>
    </div>
  );
}

function ProjectPreview({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="case-modal open" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <button className="case-close" onClick={onClose} aria-label="Close project">×</button>
      <div className="case-wrap">
        <div className="case-top">
          <div className="case-visual">
            {project.previewImage.endsWith(".pdf") ? (
              <iframe
                src={`${project.previewImage}#page=1&view=FitH`}
                title={`${project.title} preview`}
              />
            ) : (
              <Image
                src={project.previewImage}
                alt={`${project.title} preview`}
                width={1400}
                height={900}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            )}
          </div>
          <div className="case-info">
            <div className="tag">{project.category}</div>
            <h3>{project.title}</h3>
            <div className="lead">{project.subtitle}</div>
            <p>{project.finding}</p>
            <div className="case-actions">
              {project.artifact && (
                <a
                  className="btn"
                  href={project.artifact}
                  target={project.artifact.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  download={project.artifact.endsWith(".xlsx") ? true : undefined}
                >
                  {project.artifactLabel ?? "Open artifact"} ↗
                </a>
              )}
              <button className="btn secondary" onClick={onClose}>Back to projects</button>
            </div>
          </div>
        </div>
        <div className="case-details">
          <div className="detail"><h4>Problem</h4><p>{project.problem}</p></div>
          <div className="detail"><h4>Approach</h4><p>{project.approach}</p></div>
          <div className="detail"><h4>Analysis</h4><p>{project.analysis}</p></div>
          <div className="detail"><h4>Key finding</h4><p>{project.finding}</p></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const visibleProjects = useMemo(
    () => projects.filter((p) => filter === "All" || p.category === filter),
    [filter]
  );

  return (
    <>
      <nav>
        <div className="wrap navin">
          <a className="brand" href="#top">{site.name.toUpperCase()}</a>
          <div className="navlinks">
            <a href="#about">About</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#leadership">Leadership</a>
            <a href="#credentials">Credentials</a>
            <a href="#finance-lab">Finance Lab</a>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Finance · Markets · Analytics</div>
            <h1>{site.headline}</h1>
            <div className="subhead">
              <strong>{site.subheadline}</strong> MBA candidate in Finance &amp; Business Analytics at the University of Delaware.
            </div>
            <div className="cta">
              <a className="btn secondary" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a className="btn" href={site.resume} target="_blank" rel="noopener noreferrer">Resume ↗</a>
              <button className="btn secondary" onClick={() => setIntroOpen(true)}>Introduction Video</button>
              <button className="btn secondary" onClick={() => setContactOpen(true)}>Contact</button>
            </div>
          </div>

          <div className="hero-side">
            <div className="photo-card">
              <Image
                src="/profile/headshot.png"
                alt="Swapnil Tungare professional headshot"
                width={900}
                height={900}
                priority
              />
            </div>
            <div className="snapshot">
              <div className="snapshot-head">
                <span>Profile snapshot</span>
                <span className="snapshot-ready">● Professional profile</span>
              </div>
              <div className="snapshot-grid">
                <div className="snapshot-item"><div className="snapshot-value">2+ yrs</div><div className="snapshot-label">Finance experience</div></div>
                <div className="snapshot-item"><div className="snapshot-value">20+</div><div className="snapshot-label">Accounts reconciled daily</div></div>
                <div className="snapshot-item"><div className="snapshot-value">$200M–$500M</div><div className="snapshot-label">Daily wire validation</div></div>
                <div className="snapshot-item"><div className="snapshot-value">Finance + BA</div><div className="snapshot-label">MBA focus</div></div>
              </div>
              <div className="snapshot-line">
                <svg viewBox="0 0 320 54" aria-hidden="true">
                  <path
                    d="M0 44 C38 38,45 15,82 18 S125 43,155 31 S190 5,225 9 S264 4,283 2 S302 18,320 0"
                    fill="none"
                    stroke="#73c6dd"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="about">
        <div className="wrap">
          <div className="section-head">
            <div className="index">01 / About</div>
            <div>
              <h2>Finance + analytics profile</h2>
              <div className="lead">Capital-markets experience combined with graduate work in valuation, markets, modeling, risk, analytics, and strategy.</div>
            </div>
          </div>
          <div className="about-grid">
            <div className="panel">
              <p>I am an MBA candidate in Finance &amp; Business Analytics at the University of Delaware, focused on building a career in capital markets, investment banking, FP&amp;A, financial analysis, and business analytics.</p>
              <p>My professional identity sits at the intersection of finance, analytics, and capital markets operations. I bring 2+ years of financial operations experience supporting Morgan Stanley as a client, with exposure to securities lending, cash and position reconciliation, post-trade break resolution, settlement exceptions, treasury funding, wire validation, DTCC workflows, and mainframe systems.</p>
              <p>Through coursework and applied projects, I have developed hands-on experience in financial modeling, DCF and FCFE valuation, CAPM, comparable multiples, ETF market structure, momentum strategies, regression analysis, operations simulation, data workflows, and AI strategy.</p>
            </div>
            <div className="panel soft">
              <h3>Focus areas</h3>
              <p>Capital Markets · Financial Analysis · Financial Modeling · Risk &amp; Operations · Business Analytics · Research</p>
              <h3>Professional direction</h3>
              <p>Roles where finance knowledge, analytical tools, and operational discipline can improve decision-making, risk visibility, and business performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities">
        <div className="wrap">
          <div className="section-head">
            <div className="index">02 / Capabilities</div>
            <div><h2>Core capabilities</h2><div className="lead">A concise view of the finance and analytical work I can perform.</div></div>
          </div>
          <div className="cap-grid">
            <div className="cap"><h3>Financial Analysis</h3><p>Valuation, forecasting, NPV, scenario analysis, performance interpretation and decision support.</p></div>
            <div className="cap"><h3>Capital Markets</h3><p>ETF structure, securities operations, settlement, funding, liquidity, reconciliation and market-data analysis.</p></div>
            <div className="cap"><h3>Modeling &amp; Analytics</h3><p>Pro forma modeling, regression, predictive analytics, simulation, workflow automation and dashboards.</p></div>
            <div className="cap"><h3>Risk &amp; Operations</h3><p>Break resolution, transaction validation, operational controls, funding exposure, reporting and process improvement.</p></div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="wrap">
          <div className="section-head"><div className="index">03 / Skills</div><div><h2>Finance &amp; technical skills</h2></div></div>
          <div className="skills-grid">
            <div className="panel skill"><h3>Finance</h3><div className="chips">{["Financial Modeling","DCF / FCFE","CAPM","Comparable Analysis","Capital Markets","Financial Analysis","Risk Management","Reconciliation","Settlement Operations"].map((x) => <span className="chip" key={x}>{x}</span>)}</div></div>
            <div className="panel skill"><h3>Analytics</h3><div className="chips">{["Python","R / RStudio","SQL","SAS","Power BI","Tableau","Alteryx","Qlik Sense"].map((x) => <span className="chip" key={x}>{x}</span>)}</div></div>
            <div className="panel skill"><h3>Platforms</h3><div className="chips">{["Bloomberg Terminal","Advanced Excel","VBA / Macros","DTCC","Mainframe Systems","SafeCash","Qwest","CTS","T3C","MIS"].map((x) => <span className="chip" key={x}>{x}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="wrap">
          <div className="section-head"><div className="index">04 / Experience</div><div><h2>Professional experience</h2></div></div>
          <div className="exp-grid">
            <div className="meta">eClerx Services Ltd.<br/>Client: Morgan Stanley<br/><br/>Feb 2022 – Apr 2024<br/>Mumbai, India</div>
            <div>
              <h3>Financial Analyst</h3>
              <strong>Middle Office Reconciliation · Securities Lending &amp; Prime Brokerage</strong>
              <ul>
                <li>Performed daily cash and position reconciliation across 20+ accounts, resolving aged balance and position breaks across bonds, cash, and derivative accounts.</li>
                <li>Investigated and cleared 10–30 breaks per day through trade-level research, transaction matching, DTCC workflows, internal post-trade systems, and mainframe tools.</li>
                <li>Executed and validated high-value wire transfers of $200M–$500M per day across domestic and international accounts while meeting T+0 / same-day deadlines.</li>
                <li>Monitored market exposure and funding risk, including secured funding and treasury reporting using Excel and VBA.</li>
                <li>Supported Prime Brokerage Billing through client-charge processing, journal posting, and fee validation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="wrap">
          <div className="section-head">
            <div className="index">05 / Projects</div>
            <div>
              <h2>Selected projects &amp; research</h2>
              <div className="lead">Each case study shows the question, methodology, analytical work, conclusion, and a real visual from the underlying deliverable.</div>
            </div>
          </div>

          <div className="filterbar">
            {categories.map((category) => (
              <button
                className={`filter ${filter === category ? "active" : ""}`}
                key={category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((p) => (
              <button className="project-card" key={p.id} onClick={() => setActiveProject(p)}>
                <div className="project-thumb">
                  {p.previewImage.endsWith(".pdf") ? (
                    <iframe src={`${p.previewImage}#page=1&toolbar=0&navpanes=0`} title="" tabIndex={-1} aria-hidden="true" />
                  ) : (
                    <Image src={p.previewImage} alt={`${p.title} preview`} width={900} height={560} />
                  )}
                </div>
                <div className="project-body">
                  <div className="tag">{p.category}</div>
                  <h3>{p.title}</h3>
                  <p>{p.problem}</p>
                  <div className="project-link">Explore case study →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership">
        <div className="wrap">
          <div className="section-head"><div className="index">06 / Leadership</div><div><h2>Leadership &amp; volunteering</h2></div></div>
          <div className="leadership-grid">
            <div className="panel soft">
              <h3>Head of Marketing Department</h3>
              <p><strong>Mulund College Of Commerce</strong><br/>Jun 2015 – Dec 2017 · Arts and Culture</p>
              <ul>
                <li>Led a 15-member team managing end-to-end event marketing, sponsor acquisition, stakeholder communication, and campaign execution for large-scale college festivals.</li>
                <li>Secured INR 10,00,000 (~USD 12,000) in sponsorships through proposal pitching, vendor negotiation, and relationship management with multinational brands including Doritos, Red Bull, Nestlé, and Oxemberg.</li>
                <li>Managed sponsorship pipeline, budget coordination, and marketing timelines for events with 1,000+ attendees.</li>
              </ul>
            </div>
            <Image src="/profile/leadership.jpg" alt="Swapnil Tungare speaking at a college event" width={1100} height={800} />
          </div>
        </div>
      </section>

      <section id="credentials">
        <div className="wrap">
          <div className="section-head"><div className="index">07 / Credentials</div><div><h2>Education &amp; certifications</h2></div></div>
          <div className="credentials">
            <div className="panel soft">
              <h3>Education</h3>
              <p><strong>University of Delaware — Lerner College of Business &amp; Economics</strong><br/>MBA, Finance &amp; Business Analytics (STEM)<br/>Expected Dec 2026</p>
              <p><strong>University of Mumbai</strong><br/>Master of Commerce, Business Management — May 2020<br/>Bachelor of Commerce, Financial Markets — May 2018</p>
            </div>
            <div className="panel">
              <h3>Certifications</h3>
              {[
                ["Bloomberg Essentials","Forage AI","Feb 2026"],
                ["Alteryx Designer Core Certified","Alteryx","Mar 2026"],
                ["Goldman Sachs Operations Job Simulation","Forage","Feb 2026"],
                ["Goldman Sachs Risk Job Simulation","Forage","Feb 2026"],
              ].map(([title, issuer, date]) => (
                <div className="credential-row" key={title}>
                  <strong>{title}</strong>
                  <span>{issuer} · {date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinanceLab />

      <footer>
        <div className="wrap">© {new Date().getFullYear()} Swapnil Tungare · Finance &amp; Analytics Portfolio</div>
      </footer>

      <UtilityModal open={introOpen} onClose={() => setIntroOpen(false)}>
        <div className="tag">Introduction</div>
        <h3>Professional introduction video</h3>
        <p className="lead">Video slot reserved. Your final 3–5 minute professional introduction will be embedded here without autoplay.</p>
      </UtilityModal>

      <UtilityModal open={contactOpen} onClose={() => setContactOpen(false)}>
        <div className="tag">Contact</div>
        <h3>Get in touch</h3>
        <p className="lead">For recruiting, networking, project discussions, or interview follow-up.</p>
        <div className="contact-lines">
          <div className="contact-line"><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
          <div className="contact-line"><span>Phone</span><a href={site.phoneHref}>{site.phoneDisplay}</a></div>
          <div className="contact-line"><span>LinkedIn</span><a href={site.linkedin} target="_blank" rel="noopener noreferrer">Open profile ↗</a></div>
        </div>
      </UtilityModal>

      {activeProject && <ProjectPreview project={activeProject} onClose={() => setActiveProject(null)} />}
    </>
  );
}
