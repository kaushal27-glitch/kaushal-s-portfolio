import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";
import { Briefcase, TrendingUp } from "lucide-react";

const experiences = [
  {
    title: "Python Data Integration Intern",
    company: "OCTANET Pvt Ltd",
    location: "Bengaluru",
    duration: "Feb 2025 – Mar 2025",
    achievements: [
      "Built and maintained backend API scripts using Python with OOP and advanced exception handling",
      "Improved system uptime by 15%",
      "Created scalable data pipelines using Pandas & NumPy for large datasets",
      "Processed data across SQLite and MySQL databases",
      "Reduced processing time by 30%",
      "Automated workflows saving 20+ hours of manual work weekly",
    ],
    metrics: ["+15% uptime", "-30% processing time", "20+ hrs saved/week"],
  },
  {
    title: "Data Analytics Intern",
    company: "Peenya Industries",
    location: "Bengaluru",
    duration: "Jun 2024 – Aug 2024",
    achievements: [
      "Analyzed multi-industry datasets to identify growth opportunities",
      "Increased identified lead opportunities by 10%",
      "Built predictive models to forecast industry trends",
      "Improved planning accuracy by 20%",
      "Performed deep SQL and Excel analysis on complex industrial datasets",
    ],
    metrics: ["+10% leads", "+20% accuracy"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-terminal-green mb-6">
            $ history | grep work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="relative pl-12 md:pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-3 w-3 h-3 rounded-full bg-primary glow-purple" />

                <LinuxWindow title={`~/work/${exp.company.toLowerCase().replace(/\s+/g, "-")}.log`}>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {exp.company} · {exp.location} · {exp.duration}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.metrics.map((m) => (
                        <span
                          key={m}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10 border border-primary/20 font-mono text-xs text-primary"
                        >
                          <TrendingUp className="w-3 h-3" />
                          {m}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-terminal-green shrink-0">$</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </LinuxWindow>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;