// src/data/food-supplements.ts
/**
 * SANKARA OFFICIAL PARTNERSHIP
 * ========================================
 * All food supplements are exclusively sourced from:
 * Sankara Beyin ve Biyoteknoloji Araştırma Merkezi
 * (Sankara Brain and Biotechnology Research Center)
 * 
 * Location: Istanbul University-Cerrahpaşa Avcılar Campus
 * Address: Teknoloji Geliştirme Bölgesi, Avcılar/Istanbul, Turkey
 * Website: https://sankara.com.tr/
 * Contact: info@sankara.com.tr
 * Phone: +90 (212) 691 60 69
 * 
 * Sankara is Turkey's first and only Thematic R&D Center established by the private sector (2018)
 * Operating 3100 m² of research and production facilities
 * Committed to science-based products for community health
 */

import { type Product } from "@/types/product";

export const FOOD_SUPPLEMENTS: Product[] = [
  {
    id: 8,
    slug: "mormiks",
    name: "Mormiks – 320 g",
    dosage: "Powder",
    packSize: "320g",
    image: "/b4.avif",
    description: "Mormiks is a functional food mixture developed for use in flour products and desserts, containing standardized anthocyanins extracted from purple fruits and vegetables including black carrot, blackberry, pomegranate, and cherry. Unlike fruit powders, Sankara's Mormiks uses extracted and purified active compounds with standardized content. 100g Mormiks contains at least 1000mg of standardized anthocyanins. Composition: Fruit and vegetable extracts (40% - black carrot extract, blackberry extract, pomegranate extract, cherry extract) and corn starch (carrier). The product contains no allergens, is vegan and gluten-free with no added sugar.",
    category: "food-supplement",
    keyBenefits: [
      "Standardized anthocyanins (1000mg per 100g) - potent antioxidants",
      "Supports blood sugar control and weight management",
      "Reduces risk of chronic diseases (diabetes, obesity, cardiovascular disease)",
      "Enhances immune function and provides inflammation reduction",
      "Protects against age-related cognitive decline (Alzheimer's, Parkinson's risk reduction)",
      "Improves vision and visual health",
      "Vegan & gluten-free with no added sugar"
    ],
    usage: "Mix 8% with flour for bread and other flour products, or 12% in desserts and sweet applications. Does not alter taste, aroma, or food quality. Yellow-orange color that blends naturally."
  },
  {
    id: 9,
    slug: "zeredemiks",
    name: "Zerdemiks – 300 g",
    dosage: "Powder",
    packSize: "300g",
    image: "/b5.avif",
    description: "Zerdemiks is a functional food mixture developed from turmeric root, containing high-purity standardized curcumin for use in flour products and desserts. Unlike regular turmeric (which contains ~10mg curcumin per gram), Sankara's Zerdemiks contains 50mg curcumin per gram - 5x higher concentration. 100g Zerdemiks contains at least 5000mg of standardized curcumin. Composition: Turmeric extract (12% standardized curcumin), corn starch (carrier), and gum arabic. Origin: Turmeric sourced from India, processed in Turkey. Vegan, gluten-free, no added sugar, no allergens.",
    category: "food-supplement",
    keyBenefits: [
      "5x higher curcumin concentration than regular turmeric powder",
      "Powerful anti-inflammatory and antioxidant properties",
      "Reduces metabolic syndrome, arthritis, and anxiety-related conditions",
      "Supports cognitive function and brain health during aging",
      "Reduces exercise-induced muscle soreness and fatigue",
      "Strengthens immune system response",
      "Standardized dosage ensures consistent benefits in every use"
    ],
    usage: "Mix 2% ratio (20g per 1kg flour or 1 liter milk) into bread, pasta, mantı, simit, baklava, cookies, cake, and desserts. Provides yellow-orange color without affecting taste or aroma. Easy to incorporate into all baked goods."
  },
  {
    id: 10,
    slug: "lifmo",
    name: "Lifmo – 210 g",
    dosage: "Powder",
    packSize: "210g",
    image: "/b3.avif",
    description: "Lifmo is a functional food mixture combining purple fruit anthocyanins with prebiotic fiber sources. Specially formulated to meet 30% of daily fiber requirements. 1 serving (10g) contains at least 100mg standardized anthocyanins. 150g Lifmo contains 1500mg anthocyanins and 110g dietary fiber. Composition: Fiber mixture (83% - inulin and psyllium husk), purple fruit and vegetable extract mixture (16% - black carrot extract, blackberry extract, aronia extract), freeze-dried strawberry. Vegan, gluten-free, sugar-free, no allergens. Available in flavored or unflavored versions.",
    category: "food-supplement",
    keyBenefits: [
      "Provides 30% of daily fiber requirements per serving",
      "Standardized anthocyanins support antioxidant and anti-inflammatory action",
      "Prebiotic fibers (inulin + psyllium) promote healthy gut microbiota",
      "Supports healthy cholesterol and blood sugar levels",
      "Enhances calcium absorption and pathogen suppression",
      "Protects against leaky gut and maintains gastrointestinal integrity",
      "Reduces allergy risk and strengthens immune function",
      "Aids weight management and provides extended satiety"
    ],
    usage: "Mix 1 serving (10g) daily in yogurt, smoothies, milk, kefir, oat porridge, or beverages. Recommended: 2 teaspoons (5g) morning and 2 teaspoons (5g) evening. Psyllium may cause quick thickening - consume promptly. Available unflavored or flavored versions. Does not alter food taste significantly."
  },
  {
    id: 11,
    slug: "olive-oil",
    name: "Sankara Olive Oil – Premium Selection",
    dosage: "Liquid",
    packSize: "250ml / 500ml",
    image: "/olive2.avif",
    description: "Premium extra virgin olive oil from Sankara enriched with standardized olive leaf (oleuropein) and turmeric (curcumin) extracts. Early harvest, cold-pressed natural flavored olive oil with intensive polyphenol content. Available in two potency variants: Essence (+750 mg/kg polyphenols) and Intense (+1500 mg/kg polyphenols). Essence contains 250mg curcumin and 100mg oleuropein per bottle. Intense contains 500mg curcumin and 200mg oleuropein per bottle. Composition: Natural extra virgin olive oil, turmeric extract (standardized curcumin), olive leaf extract (standardized oleuropein). Origin: Turkey (turmeric sourced from India). No allergens. Certified analysis from TURKAK accredited laboratory (TS EN ISO/IEC 17025:2017).",
    category: "food-supplement",
    keyBenefits: [
      "Protects blood lipids from oxidative stress",
      "Maintains healthy LDL cholesterol levels",
      "Supports cardiovascular health and reduces heart disease risk",
      "Curcumin provides anti-inflammatory and antioxidant benefits",
      "Oleuropein offers neuroprotective, liver-protective, and anti-tumor effects",
      "Antiviral and antimicrobial protection against infectious diseases",
      "Supports cognitive function and brain health",
      "Controls blood pressure and promotes cellular renewal",
      "Early harvest and cold-pressed for maximum nutrient preservation"
    ],
    usage: "Consume 2 tablespoons (20ml) daily on empty stomach or with meals. Children: 1 teaspoon (5ml) daily. Recommended by FDA (20ml daily reduces heart disease risk) and EFSA (5mg hydroxytyrosol derivatives in 20g olive oil). For best results, consume raw without heating. Use in salads, dressings, or with food."
  },
  {
    id: 12,
    slug: "nk-defense",
    name: "NK Defence – 30 Capsules",
    dosage: "Capsule",
    packSize: "30 capsules",
    image: "/foodsupplement/nk.png",
    description: "NK Defence is a comprehensive nutritional supplement meticulously formulated by Sankara to enhance immune system activity by increasing Natural Killer (NK) cell activation and function. NK (Natural Killer) cells are a type of lymphocyte (white blood cell) that form part of the innate immune system. Composition: Yeast extract (beta-glucan 1.3/1.6), turmeric extract (standardized curcumin), vitamin C (L-ascorbic acid), zinc (picolinate form), selenium (L-selenomethionine), vitamin D (cholecalciferol), black pepper extract (standardized piperine - 95%), vegetarian DRcaps capsule (hydroxypropyl methylcellulose). GMP certified manufacturing. Patented active ingredients with enhanced bioavailability through piperine. Standardized content ensures consistent potency. Origin: Turkey (individual components sourced from various countries). No allergens.",
    category: "food-supplement",
    keyBenefits: [
      "Increases NK cell quantity and activation for enhanced immune defense",
      "Beta-glucan (1.3/1.6) provides prebiotic support and anti-inflammatory effects",
      "Curcumin offers powerful antioxidant and anti-inflammatory properties",
      "Vitamin C supports immune function, collagen synthesis, and energy metabolism",
      "Vitamin C reduces fatigue and supports nervous system health",
      "Zinc supports macronutrient metabolism and immune defense",
      "Vitamin D maintains normal muscle function and immune response",
      "Selenium and vitamin C protect cells from oxidative stress",
      "Piperine enhances bioavailability of all active compounds",
      "GMP quality assurance and patented ingredient formulation",
      "Suitable for ages 11+ and various risk groups"
    ],
    usage: "Ages 11 and above: Take 1 capsule daily on an empty stomach in the morning. Ideal for smokers, frequent illness sufferers, those with chronic fatigue, individuals with high-stress occupations, sedentary lifestyle individuals, those in poor environmental conditions, occupational chemical exposure, and those with family history of cancer. Vegetarian capsule. Not a medicine - dietary supplement for health maintenance."
  },
];

/**
 * SANKARA RESEARCH & INNOVATION
 * ========================================
 * Sankara operates advanced laboratories for:
 * - Scientific research and analysis
 * - Quality management systems
 * - Product standardization and validation
 * - Instrumental analysis
 * - Analytical services
 * 
 * All products undergo rigorous scientific testing and quality control
 * to ensure maximum efficacy and safety for consumers.
 */