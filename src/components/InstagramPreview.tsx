import { Instagram, ExternalLink } from "lucide-react";

const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/evig_eventyr";

const placeholderPosts = [
  { id: 1, gradient: "from-rose-500/30 to-amber-500/30" },
  { id: 2, gradient: "from-violet-500/30 to-pink-500/30" },
  { id: 3, gradient: "from-cyan-500/30 to-blue-500/30" },
];

const InstagramPreview = () => {
  return (
    <div className="w-full rounded-xl border border-border bg-card p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-instagram-from to-instagram-to">
          <Instagram className="h-5 w-5 text-instagram-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">@evig_eventyr</span>
          <span className="text-xs text-muted-foreground">Instagram</span>
        </div>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-3 gap-2">
        {placeholderPosts.map((post) => (
          <div
            key={post.id}
            className={`aspect-square rounded-lg bg-gradient-to-br ${post.gradient} bg-secondary flex items-center justify-center`}
          >
            <Instagram className="h-5 w-5 text-muted-foreground/50" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-instagram-from to-instagram-to px-4 py-3 text-sm font-semibold text-instagram-foreground transition-all hover:brightness-110 active:scale-[0.98]"
      >
        Åpne i Instagram
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
};

export default InstagramPreview;
