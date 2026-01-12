// src/types/product.ts
export type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  description: string;
  dosage?: string;        // optional
  packSize?: string;      // optional
  category: string;
  keyBenefits?: string[]; // optional
  usage?: string;         // optional
};