import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";

const ProjectsSection = () => {
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LinuxWindow title="~/projects/anatom/README.md" className="max-w-4xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  ANATOM – AI-Ready E-commerce Architecture
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
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
