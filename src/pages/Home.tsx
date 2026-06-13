import React from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Wand2, Smile, Image as ImageIcon, ArrowRight, Zap, Target, Box, ExternalLink, Palette, Type, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FONT_PAIRINGS, cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

import { FAQSection, CORE_FAQ_ITEMS } from '../components/FAQSection';
import { DesignResourcesSection } from '../components/DesignResources';

export function Home() {
  const { siteConfig } = useApp();

  return (
    <div className="space-y-12 pb-20 relative">
      <div className="glow-bg" />
      
      {/* Hero Section */}
      {siteConfig.toggles.hero && (
        <section className="relative px-4 sm:px-6 md:px-8 pt-12 pb-20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 text-white">
          <div className="max-w-xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="micro-label text-brand-cyan"
            >
              v2.4 Production Ready
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]"
            >
              The Speed Tier for <span className="italic">Icon <span className="neon-text">Architecture.</span></span>
            </motion.h1>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Instant asset generation with modular control. Design, preview, and export 
              complete production-ready favicon bundles in 12ms.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/create-text"
                className="bg-white text-black font-black px-8 py-3 rounded text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
              >
                Start Creating
              </Link>
              <Link 
                to="/guides"
                className="glass-panel px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-white"
              >
                View Documentation
              </Link>
            </div>
          </div>

          {/* Hero Preview Box */}
          <div className="flex-1 w-full h-[300px] glass-panel flex flex-col items-center justify-center relative group overflow-hidden border-brand-purple/10">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="w-32 h-32 bg-brand-dark/80 backdrop-blur-3xl rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
              <Zap className="w-12 h-12 text-brand-cyan" />
            </div>
            <div className="mt-4 micro-label z-10 transition-colors group-hover:text-white">Live Canvas Preview</div>
          </div>
        </section>
      )}

      {/* Generator Suite Grid */}
      {siteConfig.toggles.generators && (
        <section className="px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <GeneratorCard 
            title="Text-to-Favicon"
            description="Craft typography based icons with custom gradients and fonts."
            icon={Wand2}
            status="Active"
            color="cyan"
            link="/create-text"
          />
          <GeneratorCard 
            title="Emoji-to-Favicon"
            description="Pick from thousands of system emojis and render instantly."
            icon={Smile}
            status="Stable"
            color="purple"
            link="/explore-emojis"
          />
          <GeneratorCard 
            title="Image Converter"
            description="Client-side conversion for logos and existing brand assets."
            icon={ImageIcon}
            status="Optimization"
            color="slate"
            link="/image-converter"
            isDashed
          />
        </section>
      )}


      {/* FAQ Section */}
      {siteConfig.toggles.guides && (
        <section className="w-full px-4 sm:px-6 md:px-8">
          <FAQSection items={CORE_FAQ_ITEMS} />
        </section>
      )}

      {/* External Resources */}
      <section className="px-4 sm:px-6 md:px-8 pb-20">
        <DesignResourcesSection />
      </section>
    </div>
  );
}

function GeneratorCard({ title, description, icon: Icon, color, link, isDashed, status }: any) {
  const statusColors: any = {
    cyan: 'bg-brand-cyan',
    purple: 'bg-brand-purple',
    slate: 'bg-slate-500',
  };

  return (
    <Link to={link} className={cn(
      "glass-panel tool-card p-6 flex flex-col gap-6 relative group",
      isDashed && "border-dashed border-2"
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-white group-hover:neon-text transition-all">{title}</h3>
          <p className="text-sm text-slate-400 leading-tight pr-4">{description}</p>
        </div>
        <div className={cn("w-2 h-2 rounded-full", statusColors[color])} />
      </div>
      
      <div className="mt-auto flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-dark bg-white/5 flex items-center justify-center">
              <div className={cn("w-2 h-2 rounded-full", statusColors[color], "opacity-50")} />
            </div>
          ))}
        </div>
        <button className="micro-label opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
          Launch Studio →
        </button>
      </div>
    </Link>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return <ArrowRight className={className} />;
}
