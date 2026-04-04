import { Instagram } from "lucide-react";
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
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full rounded-xl border border-border bg-card p-4 flex flex-col gap-4 transition-all hover:border-instagram-from active:scale-[0.98]"
    >
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
        <span className="ml-auto flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-instagram-from to-instagram-to px-3 py-1.5 text-xs font-semibold text-instagram-foreground">
          <Instagram className="h-3.5 w-3.5" />
          Instagram
        </span>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="aspect-square rounded-lg overflow-hidden"
          >
            <img
              src={post.src}
              alt={post.alt}
              className="h-full w-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </a>
  );
};

export default InstagramPreview;
