import { useState, useEffect } from "react";

interface StatusData {
  active: boolean;
  message?: string;
  expires_at?: string;
}

// Configure this to point to your Express backend
const API_BASE = import.meta.env.VITE_API_BASE || "";

const StatusCard = () => {
  const [status, setStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/status`)
      .then((res) => res.json())
      .then((data: StatusData) => setStatus(data))
      .catch(() => {
        // Demo fallback when API is unavailable
        const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();
        setStatus({
          active: true,
          message: "Hey! I'm currently out hiking, but I expect to be back by 16:00. If you need to get a hold of me by then, please contact me using the information below",
          expires_at: expiresAt,
        });
      });
  }, []);

  if (!status || !status.active) return null;

  const postedAt = new Date().toLocaleString("nb-NO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Split message by newlines for safe rendering
  const lines = (status.message || "").split("\n");

  return (
    <div className="w-full rounded-xl border border-status-border bg-status p-4 animate-fade-in">
      <div className="text-sm font-medium text-status-foreground">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Posted: {postedAt}
      </p>
    </div>
  );
};

export default StatusCard;
