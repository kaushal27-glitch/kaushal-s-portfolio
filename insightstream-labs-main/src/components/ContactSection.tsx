import { motion } from "framer-motion";
import LinuxWindow from "./LinuxWindow";
import { Mail, Phone, MapPin, Linkedin, Github, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from 'react';

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send to backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('✅ Message saved to database! I\'ll get back to you soon.');
        // Clear form
        setForm({ name: "", email: "", message: "" });
        // Clear status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setStatusMessage('❌ Error saving message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('❌ Could not connect to server. Make sure backend is running on localhost:5000');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeDownload = () => {
    // Direct download link using the correct path
    const link = document.createElement('a');
    link.href = '/KAUSHALG.CVCV.pdf';
    link.download = 'Kaushal_G_Resume.pdf';
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-mono text-sm text-terminal-green mb-6">$ mail --compose</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Contact</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <LinuxWindow title="~/contact/info.conf">
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "kaushalg718@gmail.com", href: "mailto:kaushalg718@gmail.com", isLocation: false },
                  { icon: Phone, label: "+91 7483481812", href: "tel:+917483481812", isLocation: false },
                  { icon: MapPin, label: "Bengaluru, India", href: "#", isLocation: true },
                  { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/kaushalg718", isLocation: false },
                  { icon: Github, label: "GitHub Profile", href: "https://github.com/kaushal27-glitch", isLocation: false },
                  { icon: X, label: "Twitter/X", href: "https://x.com/KaushalG366276", isLocation: false },
                ].map((item) => 
                  item.isLocation ? (
                    <button
                      key={item.label}
                      onClick={() => setShowLocationPopup(true)}
                      className="flex items-center gap-3 p-2 rounded hover:bg-secondary/50 transition-colors group w-full text-left cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 text-primary group-hover:text-accent" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                    </button>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded hover:bg-secondary/50 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-primary group-hover:text-accent" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                    </a>
                  )
                )}
              </div>
            </LinuxWindow>

            {showLocationPopup && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLocationPopup(false)}>
                <div className="bg-card border border-border rounded p-6 space-y-4 max-w-xs" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-foreground">Location</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">📍 <span className="text-foreground font-semibold">Bengaluru</span></p>
                    <p className="text-sm text-muted-foreground">🌍 <span className="text-foreground font-semibold">India</span></p>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setShowLocationPopup(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <LinuxWindow title="~/contact/compose.sh">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1">NAME=</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
                    placeholder='"Your Name"'
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1">EMAIL=</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
                    placeholder='"your@email.com"'
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1">MESSAGE=</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                    placeholder='"Your message here..."'
                    required
                  />
                </div>
                <Button variant="terminal" type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? '$ sending...' : '$ send --message'}
                </Button>
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-500 rounded p-2 text-xs text-green-400">
                    {statusMessage}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500 rounded p-2 text-xs text-red-400">
                    {statusMessage}
                  </div>
                )}
              </form>
            </LinuxWindow>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2">
            <LinuxWindow title="~/downloads/resume.pdf">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-mono font-bold text-foreground">Kaushal G - Resume</h3>
                    <p className="text-sm text-muted-foreground mt-1">Full stack enthusiast and AI engineer</p>
                  </div>
                  <Download className="w-6 h-6 text-terminal-green" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Download my resume to learn more about my experience, skills, and projects.
                </p>
                <a
                  href="/kaushal-s-portfolio/KAUSHALG.CVCV.pdf"
                  download="KAUSHALG.CVCV.pdf"
                  className="inline-block"
                >
                  <Button variant="terminal" className="w-full">
                    $ download --resume
                  </Button>
                </a>
              </div>
            </LinuxWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
