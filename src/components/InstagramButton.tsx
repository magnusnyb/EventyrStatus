import { Instagram } from "lucide-react";

const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/brukernavn";

const InstagramButton = () => {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-instagram-from to-instagram-to px-6 py-4 text-lg font-semibold text-instagram-foreground transition-all hover:brightness-110 active:scale-[0.98]"
    >
      <Instagram className="h-6 w-6" />
      Instagram
    </a>
  );
};

export default InstagramButton;
