import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

const ConclusionSection = () => {
  const socialLinks = [
    { icon: Github, label: "Github", href: "https://github.com/kaushal27-glitch" },
    { icon: Linkedin, label: "Linkedin", href: "www.linkedin.com/in/kaushalg718"},
    { icon: Mail, label: "Email", href: "mailto:kaushalg718@gmail.com" },
    { icon: MapPin, label: "Location", href: "#" },
  ];

  const socialIcons = [
    { label: "Instagram", href: "https://www.instagram.com/kaushhhalll/" },
    { label: "Twitter / X", href: "https://x.com/KaushalG366276" },
  ];

  return (
    <section className="py-20 border-t border-border bg-background/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 max-w-5xl"
        >
          {/* Left Side - Conclusion Message */}
          <div className="flex flex-col justify-center">
            <p className="text-base leading-relaxed text-foreground/90 mb-6">
              <span className="text-lg">Thank you for taking the time to visit my website!</span> I truly{" "}
              <span className="text-terminal-green italic font-semibold">appreciate</span> your interest and support. It
              means a lot to me to share my journey, skills, and passions with you. I hope you found the information
              insightful and engaging. If you have any{" "}
              <span className="text-terminal-green italic font-semibold">questions or feedback</span>, please feel free to reach out.
              Your visit is invaluable, and I look forward to connecting with you further.
            </p>
            <p className="text-terminal-green italic text-lg font-semibold">Contact me anytime.</p>
          </div>

          {/* Right Side - Social Links */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8">
              {/* Top Row */}
              <div className="space-y-6">
                {socialIcons.map((item, index) => (
                  <div key={index}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-terminal-green transition-colors text-sm font-mono"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="space-y-6">
                {socialLinks.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-terminal-green transition-colors text-sm font-mono"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider Line */}
        <div className="mt-12 h-px bg-border"></div>
      </div>
    </section>
  );
};

export default ConclusionSection;
