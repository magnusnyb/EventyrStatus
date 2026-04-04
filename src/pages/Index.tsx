import { Phone } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import VippsButton from "@/components/VippsButton";
import InstagramPreview from "@/components/InstagramPreview";
import StatusMessage from "@/components/StatusMessage";

const Index = () => {
  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Hei på deg!</h1>

        {/* Status message */}
        <StatusMessage />

        {/* Instagram Preview */}
        <InstagramPreview />

        {/* Links */}
        <div className="flex w-full flex-col gap-3">
          <VippsButton />
          <WhatsAppButton />
          <a
            href="tel:+4799476190"
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            +47 99476190
            <span className="w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
