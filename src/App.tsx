import { useEffect, useRef, useState, type FormEvent } from "react";
import "./App.css";
import heroImage from "./assets/hero.png";

const L = {
  email: "navindu691@gmail.com",
  linkedin: "https://www.linkedin.com/in/navindu-ranasinghe-a7b287329/",
  github: "https://github.com/NavinduRanasinghe691",
};
const dv = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}.svg`;
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const SKILLS: [string, string][] = [
  ["Java", "java/java-original"], ["Python", "python/python-original"], ["JavaScript", "javascript/javascript-original"],
  ["TypeScript", "typescript/typescript-original"], ["React", "react/react-original"], ["Next.js", "nextjs/nextjs-original"],
  ["Spring Boot", "spring/spring-original"], ["ASP.NET Core", "dotnetcore/dotnetcore-original"], ["MySQL", "mysql/mysql-original"],
  ["SQL Server", "microsoftsqlserver/microsoftsqlserver-original"], ["MongoDB", "mongodb/mongodb-original"], ["Git", "git/git-original"],
  ["GitHub", "github/github-original"], ["Figma", "figma/figma-original"], ["Flutter", "flutter/flutter-original"], ["Dart", "dart/dart-original"],
  ["PHP", "php/php-original"], ["C#", "csharp/csharp-original"], ["Laravel", "laravel/laravel-original"], ["Node.js", "nodejs/nodejs-original"],
  ["Firebase", "firebase/firebase-original"], ["Docker", "docker/docker-original"], ["Postman", "postman/postman-original"], ["Bootstrap", "bootstrap/bootstrap-original"],
  ["HTML5", "html5/html5-original"], ["CSS3", "css3/css3-original"], ["VS Code", "vscode/vscode-original"], ["Android Studio", "androidstudio/androidstudio-original"],
];

const CREATIVE: Record<string, string[]> = {
  Design: ["Figma", "Adobe Photoshop", "CorelDRAW", "Canva", "Adobe Lightroom"],
  Video: ["Adobe Premiere Pro", "DaVinci Resolve", "CapCut"],
  Audio: ["Adobe Audition", "FL Studio", "Ableton Live", "Audacity"],
  Data: ["Microsoft Excel", "Power BI"],
};
const INTERESTS = ["Acoustic guitar", "Classical & instrumental music", "Music production", "Photography", "Video editing", "Travel & content creation", "Gaming", "Graphic design", "Exploring new technologies"];

const PROJECTS = [
  ["MYTOUR Buddy", "Full-stack project", "A tourism platform connecting tourists with local tour guides in Sri Lanka.", "Next.js, Spring Boot, MongoDB, JWT, REST API, Postman, Git"],
  ["ApexHire", "Full-stack project", "A recruitment platform for candidates, recruiters, hiring managers and administrators.", "React, ASP.NET Core Web API, SQL Server, JWT, Swagger, Postman"],
  ["CoreConnect", "UI/UX · Concept", "A healthcare appointment-booking interface focused on the patient experience.", "Figma, Prototyping, HCI"],
  ["RDMNS Train App Redesign", "UI/UX · Redesign concept", "A redesign focused on live train alerts and the railway passenger experience.", "Figma, Prototyping, HCI"],
  ["RDBMS Project", "Academic project", "A relational database project covering ER diagrams, modelling and SQL.", "SQL, ER diagrams, Relational modelling"],
  ["Boarding Finder", "Mobile · Concept", "An idea to help students find boarding and accommodation.", "Tech stack to be confirmed"],
  ["SunSide", "Mobile · Concept", "Helps bus passengers in Sri Lanka find the side with less direct sunlight.", "Flutter, Dart (proposed)"],
  ["MOH & PHI Connect", "Mobile · In progress", "Digital workflows for Medical Officers of Health, Public Health Inspectors and school health programmes.", "Flutter, Dart"],
  ["Code Game", "Mobile · In progress", "Game-like coding practice to make learning programming more interactive.", "Flutter"],
  ["Teddy & Gift Heaven", "E-commerce · In progress", "An online shop for gift-related products.", "Tech stack to be confirmed"],
];

const CODE = `<section id="work">
const build = () => ideas
GET /api/tours
POST /api/auth/login
@PreAuthorize("ROLE_GUIDE")
JWT + RBAC
SELECT * FROM jobs;
<Route path="/apply" />
flutter run
git commit -m "ship"
`;

const Logo = () => (
  <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8570f" /><stop offset="1" stopColor="#ffb347" /></linearGradient></defs>
    <path d="M12 54V12h10l20 26V12h10v42H42L22 28v26z" fill="url(#g)" />
  </svg>
);


const Split = ({ t, start = 0 }: { t: string; start?: number }) => (
  <>{[...t].map((c, i) => <span key={i} className="ch" aria-hidden="true" style={{ ["--i" as string]: i + start }}>{c === " " ? "\u00a0" : c}</span>)}</>
);

const PROBLEM = ["Tourists struggle to find trusted local guides.", "Hiring involves several roles that each need a different view.", "Booking a doctor can be confusing for patients.", "Travellers need timely train information that is easy to read.", "Data needs a structure that stays consistent and easy to query.", "Finding boarding places with clear details is hard.", "Bus passengers on long trips often sit in direct sun.", "Public health fieldwork needs organised, accessible tools.", "Learning to code can feel dull without practice.", "Gift shoppers want to browse by occasion and see products clearly."];

function CaseStudy({ i, onClose }: { i: number; onClose: () => void }) {
  const [t, tag, d, tech] = PROJECTS[i];
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden"; addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", k); };
  }, [onClose]);
  const out = tag.includes("In progress") ? "In progress. No results, deployment or validated functionality is claimed." : tag.includes("UI/UX") ? "Design concept created in Figma. Design only, not a coded application." : tag.includes("Concept") ? "Concept stage. Not yet built." : tag.includes("Full-stack") ? "Built as a full-stack project. See my GitHub for the code." : "Completed as an academic project.";
  const rows = [["The Problem", PROBLEM[i]], ["The Idea", d], ["The Design", tag], ["The Development", tech], ["The Outcome", out]];
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={t} onClick={onClose}>
      <article className="glass" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close case study">×</button>
        <small className="tag">{tag}</small><h2>{t}</h2>
        {rows.map(([h, x], n) => <div key={h} className="cs" style={{ animationDelay: `${n * 90}ms` }}><span>{n + 1}</span><div><h4>{h}</h4><p>{x}</p></div></div>)}
      </article>
    </div>
  );
}

function Intro({ leaving, onDone }: { leaving: boolean; onDone: () => void }) {
  const [st, setSt] = useState(0);
  useEffect(() => {
    const t = [setTimeout(() => setSt(1), 1600), setTimeout(() => setSt(2), 3500), setTimeout(() => setSt(3), 5300)];
    return () => t.forEach(clearTimeout);
  }, []);
  return (
    <div className={`intro${leaving ? " out" : ""}`} role="dialog" aria-label="Introduction">
      <img className="intro-bg" src={publicAsset("navindu.jpg")} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
      <i className="bar-t" /><i className="bar-b" /><div className="grain" /><div className="beam" />
      <button className="skip" onClick={onDone}>Skip intro</button>
      <svg className="n-draw" width="110" height="110" viewBox="0 0 64 64" aria-hidden="true">
        <defs><linearGradient id="gi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6a1a" /><stop offset="1" stopColor="#ffb347" /></linearGradient></defs>
        <path pathLength={100} d="M14 54V16C14 9 24 8 28 14L42 40C46 47 50 50 50 42V10" fill="none" stroke="url(#gi)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="i-text" aria-live="polite">
        {st === 1 && <p key="a" className="i-line">Every great product<br />starts with a problem.</p>}
        {st === 2 && <p key="b" className="i-line">And every solution<br />starts with curiosity.</p>}
        {st >= 3 && (
          <div key="c" className="i-line">
            <h1>NAVINDU RANASINGHE</h1>
            <p className="i-roles">Full-Stack Developer · Frontend Developer · UI/UX Designer</p>
            <button className="btn gold" onClick={onDone}>Enter portfolio ↗</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => { try { return localStorage.getItem("theme") !== "light"; } catch { return true; } });
  const [cs, setCs] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [intro, setIntro] = useState(() => {
    try { return !sessionStorage.getItem("introSeen") && !matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return true; }
  });
  const [leaving, setLeaving] = useState(false);
  const progRef = useRef<HTMLDivElement>(null);
  const [hasCv, setHasCv] = useState(false);
  const finish = () => {
    try { sessionStorage.setItem("introSeen", "1"); } catch { /* ignore */ }
    setLeaving(true); setTimeout(() => setIntro(false), 800);
  };
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { /* ignore */ } }, [dark]);
  useEffect(() => {
    fetch(publicAsset("cv.pdf"), { method: "HEAD" }).then((r) => setHasCv(r.ok && (r.headers.get("content-type") || "").includes("pdf"))).catch(() => setHasCv(false));
  }, []);
  useEffect(() => { document.body.style.overflow = intro ? "hidden" : ""; if (!intro) document.documentElement.dataset.ready = "1"; }, [intro]);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("section h2, .about-copy, .about-art, .facts, .steps li, .entry, .dim, .tool, .skills-copy, .tiles li, .card, .contact form, .reel");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((el, i) => { el.classList.add("rv"); el.style.transitionDelay = `${(i % 6) * 70}ms`; io.observe(el); });
    const sc = () => { if (progRef.current) progRef.current.style.transform = `scaleX(${scrollY / Math.max(1, document.body.scrollHeight - innerHeight)})`; };
    let raf = 0; let last: MouseEvent | null = null;
    const mm = (e: MouseEvent) => { last = e; if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (last) mmRaw(last); }); };
    const mmRaw = (e: MouseEvent) => {
      const r = document.documentElement.style;
      r.setProperty("--mx", String(e.clientX / innerWidth - 0.5)); r.setProperty("--my", String(e.clientY / innerHeight - 0.5)); r.setProperty("--cx", e.clientX + "px"); r.setProperty("--cy", e.clientY + "px");
      const b = (e.target as HTMLElement).closest?.(".btn") as HTMLElement | null;
      if (b && matchMedia("(pointer:fine)").matches) { const q = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - q.left - q.width / 2) * 0.15}px ${(e.clientY - q.top - q.height / 2) * 0.25}px`; }
    };
    const rs = () => document.querySelectorAll<HTMLElement>(".btn").forEach((b) => (b.style.translate = ""));
    const links = document.querySelectorAll<HTMLElement>(".nav nav a");
    const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`)); }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((x) => sio.observe(x));
    addEventListener("scroll", sc, { passive: true }); addEventListener("mousemove", mm); addEventListener("mouseout", rs);
    return () => { io.disconnect(); sio.disconnect(); cancelAnimationFrame(raf); removeEventListener("scroll", sc); removeEventListener("mousemove", mm); removeEventListener("mouseout", rs); };
  }, []);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    window.location.href = `mailto:${L.email}?subject=${encodeURIComponent(d.subject || "Portfolio enquiry")}&body=${encodeURIComponent(`${d.message}\n\n${d.name} (${d.email})`)}`;
  };

  return (
    <>
      {intro && <Intro leaving={leaving} onDone={finish} />}
      <div className="prog" ref={progRef} />
      <div className="spot" />
      <header className="nav">
        <a href="#home" className="brand"><Logo /><span>Navindu</span></a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <nav className={open ? "open" : ""}>
          {["Home", "About", "Skills", "Projects", "Contact"].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>
          ))}
        </nav>
        <div className="nav-right">
          <button className="toggle" aria-label="Toggle dark mode" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? "☾" : "☀"}</button>
          {hasCv && <a className="btn dark cv" href={publicAsset("cv.pdf")} download>Download CV</a>}
        </div>
      </header>

      <main>
        <section id="home" className="hero3">
          <div className="split">
            <div className="wordcol l">
              <h2>designer</h2>
              <p>Product designer focused on UI/UX, wireframing, prototyping and branding with Figma, Photoshop and Canva.</p>
            </div>
            <figure className="arch">
              <span className="ghost-n" aria-hidden="true">N</span>
              <img src={heroImage} alt="Navindu Ranasinghe standing in a cave opening, looking out over Sri Lankan hills" width="900" height="1600" decoding="async" onError={(e) => (e.currentTarget.style.display = "none")} />
              <i className="paint" aria-hidden="true" />
              <div className="codefx" aria-hidden="true"><pre>{CODE + CODE}</pre></div>
            </figure>
            <div className="wordcol r">
              <h2>&lt;coder&gt;</h2>
              <p>Full-stack developer building web and mobile apps, REST APIs and database-driven solutions with React, Next.js, Spring Boot and ASP.NET Core.</p>
            </div>
          </div>
          <div className="hero-id hero-copy">
            <p className="pill"><i /> Available for Internship</p>
            <p className="hi">Hi, I’m</p>
            <h1 aria-label="Navindu J. Ranasinghe"><Split t="Navindu" /> <em><Split t="J. Ranasinghe" start={7} /></em></h1>
            <p className="role">Computer Science Undergraduate <span>|</span> Aspiring Full-Stack Developer</p>
            <div className="cta">
              <a className="btn dark" href="#projects">View My Projects →</a>
              <a className="btn line" href="#contact">✉ Contact Me</a>
            </div>
            <div className="social">
              <a href={L.github} aria-label="GitHub" target="_blank" rel="noreferrer"><img src={dv("github/github-original")} alt="" width="24" height="24" className="ico" /></a>
              <a href={L.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><img src={dv("linkedin/linkedin-original")} alt="" width="24" height="24" /></a>
              <a href={`mailto:${L.email}`} aria-label="Email"><span aria-hidden="true">✉</span></a>
            </div>
            <div className="now"><small>Currently</small><b>BSc (Hons) Computer Science</b><span>NSBM Green University · GPA 3.80 / 4.00</span></div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="about-art">
            <img src={publicAsset("navindu.jpg")} alt="" width="320" height="380" loading="lazy" decoding="async" onError={(e) => (e.currentTarget.style.display = "none")} />
            <div className="glass uni a1"><b>NSBM</b> Green University</div>
            <div className="glass uni a2"><small>BSc (Hons)</small> Computer Science</div>
            <span className="script">Keep Growing</span>
          </div>
          <div className="about-copy">
            <span className="pill small">About Me</span>
            <h2>Let’s Know <em>About Me</em></h2>
            <p>I’m a Computer Science undergraduate at NSBM Green University with a passion for full-stack software development and creative technology. I enjoy building practical digital solutions with modern web and mobile technologies while exploring UI/UX design and multimedia creation. I’m continuously learning and looking for opportunities to grow as a Software Engineer.</p>
            <ul className="traits">
              <li><b>Problem Solver</b><small>Finds creative solutions</small></li>
              <li><b>Team Player</b><small>Better together</small></li>
              <li><b>Quick Learner</b><small>Always growing</small></li>
            </ul>
          </div>
          <aside className="facts glass">
            <div><small>Studying since</small><b>February 2025</b></div>
            <div><small>GPA</small><b>3.80 / 4.00</b></div>
            <div><small>Location</small><b>Kurunegala, Sri Lanka</b></div>
            <span className="script">Same Dream, Bigger Goals</span>
          </aside>
        </section>

        <section id="skills" className="skills">
          <div className="skills-copy">
            <span className="pill small">My Skills</span>
            <h2>Technologies I <em>Work With</em></h2>
            <p>These are the tools and technologies I use to build modern and scalable applications.</p>
            <button className="btn line" onClick={() => setAll(!all)}>{all ? "Show Less" : "View All Skills"} →</button>
          </div>
          <ul className="tiles">
            {(all ? SKILLS : SKILLS.slice(0, 14)).map(([n, p]) => (
              <li key={n}><img src={dv(p)} alt="" width="36" height="36" loading="lazy" /><span>{n}</span></li>
            ))}
          </ul>
        </section>

        <section id="creative" className="creative">
          <span className="pill small">Developer · Designer · Creator</span>
          <h2>Three sides of <em>one builder</em></h2>
          <div className="dims">
            {[["Developer", "Building web applications, APIs, backend systems, mobile apps and database-driven solutions."], ["Designer", "UI/UX design, product interfaces, branding, typography and visual communication."], ["Creator", "Music, photography, video editing and digital storytelling as a creative strength."]].map(([h, t]) => (
              <article key={h} className="dim"><h3>{h}</h3><p>{t}</p></article>
            ))}
          </div>
          <h3 className="sub">Creative toolkit</h3>
          <div className="tools">
            {Object.entries(CREATIVE).map(([k, v]) => <div key={k} className="tool"><b>{k}</b><ul>{v.map((x) => <li key={x}>{x}</li>)}</ul></div>)}
          </div>
          <h3 className="sub">Beyond code</h3>
          <ul className="chips2">{INTERESTS.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="muted">YouTube: Navindu J Ranasinghe</p>
        </section>

        <section className="reel" aria-label="Showreel">
          <div className="reel-track" aria-hidden="true">
            {[...PROJECTS, ...PROJECTS].map(([t], i) => <span key={i}>{t}</span>)}
          </div>
          <p className="sr">Showreel of project titles</p>
        </section>

        <section id="projects" className="projects">
          <span className="pill small">Projects</span>
          <h2>Things I’ve <em>Built & Designed</em></h2>
          <p className="muted">Each project is labelled as full-stack, design, concept or in progress.</p>
          <div className="grid">
            {PROJECTS.map(([t, tag, d, tech], i) => (
              <button key={t} className="card" onClick={() => setCs(i)}>
                <small className="tag">{tag}</small><h3>{t}</h3><p>{d}</p><p className="tech">{tech}</p><span className="go">View case study ↗</span>
              </button>
            ))}
          </div>
        </section>

        <section id="process" className="process">
          <span className="pill small">The Process</span>
          <h2>How I <em>Work</em></h2>
          <ol className="steps">
            {[["Discover", "Understand the user, the problem and the requirements."], ["Design", "Create wireframes, prototypes and thoughtful user experiences."], ["Develop", "Build responsive applications, APIs and database integrations."], ["Improve", "Test, debug, receive feedback and keep improving."]].map(([h, t], i) => (
              <li key={h}><span>{i + 1}</span><h3>{h}</h3><p>{t}</p></li>
            ))}
          </ol>
        </section>

        <section id="experience" className="exp">
          <span className="pill small">Experience</span>
          <h2>Experience &amp; <em>Education</em></h2>
          <div className="cols">
            <div>
              <div className="entry"><b>Brand &amp; Labeling Designer</b><span>Baburugama Ayurvedic Medicine · Oct 2025 – Present</span><p>Design product labels and branding materials in Sinhala, Tamil and English, working with typography, colours and layouts to support product presentation.</p></div>
              <div className="entry"><b>BSc (Hons) Computer Science</b><span>NSBM Green University · Feb 2025 – Present · GPA 3.80 / 4.00</span><p>Python, Java OOP, Algorithms &amp; Data Structures, Database Management, Web Application Development, Systems Analysis and Design, Data Communication and Networks, Human-Computer Interaction.</p></div>
            </div>
            <div>
              <div className="entry"><b>UNSCRIPTED 1.0 Human Intelligence Hackathon</b><span>May 2026 · Participant &amp; Developer</span><p>Hosted by Generation Alpha, Square Hub and Microsoft.</p></div>
              <div className="entry"><b>Third place, ICT Students Competition</b><span>Divisional level · St. Anne’s College</span></div>
              <div className="entry"><b>Getting Started with Generative AI</b><span>Certificate · Sinhala (native), English (working proficiency)</span></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Let’s build something <em>together</em></h2>
          <p className="muted">Open to full-stack, frontend, software engineering and UI/UX internships. {L.email} · +94 75 423 2767</p>
          <form onSubmit={send}>
            <input name="name" placeholder="Name" required aria-label="Name" />
            <input name="email" type="email" placeholder="Email" required aria-label="Email" />
            <input name="subject" placeholder="Subject" aria-label="Subject" />
            <textarea name="message" rows={4} placeholder="Message" required aria-label="Message" />
            <button className="btn dark">Send Message</button>
          </form>
        </section>
      </main>
      {cs !== null && <CaseStudy i={cs} onClose={() => setCs(null)} />}
      <footer className="credits">
        <Logo />
        <div className="roll"><p>Directed by curiosity</p><p>Designed with purpose</p><p>Built with technology</p></div>
        <h3>Navindu Ranasinghe</h3>
        <p className="muted">Full-Stack Developer · Frontend Developer · UI/UX Designer</p>
        <div className="cl"><a href={L.github} target="_blank" rel="noreferrer">GitHub</a><a href={L.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${L.email}`}>Email</a><a href="#home">Back to top</a></div>
      </footer>
    </>
  );
}
