import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "4799476190";

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-lg border border-whatsapp/50 bg-card px-4 py-2.5 text-sm text-muted-foreground transition-all hover:text-foreground hover:border-whatsapp active:scale-[0.98]"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;
