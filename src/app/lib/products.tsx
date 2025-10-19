// src/app/lib/products.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  category: "food" | "oncology" | "branded";
  extra?: string;
}

export const PRODUCTS: Product[] = [
  // --- FOOD SUPPLEMENTS (category: "food")
  { id: "ibooster", name: "Ibooster", description: "Immunity booster with vitamins & minerals.", image: "/product1.jpeg", price: "Rs. 2,500", category: "food" },
  { id: "bestman", name: "Bestman", description: "Men's health supplement.", image: "/product2.jpeg", price: "Rs. 2,200", category: "food" },
  { id: "femapause", name: "Femapause", description: "Support for women's balance & hormones.", image: "/product3.jpeg", price: "Rs. 2,800", category: "food" },
  { id: "oliveoil", name: "Extra Virgin Olive Oil", description: "Cold-pressed olive oil, culinary & health grade.", image: "/olive2.avif", price: "Rs. 1,650", category: "food" },
  { id: "nkdefense", name: "NK Defense", description: "Natural defense enhancer.", image: "/b6.avif", price: "Rs. 3,200", category: "food" },
  // add more food items as needed...

  // --- ONCOLOGY (category: "oncology")
  { id: "anastrozole", name: "Anastrozole", description: "Hormonal therapy tablet (anastrozole).", image: "/product-onc-1.jpeg", price: "Ask for price", category: "oncology", extra: "10 tablets / 30 tablets" },
  { id: "letrozole", name: "Letrozole", description: "Letrozole tablet (Letrozene / Femara variants).", image: "/product-onc-2.jpeg", price: "Ask for price", category: "oncology" },
  { id: "capecitabine", name: "Capecitabine (Xeloda)", description: "Oral cytotoxic agent (capecitabine).", image: "/product-onc-3.jpeg", price: "Ask for price", category: "oncology" },
  // add more oncology items...

  // --- BRANDED ONCOLOGY (category: "branded")
  { id: "lenvatinib", name: "Lenvatinib (Lenvima®)", description: "Targeted therapy (capsules).", image: "/product-br-1.jpeg", price: "On request", category: "branded", extra: "Capsule form" },
  { id: "ruxolitinib", name: "Ruxolitinib (Jakavi®)", description: "JAK inhibitor (tablets).", image: "/product-br-2.jpeg", price: "On request", category: "branded" },
  { id: "palbociclib", name: "Palbociclib (Ibrance®)", description: "CDK4/6 inhibitor (tablets).", image: "/product-br-3.jpeg", price: "On request", category: "branded" },
];

export const FOOD_PRODUCTS = PRODUCTS.filter((p) => p.category === "food");
export const ONCOLOGY_PRODUCTS = PRODUCTS.filter((p) => p.category === "oncology");
export const BRANDED_PRODUCTS = PRODUCTS.filter((p) => p.category === "branded");
