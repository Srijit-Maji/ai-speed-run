"use client";
import { useRef, useEffect } from 'react';

// Multi-dimensional configuration object 
const pricingMatrix = {
  baseRates: { starter: 29, pro: 99, enterprise: 299 },
  regionalTariffs: {
    USD: { symbol: '$', multiplier: 1 },
    EUR: { symbol: '€', multiplier: 0.92 },
    INR: { symbol: '₹', multiplier: 83.5 },
  },
  annualDiscountMultiplier: 0.8, // 20% discount 
};

export default function Pricing() {
  const priceNodes = {
    starter: useRef(null),
    pro: useRef(null),
    enterprise: useRef(null),
  };
  
  const formRef = useRef(null);

  const calculateAndInjectPrices = () => {
    const formData = new FormData(formRef.current);
    const currency = formData.get('currency');
    const isAnnual = formData.get('billing') === 'annual';

    const tariff = pricingMatrix.regionalTariffs[currency];

    // Isolate updates strictly to DOM text nodes [cite: 23, 30]
    Object.keys(priceNodes).forEach((tier) => {
      if (priceNodes[tier].current) {
        let price = pricingMatrix.baseRates[tier] * tariff.multiplier;
        if (isAnnual) price *= pricingMatrix.annualDiscountMultiplier;
        
        priceNodes[tier].current.textContent = `${tariff.symbol}${price.toFixed(2)}`;
      }
    });
  };

  useEffect(() => {
    calculateAndInjectPrices(); // Initial load
  }, []);

  return (
    <section id="pricing" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Transparent Pricing</h2>
        
        {/* Form controls to avoid React re-renders [cite: 22, 23] */}
        <form ref={formRef} onChange={calculateAndInjectPrices} className="flex justify-center gap-6">
          <select name="currency" className="p-2 border rounded hover-micro">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
          </select>

          <div className="flex gap-4 items-center">
            <label><input type="radio" name="billing" value="monthly" defaultChecked /> Monthly</label>
            <label><input type="radio" name="billing" value="annual" /> Annual (20% Off)</label>
          </div>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Render Pricing Cards */}
        {Object.keys(priceNodes).map((tier) => (
          <div key={tier} className="p-6 border rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 hover-micro">
            <h3 className="text-xl font-semibold capitalize">{tier}</h3>
            <p className="text-4xl font-bold mt-4 layout-transition" ref={priceNodes[tier]}>
              {/* Value injected via ref to prevent component reflow  */}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}