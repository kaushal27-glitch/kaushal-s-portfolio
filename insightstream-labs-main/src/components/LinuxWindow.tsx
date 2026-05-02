import { ReactNode } from "react";

interface LinuxWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const LinuxWindow = ({ title, children, className = "" }: LinuxWindowProps) => {
  return (
    <div className={`linux-window ${className}`}>
      <div className="linux-titlebar">
        <div className="flex gap-1.5">
          <div className="linux-titlebar-dot linux-titlebar-dot-red" />
          <div className="linux-titlebar-dot linux-titlebar-dot-amber" />
          <div className="linux-titlebar-dot linux-titlebar-dot-green" />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default LinuxWindow;
