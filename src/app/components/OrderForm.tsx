"use client";

import { X } from "lucide-react";
import { FormEvent } from "react";

interface Product {
  name: string;
  dosage?: string;
  packSize?: string;
  category?: string;
}

interface Props {
  product: Product;
  onClose: () => void;
}

export default function OrderForm({ product, onClose }: Props) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    // ✅ meta data
    data.append("type", "order");
    data.append("productName", product.name);
    data.append("productCategory", product.category || "N/A");
    if (product.dosage) data.append("productDosage", product.dosage);
    if (product.packSize) data.append("productPackSize", product.packSize);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-emerald-800">
          Order {product.name}
        </h2>

        {(product.dosage || product.packSize) && (
          <p className="text-sm text-emerald-600 mt-1 mb-4">
            {product.dosage}
            {product.packSize && ` • ${product.packSize}`}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            name="name"
            required
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          <input
            name="phone"
            required
            placeholder="Phone / WhatsApp Number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          <textarea
            name="message"
            rows={3}
            placeholder="Quantity, city, delivery address etc."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition"
          >
            Send Order Request
          </button>
        </form>
      </div>
    </div>
  );
}
