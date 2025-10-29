export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Shipping Terms & Conditions</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Welcome to My Body Healer. We aim to deliver your products in the safest and fastest way possible.
        By placing an order on our website, you agree to the shipping terms mentioned below.
      </p>

      <h2 className="text-xl font-semibold text-emerald-700 mt-6 mb-2">Processing Time</h2>
      <p className="text-gray-700 leading-relaxed">
        • Orders are processed within 1-2 business days.<br />
        • Orders placed on Sundays or public holidays will be processed on the next business day.
      </p>

      <h2 className="text-xl font-semibold text-emerald-700 mt-6 mb-2">Delivery Time</h2>
      <p className="text-gray-700 leading-relaxed">
        • Standard delivery time: 3-7 business days depending on city/location.<br />
        • International delivery: 10-18 business days depending on customs clearance.
      </p>

      <h2 className="text-xl font-semibold text-emerald-700 mt-6 mb-2">Shipping Charges</h2>
      <p className="text-gray-700 leading-relaxed">
        • Free shipping on orders above PKR 4,500.<br />
        • Orders below PKR 4,500 will be charged at standard courier rates.
      </p>

      <h2 className="text-xl font-semibold text-emerald-700 mt-6 mb-2">Tracking & Updates</h2>
      <p className="text-gray-700 leading-relaxed">
        • Once an order is shipped, a tracking number will be sent via Email or WhatsApp.<br />
        • You can track your package any time from the courier tracking link.
      </p>

      <h2 className="text-xl font-semibold text-emerald-700 mt-6 mb-2">Delay Disclaimer</h2>
      <p className="text-gray-700 leading-relaxed">
        • Public holidays, weather, strikes or customs delays are beyond our control.<br />
        • Exact delivery date cannot be guaranteed.
      </p>

      <p className="text-gray-700 mt-8">
        For shipping-related questions, please contact us at:  
        <strong className="text-emerald-700"> info@mybodyhealer.com</strong>
      </p>
    </div>
  );
}
