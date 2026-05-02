import { Terminal } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 bg-card/30">
    <div className="container text-center space-y-2">
      <div className="flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground">
        <Terminal className="w-3 h-3 text-primary" />
        <span>© 2025 Kaushal G. All rights reserved.</span>
      </div>
      <p className="font-mono text-xs text-muted-foreground/60">
        Built with passion · Powered by data · Themed after Linux
      </p>
    </div>
  </footer>
);

export default Footer;
