export default function BackgroundDecorations() {
  return (
    <>
      <div className="absolute top-[-60px] left-[-60px] w-56 h-56 rounded-full bg-gray-300 opacity-40 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full bg-gray-400 opacity-30 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 right-[-40px] w-36 h-36 rounded-full bg-gray-200 opacity-50 blur-2xl pointer-events-none z-0" />
    </>
  );
}
