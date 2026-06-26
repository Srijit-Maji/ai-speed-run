/* eslint-disable */
import Pricing from '../components/Pricing';
import BentoFeatures from '../components/BentoFeatures';

export default function LandingPage() {
  return (
    <>
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-black tracking-tighter">AI Platform</h1>
        <nav>
          <img src="/globe.svg" alt="AI Platform Logo" className="w-10 h-10" />
        </nav>
      </header>

      {/* Semantic DOM Layout over deep div nesting */}
      <main className="min-h-screen">
        
        {/* Hero Section */}
        <section className="text-center py-32 px-4">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Automate Your Data.
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Next-gen architecture for unparalleled speed.
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover-micro hover:scale-105">
            Start Speed Run
          </button>
        </section>

        <BentoFeatures />
        <Pricing />

      </main>

      <footer className="text-center py-10 text-gray-400">
        <p>© 2026 AI Platform.</p>
      </footer>
    </>
  );
}