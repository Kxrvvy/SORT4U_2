export default function LSBackgroundDecorations() {
  return (
    <>
      <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-gray-300 opacity-40 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 rounded-full bg-gray-400 opacity-30 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 left-[-60px] w-40 h-40 rounded-full bg-gray-200 opacity-50 blur-2xl pointer-events-none z-0" />
    </>
  );
}
