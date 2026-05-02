import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";
import { BarChart3, Brain, Code, Database, Workflow } from "lucide-react";

const services = [
  { icon: BarChart3, title: "Data Analysis & Visualization", desc: "Transform raw data into insights with Power BI, Python, and advanced analytics.", color: "text-terminal-cyan" },
  { icon: Brain, title: "ML Model Development", desc: "Predictive modeling, EDA, and statistical analysis for business intelligence.", color: "text-terminal-green" },
  { icon: Code, title: "Backend API Development", desc: "Scalable REST APIs with Flask/Django, OOP patterns, and secure architecture.", color: "text-terminal-amber" },
  { icon: Workflow, title: "Data Pipeline Automation", desc: "ETL pipelines with Pandas, NumPy, and automated data workflows.", color: "text-terminal-purple" },
  { icon: Database, title: "SQL Database Optimization", desc: "Query optimization, schema design, and multi-database integration.", color: "text-terminal-red" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-mono text-sm text-terminal-green mb-6">$ systemctl list-units --type=service</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Services</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <LinuxWindow title={`${s.title.toLowerCase().replace(/\s+/g, "-")}.service`}>
                <div className="space-y-3">
                  <s.icon className={`w-8 h-8 ${s.color}`} />
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  <div className="font-mono text-xs text-terminal-green">● active (running)</div>
                </div>
              </LinuxWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
