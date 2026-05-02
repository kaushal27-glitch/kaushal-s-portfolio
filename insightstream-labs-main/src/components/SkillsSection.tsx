import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";

const skillCategories = [
  {
    title: "AI / ML & Analytics",
    file: "ml-analytics.pkg",
    color: "terminal-cyan",
    skills: [
      { name: "Predictive Modeling", level: 85 },
      { name: "EDA", level: 90 },
      { name: "NumPy & Pandas", level: 90 },
      { name: "R", level: 60 },
    ],
  },
  {
    title: "Programming & Backend",
    file: "backend.pkg",
    color: "terminal-green",
    skills: [
      { name: "Python (OOP)", level: 90 },
      { name: "Flask", level: 80 },
      { name: "Django", level: 75 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    title: "Databases",
    file: "databases.pkg",
    color: "terminal-amber",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "SQLite", level: 80 },
    ],
  },
  {
    title: "Tools & DevOps",
    file: "tools.pkg",
    color: "terminal-purple",
    skills: [
      { name: "Power BI", level: 75 },
      { name: "Advanced Excel", level: 85 },
      { name: "Git & GitHub", level: 80 },
      { name: "Automation", level: 80 },
    ],
  },
];

const colorMap: Record<string, string> = {
  "terminal-cyan": "bg-terminal-cyan",
  "terminal-green": "bg-terminal-green",
  "terminal-amber": "bg-terminal-amber",
  "terminal-purple": "bg-terminal-purple",
};

const SkillBar = ({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) => (
  <motion.div
    className="space-y-1"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
  >
    <div className="flex justify-between font-mono text-xs">
      <span className="text-foreground">{name}</span>
      <span className="text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${colorMap[color] || "bg-primary"}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-terminal-green mb-6">
            $ apt list --installed
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <LinuxWindow title={`~/packages/${cat.file}`}>
                <h3 className="font-semibold text-foreground mb-4">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.skills.map((skill, j) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={j * 0.1}
                    />
                  ))}
                </div>
              </LinuxWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
