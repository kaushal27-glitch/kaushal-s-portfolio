import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";
import { Award } from "lucide-react";

const certs = [
  { name: "TCS iON Young Professional", issuer: "TCS" },
  { name: "Git & GitHub", issuer: "Open Source" },
  { name: "Python Certification", issuer: "SoloLearn" },
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Kannada", level: "Native" },
  { name: "Hindi", level: "Fluent" },
  { name: "Tamil", level: "Native" },
  { name: "Telugu", level: "Native" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 bg-card/50">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-mono text-sm text-terminal-green mb-6">$ gpg --list-keys</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Certifications & Languages</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <LinuxWindow title="~/certs/verified.gpg">
              <div className="space-y-4">
                {certs.map((c) => (
                  <div key={c.name} className="flex items-start gap-3 p-3 rounded bg-secondary/30 border border-border">
                    <Award className="w-5 h-5 text-terminal-amber shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{c.issuer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </LinuxWindow>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <LinuxWindow title="~/config/locale.conf">
              <div className="space-y-3">
                {languages.map((l) => (
                  <div key={l.name} className="flex justify-between items-center font-mono text-sm">
                    <span className="text-foreground">{l.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${l.level === "Native" ? "bg-terminal-green/10 text-terminal-green" : "bg-terminal-cyan/10 text-terminal-cyan"}`}>
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </LinuxWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
