export default function Preview({ sole, top }) {
  return (
    <div className="relative w-64 h-64 bg-zinc-300 rounded-full shadow-md flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={`/assets/sole_${sole}.png`} alt="sole" className="absolute w-56" />
        <img src={`/assets/top_${top}.png`} alt="top" className="absolute w-56" />
      </div>
    </div>
  );
}
