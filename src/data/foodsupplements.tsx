// src/data/food-supplements.ts
import { type Product } from "@/types/product";

export const FOOD_SUPPLEMENTS: Product[] = [
  {
    id: 8,
    slug: "mormiks",
    name: "Mormiks",
    dosage: "Capsule",
    packSize: "30 capsules",
    image: "/b4.avif",
    description: "Natural food coloring + supplement blend with purple fruit and vegetable extracts (rich in anthocyanins) for overall wellness, anti-aging, and blood sugar/glucose support.",
    category: "food-supplement",
    keyBenefits: ["Natural coloring", "Antioxidant support", "Heart & blood sugar balance"]
  },
  {
    id: 9,
    slug: "zeredemiks",
    name: "Zeredemiks",
    dosage: "Capsule",
    packSize: "30 capsules",
    image: "/b5.avif",
    description: "Food coloring + supplement blend for enhanced nutrition and vitality.",
    category: "food-supplement",
    keyBenefits: ["Natural food coloring", "Vitality boost", "Nutrient-rich"]
  },
  {
    id: 10,
    slug: "lifmo",
    name: "Lifmo",
    dosage: "Powder",  // Often sold as powder blend
    packSize: "30 servings",
    image: "/b3.avif",
    description: "High-fiber prebiotic supplement enriched with soluble/insoluble fibers and anthocyanins from sources like black carrot, mulberry, and aronia for gut health and blood sugar management.",
    category: "food-supplement",
    keyBenefits: ["Gut health support", "Blood sugar & weight management", "Rich in antioxidants"]
  },
  {
    id: 11,
    slug: "olive-oil",
    name: "Olive Oil",
    dosage: "Liquid",
    packSize: "Various (e.g., 500ml bottle)",
    image: "/olive2.avif",
    description: "Premium extra virgin olive oil as a natural oil + supplement, rich in monounsaturated fats, antioxidants, and anti-inflammatory compounds.",
    category: "food-supplement",
    keyBenefits: ["Heart health", "Anti-inflammatory", "Antioxidant protection"]
  },
  {
    id: 12,
    slug: "nk-defense",
    name: "NK Defense",
    dosage: "Capsule",
    packSize: "30 capsules",
    image: "/foodsupplement/nk.png",
    description: "Immune support supplement designed to activate and boost natural killer (NK) cell activity for better defense and cellular health.",
    category: "food-supplement",
    keyBenefits: ["Immune defense", "NK cell activation", "Overall wellness support"]
  },
];