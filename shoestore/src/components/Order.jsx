export default function Order({ name, email, setName, setEmail, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-zinc-300 p-6 rounded-xl shadow-md w-80">
      <h2 className="text-xl font-semibold mb-4">Submit your order</h2>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-2 mb-3 rounded bg-zinc-300"
      ></input>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 mb-3 rounded bg-zinc-300"
      ></input>
      <button
        type="submit"
        className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit order
      </button>
    </form>
  );
}
