import { Phone } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import InstagramPreview from "@/components/InstagramPreview";
import profileImg from "@/assets/profile.jpeg";

const Index = () => {
  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Avatar / Brand */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={profileImg}
            alt="Profilbilde"
            className="h-24 w-24 rounded-full object-cover border-2 border-border"
          />
          <h1 className="text-2xl font-bold tracking-tight">Evig eventyr 🇳🇴</h1>
          <p className="text-sm text-muted-foreground text-center">Hey there, get in touch with me here <br/>(or just look at the pretty pictures, I don't mind) </p>
        </div>

        {/* Instagram Preview */}
        <InstagramPreview />

        {/* Links */}
        <div className="flex w-full flex-col gap-3">
          <WhatsAppButton />
          <a
            href="tel:+4799476190"
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            +47 99476190
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
