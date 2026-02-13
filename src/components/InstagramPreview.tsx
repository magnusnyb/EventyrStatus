import { Instagram, ExternalLink } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";
import insta1 from "@/assets/insta-1.jpeg";
import insta2 from "@/assets/insta-2.jpeg";
import insta3 from "@/assets/insta-3.jpeg";

const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/evig_eventyr";

const posts = [
  { id: 1, src: insta1, alt: "Skiing in the mountains" },
  { id: 2, src: insta2, alt: "Ford Explorer in snow" },
  { id: 3, src: insta3, alt: "Muflon trailer in the Alps" },
];

const InstagramPreview = () => {
  return (
    <div className="w-full rounded-xl border border-border bg-card p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={profileImg}
          alt="Profilbilde"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">@evig_eventyr</span>
          <span className="text-xs text-muted-foreground">Instagram</span>
        </div>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <a
            key={post.id}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square rounded-lg overflow-hidden"
          >
            <img
              src={post.src}
              alt={post.alt}
              className="h-full w-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </a>
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
