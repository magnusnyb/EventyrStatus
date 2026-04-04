const VIPPS_URL = "https://qr.vipps.no/28/2/01/031/4799476190?v=1";

const VippsButton = () => {
  return (
    <a
      href={VIPPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-xl border border-[#FF5B24] bg-transparent px-4 py-2.5 text-sm font-medium text-[#FF5B24] transition-all hover:opacity-90 active:scale-[0.98]"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="currentColor" d="M10.3,12.72c1.75,0,2.74-.85,3.69-2.08.52-.66,1.18-.8,1.66-.43.47.38.52,1.09,0,1.75-1.37,1.8-3.12,2.89-5.35,2.89-2.41,0-4.54-1.32-6.01-3.64-.43-.62-.33-1.28.14-1.61s1.18-.19,1.61.47c1.04,1.56,2.46,2.65,4.26,2.65h0ZM13.57,6.9c0,.85-.66,1.42-1.42,1.42s-1.42-.57-1.42-1.42.66-1.42,1.42-1.42,1.42.62,1.42,1.42Z"/>
      </svg>
      Vipps
      <span className="w-5" aria-hidden="true" />
    </a>
  );
};

export default VippsButton;
