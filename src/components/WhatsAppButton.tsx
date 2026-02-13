import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "4790012345";

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-whatsapp px-6 py-4 text-lg font-semibold text-whatsapp-foreground transition-all hover:brightness-110 active:scale-[0.98]"
    >
      <MessageCircle className="h-6 w-6" />
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;
