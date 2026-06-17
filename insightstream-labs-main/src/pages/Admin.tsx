import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Clock, RefreshCw, Inbox } from "lucide-react";
import LinuxWindow from "@/components/LinuxWindow";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contacts");
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-mono text-2xl font-bold text-foreground">
              <span className="text-primary">~/</span>admin
            </h1>
            <p className="text-muted-foreground text-sm font-mono mt-1">
              Contact form submissions
            </p>
          </div>
          <button
            onClick={fetchContacts}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-border rounded hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </motion.div>

        {error && (
          <div className="mb-6 border border-destructive/50 bg-destructive/10 text-destructive rounded-md px-4 py-3 font-mono text-sm">
            ❌ {error}
          </div>
        )}

        {loading && !error && (
          <div className="flex items-center justify-center py-20 text-muted-foreground font-mono text-sm gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Loading submissions...
          </div>
        )}

        {!loading && !error && contacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Inbox className="w-10 h-10 opacity-40" />
            <p className="font-mono text-sm">No submissions yet.</p>
          </div>
        )}

        {!loading && contacts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* List */}
            <div className="space-y-2">
              {contacts.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(c)}
                  className={`cursor-pointer rounded-md border px-4 py-3 transition-colors ${
                    selected?.id === c.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {c.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground truncate flex items-center gap-1.5">
                    <Mail className="w-3 h-3 shrink-0" />
                    {c.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                    {c.message}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Detail */}
            <div className="sticky top-6">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LinuxWindow title={`message-${selected.id}.txt`}>
                    <div className="space-y-3 font-mono text-sm">
                      <div>
                        <span className="text-primary text-xs">FROM</span>
                        <p className="text-foreground mt-0.5">{selected.name}</p>
                      </div>
                      <div>
                        <span className="text-primary text-xs">EMAIL</span>
                        <p className="text-foreground mt-0.5">
                          <a href={`mailto:${selected.email}`} className="underline underline-offset-2 hover:text-primary">
                            {selected.email}
                          </a>
                        </p>
                      </div>
                      <div>
                        <span className="text-primary text-xs">RECEIVED</span>
                        <p className="text-muted-foreground mt-0.5 text-xs">{formatDate(selected.created_at)}</p>
                      </div>
                      <div>
                        <span className="text-primary text-xs flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> MESSAGE
                        </span>
                        <p className="text-foreground mt-1.5 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                      </div>
                    </div>
                  </LinuxWindow>
                </motion.div>
              ) : (
                <div className="border border-dashed border-border rounded-md flex items-center justify-center h-48 text-muted-foreground text-sm font-mono">
                  ← Select a message to read
                </div>
              )}
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-xs font-mono text-muted-foreground">
          {contacts.length} submission{contacts.length !== 1 ? "s" : ""} total
        </p>
      </div>
    </div>
  );
};

export default Admin;
