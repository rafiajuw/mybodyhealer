// src/types/product.ts
export type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  description: string;
  dosage?: string;           // optional
  packSize?: string;         // optional
  category: string;
  keyBenefits?: string[];    // optional
  usage?: string;            // optional
  composition?: string;      // optional - detailed ingredients
  intendedUsage?: string;    // optional - how to use
  certificates?: string[];   // optional - certifications/compliance
  technicalInfo?: string;    // optional - technical specifications
  origin?: string;           // optional - origin/sourcing
};