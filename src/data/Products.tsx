// src/data/Products.ts
export const PRODUCTS = [
  {
    id: 1,
    slug: "anastrozole",
    name: "Anastrozole",
    dosage: "Tablet 1mg",
    packSize: "30 tablets",
    image: "/anastrozole.webp",
    description: "Extends disease-free survival (DFS) by 4.8%. Reduces breast cancer recurrence by 50%. Lower risk of endometrial cancer and thromboembolism.",
    category: "oncology",
    keyBenefits: [
      "Extends DFS by 4.8%",
      "Reduces recurrence by 50%",
      "Lower endometrial cancer risk"
    ]
  },
  {
    id: 2,
    slug: "letrozole",
    name: "Letrozole",
    dosage: "2.5mg tablets",
    packSize: "30 tablets",
    image: "/letrozole.webp",
    description: "Reduces recurrence risk by 19% and mortality by 12% vs. tamoxifen. Potent estrogen suppression for HR+ breast cancer.",
    category: "oncology",
    keyBenefits: [
      "19% reduced recurrence",
      "12% lower mortality",
      "Enhanced efficacy with CDK4/6 inhibitors"
    ]
  },
  {
    id: 3,
    slug: "bicalutamide",
    name: "Bicalutamide",
    dosage: "50mg tablet",
    packSize: "28 tablets",
    image: "/bicalutamide.jpg",
    description: "Delays prostate cancer progression by 20-30% in CAB. Preserves quality of life. Once-daily dosing.",
    category: "oncology",
    keyBenefits: [
      "20-30% delay in progression",
      "Once-daily dosing",
      "Preserves quality of life"
    ]
  },
  {
    id: 4,
    slug: "capecitabine",
    name: "Capecitabine",
    dosage: "Xeloda 500mg Tablet",
    packSize: "28 tablets",
    image: "/capecitabine.avif",
    description: "Reduces relapse risk by 15-20% in stage III colon cancer. Oral convenience. Tumor-selective action.",
    category: "oncology",
    keyBenefits: [
      "15-20% lower relapse",
      "Oral convenience",
      "Tumor-selective action"
    ]
  },
  {
    id: 5,
    slug: "sunitinib",
    name: "Sunitinib",
    dosage: "12.5mg Capsules",
    packSize: "30 capsules",
    image: "/sunitinib.png",
    description: "Extends PFS by 6-12 months in RCC and GIST. Enhances immunotherapy via immunomodulation.",
    category: "oncology",
    keyBenefits: [
      "6-12 months PFS extension",
      "Immunotherapy synergy",
      "Flexible dosing"
    ]
  },
  {
    id: 6,
    slug: "sorafenib",
    name: "Sorafenib",
    dosage: "200mg tablets",
    packSize: "60 tablets",
    image: "/sorafenib.webp",
    description: "Extends median overall survival by 3 months in HCC. Broad anti-tumor activity across multiple cancers.",
    category: "oncology",
    keyBenefits: [
      "3 months OS extension",
      "Broad anti-tumor activity",
      "Stabilizes disease in 40-50%"
    ]
  },
  {
    id: 7,
    slug: "pazopanib",
    name: "Pazopanib",
    dosage: "Tablet 400mg",
    packSize: "30 tablets",
    image: "/pazopanib.webp",
    description: "Improves PFS by 3-7 months in RCC and STS. Increases tumor necrosis. Enhances ORR in ovarian cancer combinations.",
    category: "oncology",
    keyBenefits: [
      "3-7 months PFS gain",
      "Tumor necrosis induction",
      "Enhanced ORR in combos"
    ]
  },
];