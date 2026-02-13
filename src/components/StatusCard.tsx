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
      .catch(() => setStatus({ active: false }));
  }, []);

  if (!status || !status.active) return null;

  const expiresAt = status.expires_at
    ? new Date(status.expires_at).toLocaleString("nb-NO", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

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
      {expiresAt && (
        <p className="mt-2 text-xs text-muted-foreground">
          Utløper: {expiresAt}
        </p>
      )}
    </div>
  );
};

export default StatusCard;
