import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";
import { useRef } from "react";

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 650;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "right"
          ? currentScroll + scrollAmount
          : currentScroll - scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="py-20 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-terminal-green mb-6">
            $ ls ~/projects/
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Projects</h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full"
      >
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary/40 transition-all duration-300 cursor-pointer -ml-16"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex gap-6 min-w-min">
              {/* First Project */}
              <div className="flex-shrink-0 w-[550px] snap-start">
                <LinuxWindow title="~/projects/anatom/README.md" className="h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        Web Analytics Dashboard
                      </h3>
                      <div className="font-mono text-xs text-muted-foreground">Apr 2025 – Jun 2025</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      A full-stack application built with Flask and Django, integrating MySQL and PostgreSQL
                      for scalable data storage. Optimized for high-concurrency environments with secure
                      backend logic and real-time data integrity.
                    </p>

                    <div>
                      <h4 className="font-mono text-sm text-terminal-cyan mb-3">## Key Outcomes</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { metric: "-40%", label: "Backend data retrieval latency" },
                          { metric: "100%", label: "Data integrity during real-time updates" },
                          { metric: "2", label: "Database systems integrated" },
                          { metric: "Full-stack", label: "Flask + Django architecture" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="p-3 rounded bg-secondary/50 border border-border"
                          >
                            <div className="text-xl font-bold text-primary">{item.metric}</div>
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-sm text-terminal-cyan mb-3">## Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Python", "Flask", "Django", "MySQL", "PostgreSQL", "REST API"].map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </LinuxWindow>
              </div>

              {/* New Project: Job Market Analytics Platform */}
              <div className="flex-shrink-0 w-[550px] snap-start">
                <LinuxWindow title="~/projects/job-market-analytics/README.md" className="h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        Job Market Analytics Platform
                      </h3>
                      <div className="font-mono text-xs text-muted-foreground">Jun 2025 – Present</div>
                    </div>

                    <div>
                      <ul className="list-disc ml-5 text-muted-foreground leading-relaxed">
                        <li>Architected multi-source data extraction pipeline using Selenium and Scrapy, successfully ingesting 50,000+ live job listings with 100% collection density.</li>
                        <li>Designed a relational database schema that eliminated 99.8% of duplicate records to enforce data integrity.</li>
                        <li>Optimized backend SQL queries to achieve sub-second response times (&lt;0.5s) on 50,000+ records, facilitating real-time analytics streaming.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-sm text-terminal-cyan mb-3">## Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Python",
                          "Selenium",
                          "Scrapy",
                          "SQL",
                          "Relational Database",
                          "Real-time Analytics",
                        ].map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </LinuxWindow>
              </div>

              {/* Second Project */}
              <div className="flex-shrink-0 w-[550px] snap-start">
                <LinuxWindow title="~/projects/ai-chat-interface/README.md" className="h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        AI Chat Interface
                      </h3>
                      <div className="font-mono text-xs text-muted-foreground">View on GitHub</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      A modern AI-powered chat interface providing seamless conversation with advanced language models.
                      Built with a focus on user experience, real-time messaging, and intuitive design patterns.
                    </p>

                    <div>
                      <h4 className="font-mono text-sm text-terminal-cyan mb-3">## Key Features</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { feature: "AI-Powered", label: "Intelligent chat responses" },
                          { feature: "Real-time", label: "Instant message delivery" },
                          { feature: "Responsive", label: "Mobile & desktop support" },
                          { feature: "Multi-API", label: "1B+ tokens/month combined APIs" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="p-3 rounded bg-secondary/50 border border-border hover:border-terminal-green/50 transition-colors"
                          >
                            <div className="text-sm font-bold text-primary">{item.feature}</div>
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-sm text-terminal-cyan mb-3">## Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "React", "Node.js", "API Integration", "Real-time Communication"].map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <a
                        href="https://github.com/kaushal27-glitch/AI-chat-Interface"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-terminal-green hover:text-terminal-cyan transition-colors"
                      >
                        <span className="font-mono text-sm">$ git clone</span>
                        <span className="text-xs">→ GitHub Repository</span>
                      </a>
                    </div>
                  </div>
                </LinuxWindow>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary/40 transition-all duration-300 cursor-pointer -mr-16"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
    </section>
  );
};

export default ProjectsSection;
