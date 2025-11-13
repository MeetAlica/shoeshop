export default function Welcome({ onScrollClick }) {
  return (
    <div className="flex flex-col items-center gap-20 my-50">
      <h1 className="text-4xl md:text-6xl font-bold text-zinc-300">Unique shoes for You!</h1>
      <p className="mt-4 text-lg text-zinc-300">Customize your shoes to express your style with it!</p>
      <button
        onClick={onScrollClick}
        className="cursor-pointer mt-6 inline-block px-6 py-3 text-zinc-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Customize it now
      </button>
    </div>
  );
}
