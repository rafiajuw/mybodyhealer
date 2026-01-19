"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OrderForm from "@/app/components/OrderForm";

export default function ProductDetailsClient({ product }: any) {
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ================== IMAGES ==================
  const productImages = [
    product.image, // Main image always first
    ...(product.imageAlt1 ? [product.imageAlt1] : []),
    ...(product.imageAlt2 ? [product.imageAlt2] : []),
    ...(product.imagePackaging ? [product.imagePackaging] : []),
  ];

  // ================== HIGHLIGHTS ==================
  const highlights = product.highlights || [
    "100% Vegan",
    "Gluten Free",
    "No Added Sugar",
    "High Fiber",
    "With Prebiotics",
    "Rich in Anthocyanins",
  ];

  // ================== ADDITIONAL INFO ==================
  const additionalInfo = [
    { icon: "❄️", text: "Store in a cool and moisture-free place out of sunlight. The Recommended Consumption Date (TETT) and Batch Number (PN) are on the packaging." },
    { icon: "🌡️", text: "Store below 25°C in a dry and cool place." },
    { icon: "🔬", text: "Developed through R&D at Sankara Brain and Biotechnology Research Center, Istanbul University-Cerrahpaşa." },
    { icon: "⚠️", text: "Do not exceed the recommended daily portion. Food supplements are not a substitute for a normal diet. Keep out of reach of children." },
    { icon: "🚫", text: "It is not a medicine. It is not used to prevent or treat any disease." },
    { icon: "👩‍⚕️", text: "Consult your doctor during pregnancy, breastfeeding or while on medication." },
    { icon: "📦", text: "30 capsules in 1 box." },
    { icon: "🏭", text: "Manufactured in accordance with GMP, ISO 9001 and ISO 22000 standards." },
  ];

  // ================== FAQ ==================
  const faqItems = [
    { q: "Is this product suitable for vegans?", a: "Yes, 100% vegan – no animal ingredients or gelatin." },
    { q: "Is it gluten-free?", a: "Yes, completely gluten-free and suitable for celiac individuals." },
    { q: "How should I take it?", a: "1 capsule daily with water, preferably with a meal." },
    { q: "When can I expect results?", a: "Most users notice benefits within 3–8 weeks of consistent use." },
    { q: "Can I take it during pregnancy?", a: "Please consult your doctor first." },
  ];

  // ================== REVIEWS ==================
  const reviews = [
    { name: "Ayesha K.", rating: 5, date: "Dec 15, 2025", text: "Energy levels improved a lot, digestion better. Very satisfied!" },
    { name: "Muhammad R.", rating: 4, date: "Jan 8, 2026", text: "Clean ingredients, no aftertaste. Capsule a bit large." },
    { name: "Sana M.", rating: 5, date: "Nov 28, 2025", text: "Helped a lot with bloating. Will buy again!" },
    { name: "Ali H.", rating: 5, date: "Jan 2, 2026", text: "Premium quality, feeling more focused." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-gray-50 pb-16">
      {/* ================== BACK BUTTON ================== */}
      <div className="bg-white border-b border-emerald-100 py-4 px-4 sm:px-6 sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <Link href="/shop/food-supplements" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium">
            ← Back to Food Supplements
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* ================== GALLERY + INFO ================== */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* IMAGE CAROUSEL */}
          <div className="space-y-4 lg:space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
              <Image
                src={productImages[currentImageIndex]}
                alt={`${product.name} view ${currentImageIndex + 1}`}
                fill
                className="object-contain p-6 sm:p-10 transition-transform duration-700 hover:scale-[1.03]"
                priority
              />
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-3 justify-center overflow-x-auto pb-2 snap-x snap-mandatory">
                {productImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all snap-center ${
                      currentImageIndex === idx
                        ? "border-emerald-600 shadow ring-1 ring-emerald-400/40 scale-105"
                        : "border-gray-200 opacity-70 hover:opacity-100 hover:border-emerald-300"
                    }`}
                  >
                    <Image src={img} alt="thumb" width={80} height={80} className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4 w-fit">
              {product.category?.replace("-", " ")?.toUpperCase() || "SUPPLEMENT"}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>

            <div className="flex flex-wrap gap-3 mb-8">
              {product.dosage && <span className="bg-emerald-50 px-4 py-2 rounded-lg text-emerald-800 font-medium">{product.dosage}</span>}
              {product.packSize && <span className="bg-emerald-50 px-4 py-2 rounded-lg text-emerald-800 font-medium">{product.packSize}</span>}
            </div>

            {/* KEY BENEFITS */}
            {product.keyBenefits?.length > 0 && (
              <div className="mb-10 bg-emerald-50/60 p-6 rounded-xl border border-emerald-100/50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Benefits</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.keyBenefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-600 text-xl mt-0.5">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setOpen(true)}
              className="mt-auto w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-100"
            >
              Cash on Delivery
            </button>
          </div>
        </div>

        {/* ================== HIGHLIGHTS ================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100/70 p-6 lg:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {highlights.map((item: string, i: number) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50/40 transition-all border border-gray-100 hover:border-emerald-200 hover:shadow-sm"
              >
                <span className="text-3xl mb-2">{["🌿", "🌾×", "0g", "↑", "🦠", "🫐"][i] || "✓"}</span>
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================== ADDITIONAL INFORMATION ================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100/70 p-6 lg:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalInfo.map((item, i) => (
              <div
                key={i}
                className="flex gap-3.5 p-4 rounded-lg bg-gray-50/60 border border-gray-100 hover:border-emerald-200 transition-all hover:shadow-sm"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================== FAQ ================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100/70 overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {faqItems.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800 pr-6">{faq.q}</span>
                  <span className={`text-xl transition-transform ${openFaq === i ? "rotate-180" : "rotate-0"}`}>▼</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 px-6 ${
                    openFaq === i ? "max-h-48 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================== CUSTOMER REVIEWS ================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100/70 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-gray-50/50 border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-800">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className={`text-lg ${s < review.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================== INGREDIENTS BREAKDOWN (COMMENTED) ================== */}
        {/*
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100/70 p-6 lg:p-8 mb-12 overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients Breakdown</h2>
        </section>
        */}
      </main>

      {open && <OrderForm product={product} onClose={() => setOpen(false)} />}
    </div>
  );
}
