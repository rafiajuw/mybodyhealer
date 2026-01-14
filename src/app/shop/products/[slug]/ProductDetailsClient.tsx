"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OrderForm from "@/app/components/OrderForm";

export default function ProductDetailsClient({ product }: any) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Intended Usage" },
    { id: "composition", label: "Composition" },
    { id: "technical", label: "Technical Information" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-gray-50">
        {/* Header with Back Button */}
        <div className="bg-white border-b border-emerald-100 py-6 px-6 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/shop/food-supplements"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition"
            >
              <span>←</span> Back to Food Supplements
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Product Image with Zoom Effect */}
              <div className="flex flex-col items-center">
                <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-white p-8 group cursor-pointer">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
                    priority
                  />
                </div>
              </div>

              {/* Product Header Info */}
              <div className="flex flex-col justify-start">
                <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold w-fit mb-4">
                  {product.category?.replace("-", " ").toUpperCase()}
                </div>
                
                <h1 className="text-5xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                <div className="flex gap-4 mb-8 text-emerald-700 font-semibold flex-wrap">
                  {product.dosage && <span className="bg-emerald-50 px-4 py-2 rounded-lg">{product.dosage}</span>}
                  {product.packSize && <span className="bg-emerald-50 px-4 py-2 rounded-lg">{product.packSize}</span>}
                </div>

                {/* Key Benefits */}
                {product.keyBenefits && product.keyBenefits.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Key Benefits</h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {product.keyBenefits.slice(0, 5).map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-emerald-600 font-bold text-xl mt-1">✓</span>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {product.keyBenefits.length > 5 && (
                      <p className="text-emerald-600 font-semibold mt-3 text-sm">+ {product.keyBenefits.length - 5} more benefits</p>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => setOpen(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
                >
                  Order Now
                </button>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-max px-6 py-4 font-semibold transition ${
                      activeTab === tab.id
                        ? "border-b-4 border-emerald-600 text-emerald-600 bg-emerald-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8 md:p-12">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {product.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Intended Usage Tab */}
                {activeTab === "usage" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h3>
                      <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg">
                        <p className="text-gray-800 leading-relaxed text-lg font-medium whitespace-pre-wrap">
                          {product.usage || "Usage instructions will be provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Composition Tab */}
                {activeTab === "composition" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Composition & Ingredients</h3>
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                          {product.composition || "Detailed composition information available upon request"}
                        </p>
                      </div>
                    </div>
                    {product.origin && (
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Origin & Sourcing</h4>
                        <p className="text-gray-700 leading-relaxed">{product.origin}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Technical Info Tab */}
                {activeTab === "technical" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications & Regulatory Information</h3>
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {product.technicalInfo || "Technical specifications and regulatory information available upon request"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Certifications Section - Compact & Clean at Bottom */}
            {product.certificates && product.certificates.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="px-8 py-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Certifications & Compliance</h2>
                  <p className="text-gray-600 text-sm mt-1">Quality standards and regulatory approvals</p>
                </div>
                
                <div className="p-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {product.certificates.map((cert: string, idx: number) => (
                      <div 
                        key={idx}
                        className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-800 font-semibold text-sm leading-tight">
                            {cert}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {open && <OrderForm product={product} onClose={() => setOpen(false)} />}
    </>
  );
}