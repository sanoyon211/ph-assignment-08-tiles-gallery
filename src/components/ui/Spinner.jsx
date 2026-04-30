export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        {/* Inner Pulsing Diamond */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-secondary rounded-lg animate-pulse rotate-45 shadow-lg shadow-secondary/50"></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-black tracking-[0.3em] uppercase text-slate-400 animate-pulse">
          Loading Gallery
        </h3>
      </div>
    </div>
  );
}
