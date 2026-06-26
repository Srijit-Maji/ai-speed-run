import { useEffect, useState, useRef } from 'react';

const features = [
  { id: 1, title: 'Neural Routing', content: 'Intelligent data pathways.' },
  { id: 2, title: 'Auto-Scaling', content: 'Zero downtime expansion.' },
  { id: 3, title: 'Data Encryption', content: 'Military grade security.' }
];

export default function BentoFeatures() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleResize = (e) => {
      // Transfer exact active index context over to mobile Accordion state
      if (e.matches && activeIndex !== null) {
        const detailElement = document.getElementById(`accordion-${activeIndex}`);
        if (detailElement) detailElement.setAttribute('open', 'true');
      }
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [activeIndex]);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto bg-gray-50 rounded-2xl">
      <h2 className="text-3xl font-bold mb-10 text-center">Core Features</h2>
      
      {/* Desktop Bento Grid - Hidden on mobile */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 layout-transition">
        {features.map((feature, index) => (
          <div 
            key={feature.id}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`p-8 rounded-xl border bg-white hover-micro ${activeIndex === index ? 'shadow-xl scale-105 ring-2 ring-blue-500' : 'shadow-sm'}`}
          >
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.content}</p>
          </div>
        ))}
      </div>

      {/* Mobile Accordion - Hidden on desktop */}
      <div className="md:hidden space-y-4 layout-transition">
        {features.map((feature, index) => (
          <details 
            key={feature.id} 
            id={`accordion-${index}`}
            className="group border rounded-lg bg-white p-4"
          >
            <summary className="font-bold text-lg cursor-pointer flex justify-between">
              {feature.title}
              <span className="group-open:rotate-180 hover-micro">▼</span>
            </summary>
            <p className="mt-4 text-gray-600 layout-transition">{feature.content}</p>
          </details>
        ))}
      </div>
    </section>
  );
}