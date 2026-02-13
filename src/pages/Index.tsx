import StatusCard from "@/components/StatusCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import InstagramPreview from "@/components/InstagramPreview";
import profileImg from "@/assets/profile.jpeg";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Avatar / Brand */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={profileImg}
            alt="Profilbilde"
            className="h-24 w-24 rounded-full object-cover border-2 border-border"
          />
          <h1 className="text-2xl font-bold tracking-tight">Evig eventyr 🇳🇴</h1>
          <p className="text-sm text-muted-foreground text-center">Hey there, get in touch with me here (or just look at the pretty pictures, I don't mind) </p>
        </div>

        {/* Status */}
        <StatusCard />

        {/* Instagram Preview */}
        <InstagramPreview />

        {/* Links */}
        <div className="flex w-full flex-col gap-3">
          <WhatsAppButton />
        </div>
      </div>
    </div>
  );
};

export default Index;
