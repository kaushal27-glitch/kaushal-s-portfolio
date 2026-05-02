import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";
import { User, GraduationCap, Target } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-sm text-terminal-green mb-6">
            $ cat about.md
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-10">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LinuxWindow title="~/about/bio.txt">
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-2 text-foreground mb-3">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-semibold">Biography</span>
                </div>
                <p className="leading-relaxed">
                  Performance-driven Data Analyst and aspiring AI/ML Engineer with a BCA and strong
                  expertise in Python, SQL, predictive modeling, and data analytics. I specialize in
                  transforming complex multi-industry datasets into actionable insights using machine
                  learning, statistical analysis, and data engineering techniques.
                </p>
                <p className="leading-relaxed">
                  I've built scalable backend systems, automated ETL pipelines, and developed predictive
                  models to support data-driven decision making across multiple industries.
                </p>
              </div>
            </LinuxWindow>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <LinuxWindow title="~/about/education.conf">
                <div className="flex items-center gap-2 text-foreground mb-3">
                  <GraduationCap className="w-4 h-4 text-terminal-amber" />
                  <span className="font-semibold">Education</span>
                </div>
                <div className="font-mono text-sm space-y-1 text-muted-foreground">
                  <p className="text-foreground">Bachelor of Computer Applications (BCA)</p>
                  <p>AIMS Institute, Bengaluru</p>
                  <p>Graduated: July 2025</p>
                  <p>CGPA: <span className="text-terminal-green">7.29</span></p>
                </div>
              </LinuxWindow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <LinuxWindow title="~/about/goals.sh">
                <div className="flex items-center gap-2 text-foreground mb-3">
                  <Target className="w-4 h-4 text-terminal-cyan" />
                  <span className="font-semibold">Career Goals</span>
                </div>
                <div className="font-mono text-sm space-y-1 text-muted-foreground">
                  <p><span className="text-terminal-green">→</span> AI/ML Engineering roles</p>
                  <p><span className="text-terminal-green">→</span> Data Science & Analytics</p>
                  <p><span className="text-terminal-green">→</span> Scalable Backend Systems</p>
                  <p><span className="text-terminal-green">→</span> Data-driven Decision Making</p>
                </div>
              </LinuxWindow>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
