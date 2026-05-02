import { motion } from "framer-motion";
import { Terminal, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPenguin from "@/assets/hero-penguin.png";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const command = "whoami";
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    if (typed.length < command.length) {
      const timeout = setTimeout(() => {
        setTyped(command.slice(0, typed.length + 1));
      }, 150 + Math.random() * 100);
      return () => clearTimeout(timeout);
    } else {
      setDoneTyping(true);
    }
  }, [typed]);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay z-10" />
      
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img src={heroPenguin} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      <div className="container relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-sm text-terminal-green mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>kaushal@portfolio:~$</span>
              <span className="text-foreground">{typed}</span>
              <span className={`terminal-cursor text-terminal-green ${doneTyping ? '' : 'opacity-100'}`}>▋</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kaushal G
          </motion.h1>

          <motion.div
            className="font-mono text-lg md:text-xl text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Data Analyst | AI/ML Engineer
          </motion.div>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Performance-driven analyst transforming complex datasets into actionable insights
            using Python, SQL, and machine learning. Building scalable systems from Bangalore.
          </motion.p>

          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="terminal" size="lg" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 font-mono text-xs text-muted-foreground space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p><span className="text-terminal-cyan">Python</span> · <span className="text-terminal-amber">SQL</span> · <span className="text-terminal-green">ML</span> · <span className="text-terminal-purple">Flask</span> · <span className="text-terminal-red">Power BI</span></p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-5 h-5 text-primary" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
