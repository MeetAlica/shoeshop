import { forwardRef } from "react";

const Customizer = forwardRef(({ sole, top, setSole, setTop }, ref) => {
  const soleOptions = ["white", "black", "brown"];
  const topOptions = ["white", "black", "red", "blue"];

  return (
    <div ref={ref} className="bg-zinc-300 p-4 rounded-xl shadow-md w-72">
      <h2 className="text-xl font-semibold mb-2">Choose your sole:</h2>
      <div className="flex gap-2 mb-4">
        {soleOptions.map((option) => (
          <button
            key={option}
            className={`capitalize cursor-pointer px-3 py-2 rounded-lg border ${
              sole === option ? "bg-blue-600 text-zinc-300 hover:bg-blue-700 transition" : "bg-neutral-500 border-0"
            }`}
            onClick={() => setSole(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Choose your top:</h2>
      <div className="flex gap-2 mb-4">
        {topOptions.map((option) => (
          <button
            key={option}
            className={`capitalize cursor-pointer px-3 py-2 rounded-lg border ${
              top === option ? "bg-blue-600 text-zinc-300 hover:bg-blue-700 transition" : "bg-neutral-500 border-0"
            }`}
            onClick={() => setTop(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
});

export default Customizer;
