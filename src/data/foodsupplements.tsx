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
    description: "Mormiks is a functional food mixture developed for use in flour products and desserts, containing standardized anthocyanins extracted from purple fruits and vegetables including black carrot, blackberry, pomegranate, and cherry. Unlike fruit powders, Sankara's Mormiks uses extracted and purified active compounds with standardized content. 100g Mormiks contains at least 1000mg of standardized anthocyanins.",
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
    usage: "Mix 8% with flour for bread and other flour products, or 12% in desserts and sweet applications. Does not alter taste, aroma, or food quality. Yellow-orange color that blends naturally.",
    composition: "Fruit and Vegetable Extracts (40%) - Black carrot extract, Blackberry extract, Pomegranate extract, Cherry extract\nMaize Starch (Carrier)\n\nStandardized Content: At least 1000mg anthocyanins per 100g\nNo allergens • Vegan • Gluten-free • No added sugar",
    intendedUsage: "Mix 8% with flour for bread and flour products (20g per 1kg flour)\nMix 12% in desserts and sweet applications (120g per 1kg dough)\n\nDoes not change taste or aroma. Provides natural purple/red color enhancement.",
    certificates: [
      "Vegan Certified",
      "Gluten-Free",
      "No Added Sugar",
      "Turkish Food Code Compliant",
      "GMP Manufacturing"
    ],
    origin: "Turkey (Purple fruit extracts sourced from Mediterranean region)",
    technicalInfo: "Anthocyanins: Minimum 1000mg per 100g (standardized)\nMoisture: < 5%\nParticle Size: Fine powder for easy incorporation\nColor: Purple to dark purple\nOdor: Characteristic of fruit extracts\nTaste: Mild, slightly fruity"
  },
  {
    id: 9,
    slug: "zeredemiks",
    name: "Zerdemiks – 300 g",
    dosage: "Powder",
    packSize: "300g",
    image: "/b5.avif",
    description: "Zerdemiks is a functional food mixture developed from turmeric root, containing high-purity standardized curcumin for use in flour products and desserts. Unlike regular turmeric (which contains ~10mg curcumin per gram), Sankara's Zerdemiks contains 50mg curcumin per gram - 5x higher concentration. 100g Zerdemiks contains at least 5000mg of standardized curcumin.",
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
    usage: "Mix 2% ratio (20g per 1kg flour or 1 liter milk) into bread, pasta, mantı, simit, baklava, cookies, cake, and desserts. Provides yellow-orange color without affecting taste or aroma.",
    composition: "Turmeric Extract (12% standardized curcumin)\nMaize Starch (Carrier)\nGum Arabic\n\nStandardized Content: At least 5000mg curcumin per 100g (50mg per 1g)\nNo allergens • Vegan • Gluten-free • No added sugar",
    intendedUsage: "Mix 2% ratio into flour-based products:\n- Bread: 20g per 1kg flour\n- Pasta: 20g per 1kg flour\n- Milk-based products: 20g per 1L milk\n- Desserts and bakery: 2% ratio\n\nUsage Ratio: 20g Zerdemiks per 1kg flour/base ingredient",
    certificates: [
      "Vegan Certified",
      "Gluten-Free",
      "No Added Sugar",
      "Turkish Food Code Compliant",
      "GMP Manufacturing",
      "Standardized Curcumin Content"
    ],
    origin: "Turkey (Turmeric root sourced from India, standardized in Turkey)",
    technicalInfo: "Curcumin Content: Minimum 5000mg per 100g (standardized)\nCurcumin Concentration: 50mg per 1g (vs 10mg per 1g in regular turmeric)\nMoisture: < 5%\nParticle Size: Fine powder for easy incorporation\nColor: Yellow-orange\nOdor: Characteristic turmeric aroma\nTaste: Mild turmeric flavor\nSolubility: Best when mixed into flour or oil-based preparations"
  },
  {
    id: 10,
    slug: "lifmo",
    name: "Lifmo – 210 g",
    dosage: "Powder",
    packSize: "210g",
    image: "/b3.avif",
    description: "Lifmo is a functional food mixture combining purple fruit anthocyanins with prebiotic fiber sources. Specially formulated to meet 30% of daily fiber requirements. 1 serving (10g) contains at least 100mg standardized anthocyanins. 150g Lifmo contains 1500mg anthocyanins and 110g dietary fiber.",
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
    usage: "Mix 1 serving (10g) daily in yogurt, smoothies, milk, kefir, oat porridge, or beverages. Recommended: 2 teaspoons (5g) morning and 2 teaspoons (5g) evening. Psyllium may cause quick thickening - consume promptly.",
    composition: "Fiber Mixture (83%)\n  - Inulin (prebiotic fiber)\n  - Psyllium Husk (soluble fiber)\n\nPurple Fruit and Vegetable Extract Mixture (16%)\n  - Black Carrot Extract\n  - Blackberry Extract\n  - Aronia Extract\n  - Freeze-Dried Strawberry\n\nStandardized Content: At least 100mg anthocyanins per 10g serving\nDaily Serving: 1 portion (10g) provides 30% of daily fiber needs (110g per 150g)\nNo allergens • Vegan • Gluten-free • No added sugar",
    intendedUsage: "Daily Consumption: 1 serving (10g) per day\nRecommended Schedule: 2 teaspoons (5g) in the morning, 2 teaspoons (5g) in the evening\n\nMix into:\n- Plain yogurt or Greek yogurt\n- Fruit smoothies\n- Milk (regular or plant-based)\n- Kefir\n- Oat porridge\n- Water or herbal tea\n\nNote: Psyllium content causes thickening - consume mixture shortly after preparation for best texture.",
    certificates: [
      "Vegan Certified",
      "Gluten-Free",
      "No Added Sugar",
      "Turkish Food Code Compliant",
      "High Fiber Content",
      "Prebiotic Fiber Certified"
    ],
    origin: "Turkey (Purple fruit extracts sourced from Mediterranean region)",
    technicalInfo: "Anthocyanins: Minimum 100mg per 10g serving (1500mg per 150g)\nTotal Dietary Fiber: 110g per 150g serving\nInulin (soluble prebiotic): Present\nPsyllium Husk (soluble): Present\nMoisture: < 5%\nParticle Size: Fine powder mixed with whole psyllium husks\nFiber Type: Both soluble and insoluble\nColor: Purple/dark purple\nOdor: Characteristic of berry extracts\nTaste: Fruity, slightly sweet (available flavored or unflavored)"
  },
  {
    id: 11,
    slug: "olive-oil",
    name: "Sankara Olive Oil – Premium Selection",
    dosage: "Liquid",
    packSize: "250ml / 500ml",
    image: "/olive2.avif",
    description: "Premium extra virgin olive oil from Sankara enriched with standardized olive leaf (oleuropein) and turmeric (curcumin) extracts. Early harvest, cold-pressed natural flavored olive oil with intensive polyphenol content. Available in two potency variants: Essence (+750 mg/kg polyphenols) and Intense (+1500 mg/kg polyphenols).",
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
    usage: "Consume 2 tablespoons (20ml) daily on empty stomach or with meals. Children: 1 teaspoon (5ml) daily. For best results, consume raw without heating. Use in salads, dressings, or with food.",
    composition: "Natural Extra Virgin Olive Oil (cold-pressed)\n\nEnrichment Extract (varies by variant):\n\nESSENCE Variant:\n- 750mg/kg Polyphenols\n- 250mg Curcumin (turmeric extract)\n- 100mg Oleuropein (olive leaf extract)\n\nINTENSE Variant:\n- 1500mg/kg Polyphenols\n- 500mg Curcumin (turmeric extract)\n- 200mg Oleuropein (olive leaf extract)\n\nNo allergens • No additives • Extra virgin quality",
    intendedUsage: "Daily Dosage: 2 tablespoons (20ml) per day\n\nOptions:\n- Take 2 tablespoons on empty stomach in the morning\n- Take with meals throughout the day\n- Children: 1 teaspoon (5ml) daily\n\nUsage Guidelines:\n- Consume raw without heating for maximum benefits\n- Use in salads and dressings\n- Add to soups, yogurt, or smoothies\n- FDA recommendation: 20ml daily supports heart health\n- EFSA recommendation: 5mg hydroxytyrosol derivatives in 20g olive oil maintains blood lipid health",
    certificates: [
      "Extra Virgin Quality",
      "Cold-Pressed",
      "TURKAK Accredited Analysis (TS EN ISO/IEC 17025:2017)",
      "Turkish Food Code Compliant",
      "No Additives or Preservatives",
      "Certified Polyphenol Content"
    ],
    origin: "Turkey (Olive oil from Mediterranean region, turmeric from India, processed in Turkey)",
    technicalInfo: "Oleic Acid (Monounsaturated Fat): > 70%\nFree Acidity: < 0.8% (oleic acid)\nPeroxide Value: < 20 meq/kg\nPolyphenol Content: 750-1500 mg/kg (variant-dependent)\nCurcumin: 250-500mg per bottle\nOleuropein: 100-200mg per bottle\nColor: Golden-yellow with greenish tint\nOdor: Characteristic olive oil with fruity notes\nTaste: Mild, fruity, slightly peppery\nStorage: Protect from light, store at room temperature (15-25°C)"
  },
  {
    id: 12,
    slug: "nk-defense",
    name: "NK Defence – 30 Capsules",
    dosage: "Capsule",
    packSize: "30 capsules",
    image: "/foodsupplement/nk.png",
    description: "NK Defence is a comprehensive nutritional supplement meticulously formulated by Sankara to enhance immune system activity by increasing Natural Killer (NK) cell activation and function. NK (Natural Killer) cells are a type of lymphocyte (white blood cell) that form part of the innate immune system.",
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
    usage: "Ages 11 and above: Take 1 capsule daily on an empty stomach in the morning. Ideal for smokers, frequent illness sufferers, those with chronic fatigue, individuals with high-stress occupations, sedentary lifestyle individuals, those in poor environmental conditions, occupational chemical exposure, and those with family history of cancer.",
    composition: "Per Capsule (30 capsules per box):\n\nYeast Extract (Beta-Glucan 1.3/1.6)\nTurmeric Extract (Curcumin - standardized)\nVitamin C (L-Ascorbic Acid)\nZinc (Zinc Picolinate - highly absorbable form)\nSelenium (L-Selenomethionine - organic form)\nVitamin D (Cholecalciferol - Vitamin D3)\nBlack Pepper Extract (Standardized Piperine 95%)\n\nCapsule: Vegetarian DRcaps (Hydroxypropyl Methylcellulose)\n\nNo allergens • Vegetarian • Patented ingredients",
    intendedUsage: "Age Groups & Dosage:\n\nAges 11 and above:\n- Dosage: 1 capsule per day\n- Time: Empty stomach in the morning\n- Duration: Take daily for optimal immune support\n\nIdeal for:\n- Smokers (nicotine depletes immune function)\n- Frequent illness sufferers (support natural defenses)\n- Chronic fatigue (immune system rebalancing)\n- High-stress occupations (stress weakens immunity)\n- Sedentary lifestyle individuals (lack of exercise lowers immunity)\n- Poor environmental conditions (air quality, pollution)\n- Occupational chemical exposure\n- Family history of cancer (preventive support)\n\nNote: Not a medicine - dietary supplement for health maintenance",
    certificates: [
      "GMP Manufacturing",
      "Patented Active Ingredients",
      "Vegetarian Formula",
      "Turkish Food Code Compliant",
      "Standardized Ingredient Content",
      "DR Caps Technology (stomach acid resistant)"
    ],
    origin: "Turkey (Individual components sourced from multiple countries, assembled and encapsulated in Turkey)",
    technicalInfo: "Active Ingredients per Capsule:\n\nBeta-Glucan (1.3/1.6 ratio): Standardized content\nCurcumin: Standardized turmeric extract\nVitamin C: 75-100mg (typical)\nZinc (Picolinate): Highly bioavailable form\nSelenium (L-Selenomethionine): Organic bound form\nVitamin D3 (Cholecalciferol): Standardized content\nPiperine (Black Pepper Extract): 95% standardized\n\nCapsule Type: DRcaps (Delayed-Release)\n- Stomach acid resistant\n- Releases in intestinal tract\n- Enhanced bioavailability\n- Vegetarian-friendly\n\nManufacturing: GMP Certified\nStability: Room temperature storage (15-25°C)\nShelf Life: Typically 2 years from manufacture date"
  }
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