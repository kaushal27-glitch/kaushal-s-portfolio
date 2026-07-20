import { useState, useEffect, ReactNode, FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Terminal } from "lucide-react";

const SESSION_KEY = "admin_auth";

interface AdminGateProps {
  children: ReactNode;
}

const AdminGate = ({ children }: AdminGateProps) => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setAuthed(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem(SESSION_KEY, data.token);
        setAuthed(true);
      } else if (res.status === 429) {
        setError("Too many attempts. Try again in 15 minutes.");
        setPassword("");
      } else {
        setError("Incorrect password.");
        setPassword("");
      }
    } catch {
      setError("Could not connect to server.");
    } finally {
      setChecking(false);
    }
  };

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Terminal-style window */}
        <div className="linux-window">
          <div className="linux-titlebar">
            <div className="flex gap-1.5">
              <div className="linux-titlebar-dot linux-titlebar-dot-red" />
              <div className="linux-titlebar-dot linux-titlebar-dot-amber" />
              <div className="linux-titlebar-dot linux-titlebar-dot-green" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2 flex items-center gap-1.5">
              <Terminal className="w-3 h-3" /> admin — login required
            </span>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
            </div>

            <p className="text-center font-mono text-xs text-muted-foreground mb-6">
              <span className="text-primary">~/</span>admin is restricted
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter password"
                  autoFocus
                  className="w-full bg-secondary/30 border border-border rounded px-3 py-2 pr-10 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-mono text-destructive"
                >
                  ❌ {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={!password || checking}
                className="w-full bg-primary/10 hover:bg-primary/20 border border-primary/40 text-primary font-mono text-sm py-2 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {checking ? "Verifying..." : "$ login"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminGate;
