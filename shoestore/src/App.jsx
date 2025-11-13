import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import Welcome from "./components/Welcome";
import Preview from "./components/Preview";
import Customizer from "./components/Customizer";
import Order from "./components/Order";

export default function App() {
  const [sole, setSole] = useState("white");
  const [top, setTop] = useState("black");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const customizerRef = useRef(null);

  const scrollToCustomizer = () => {
    customizerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Sending your order...");

    try {
      const res = await fetch("backend-production-b39f.up.railway.app/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          sole,
          top,
        }),
      });

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("Order succesfully sent!");
        setName("");
        setEmail("");
      } else {
        toast.error("There was an error:" + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error("There was an error during sending the order.");
    }
  };

  return (
    <div
      className="min-h-screen bg-zinc-950 flex flex-col items-center p-6 bg-cover bg-center bg-no-repeat pb-30"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Welcome onScrollClick={scrollToCustomizer} />
      <h1 className="text-3xl font-bold mb-6 text-zinc-300">Customize your new shoes!</h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Preview sole={sole} top={top} />
        <Customizer ref={customizerRef} sole={sole} top={top} setSole={setSole} setTop={setTop} />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-zinc-800 text-white border border-zinc-700 shadow-lg",
          success: {
            className: "bg-emerald-600 text-white",
          },
          error: {
            className: "bg-red-600 text-white",
          },
        }}
      />
      <Order name={name} email={email} setName={setName} setEmail={setEmail} handleSubmit={handleSubmit} />
    </div>
  );
}
