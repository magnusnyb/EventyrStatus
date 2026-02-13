import StatusCard from "@/components/StatusCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import InstagramButton from "@/components/InstagramButton";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Avatar / Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-3xl">
            👋
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Hei!</h1>
          <p className="text-sm text-muted-foreground">Ta kontakt med meg</p>
        </div>

        {/* Status */}
        <StatusCard />

        {/* Links */}
        <div className="flex w-full flex-col gap-3">
          <WhatsAppButton />
          <InstagramButton />
        </div>
      </div>
    </div>
  );
};

export default Index;
