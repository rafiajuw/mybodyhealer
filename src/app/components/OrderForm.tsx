// src/app/components/OrderForm.tsx
"use client";

import { X } from "lucide-react";

interface Product {
  name: string;
  dosage: string;
  packSize: string;
}

interface Props {
  product: Product;
  onClose: () => void;
}

export default function OrderForm({ product, onClose }: Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    data.append("type", "order"); // ✅ server ko form type mil jayega
    data.append("productName", product.name);
    data.append("productDosage", product.dosage);
    data.append("productPackSize", product.packSize);

    // ✅ Correct Route (same as your single route.ts)
    const res = await fetch("/api/form", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    alert(result.message);

    if (result.success) {
      form.reset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Order {product.name}</h2>
        <p className="text-sm text-emerald-600 mb-6">{product.dosage} • {product.packSize}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
          <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
          <input name="phone" placeholder="Phone Number" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
          <textarea name="message" placeholder="Quantity, delivery address, etc." rows={3} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" />

          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">
            Send Order Request
          </button>
        </form>
      </div>
    </div>
  );
}
