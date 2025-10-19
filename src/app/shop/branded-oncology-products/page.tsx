// src/app/shop/branded-oncology/page.tsx
"use client";

import { BRANDED_PRODUCTS } from "@/app/lib/products";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function BrandedPage() {
  const [selected, setSelected] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const submitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    const form = new FormData(e.currentTarget);
    form.append("type", "order");
    form.append("productId", selected.id);
    form.append("productName", selected.name);

    try {
      const res = await fetch("/api/form", { method: "POST", body: form });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("✅ Order received.");
        e.currentTarget.reset();
        setTimeout(() => setSelected(null), 1500);
      } else setStatus(data.message || "⚠️ Failed to send order.");
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Network error.");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-4 text-[#4b7a2f] font-bold">🧬 Branded Oncology</h1>
        <p className="text-gray-600 mb-8">Branded oncology therapies — contact us for availability & pricing.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {BRANDED_PRODUCTS.map((p) => (
            <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow p-4 border">
              <div className="h-44 relative rounded overflow-hidden">
                <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#4b7a2f]">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.extra || p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg font-medium">{p.price}</div>
                  <button onClick={() => setSelected(p)} className="bg-[#4b7a2f] text-white px-4 py-2 rounded">🛒 Order</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={(e)=>e.stopPropagation()} initial={{ scale: 0.98 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }} className="bg-white rounded-2xl p-6 w-full max-w-md relative">
              <button onClick={()=>setSelected(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><X /></button>
              <h2 className="text-2xl font-semibold text-[#4b7a2f]">Order: {selected.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{selected.description}</p>

              <form onSubmit={submitOrder} className="space-y-3 mt-3">
                <input name="name" required placeholder="Full name" className="w-full p-3 border rounded" />
                <input name="email" required placeholder="Email" className="w-full p-3 border rounded" />
                <input name="phone" placeholder="Phone" className="w-full p-3 border rounded" />
                <input name="address" placeholder="Delivery address" className="w-full p-3 border rounded" />
                <input name="quantity" type="number" defaultValue={1} min={1} className="w-full p-3 border rounded" />
                <textarea name="message" placeholder="Notes (optional)" className="w-full p-3 border rounded" />
                <button disabled={sending} className="w-full bg-[#4b7a2f] text-white p-3 rounded">{sending ? "Sending..." : "Place Order"}</button>
              </form>

              {status && <div className="mt-3 text-center text-sm">{status}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
