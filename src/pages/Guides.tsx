import React from 'react';
import { BookOpen, Info, FileCode, Terminal, Layers, ExternalLink, ArrowRight, Type, Smile, Sparkles, Box, Palette, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ImplementationSteps, TechSpecsTable, KnowledgeBase } from '../components/GuideComponents';

function ResourceCard({ title, description, icon: Icon, link }: any) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="glass-panel p-6 flex flex-col gap-4 group hover:border-brand-cyan/20 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="w-3 h-3 text-brand-cyan" />
      </div>
      
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-cyan/20 group-hover:bg-brand-cyan/5 transition-all">
        <Icon className="w-5 h-5 text-slate-400 group-hover:text-brand-cyan transition-colors" />
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">{title}</h3>
        <p className="text-[11px] text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div className="mt-2 pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-cyan transition-colors">
        <span>Explore Resource</span>
        <ArrowRight className="w-2 h-2" />
      </div>
    </a>
  );
}

export function GuidesPage() {
  const { posts } = useApp();

  const steps = [
    {
      icon: Terminal,
      title: "1. Extract the Bundle",
      content: "After downloading your icon package, extract the contents into the root directory of your project folder.",
    },
    {
      icon: Info,
      title: "2. Clean Root Placement",
      content: "Ensure all files (favicon.ico, apple-touch-icon.png, site.webmanifest, etc.) are at the same level as your index.html.",
    },
    {
      icon: FileCode,
      title: "3. Link in Header",
      content: "Paste the following HTML code snippets inside the <head> block of your webpage to enable cross-platform assets.",
      code: `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">`
    }
  ];

  return (
    <div className="w-full px-4 py-20 space-y-24">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-4">
          <BookOpen className="w-3 h-3" />
          <span>Documentation Hub</span>
        </div>
        <h1 className="text-6xl font-display font-black tracking-tight text-white">System Guides.</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Detailed integration hub for technical implementation and asset management.</p>
      </header>

      <div className="space-y-12">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 border-l-2 border-brand-purple pl-4">Quick Start Implementation</h2>
        <ImplementationSteps steps={steps} />
      </div>

      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <div className="h-px bg-white/10 flex-1" />
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">Technical Specifications</h2>
          <div className="h-px bg-white/10 flex-1" />
        </div>
        <TechSpecsTable />
      </div>

      <div className="space-y-12">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 border-l-2 border-brand-cyan pl-4">Knowledge Base Articles</h2>
        <KnowledgeBase posts={posts} />
      </div>

      <div className="pt-24 space-y-12">
        <div className="flex items-end justify-between border-b border-white/5 pb-4">
          <div>
            <span className="micro-label">Studio Ecosystem</span>
            <h2 className="text-2xl font-black font-display uppercase tracking-widest mt-1">Related Tools & Resources</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/create-text" className="glass-panel p-6 flex flex-col gap-4 group hover:border-brand-purple/20 transition-all">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-purple/20 group-hover:bg-brand-purple/5 transition-all">
              <Type className="w-5 h-5 text-slate-400 group-hover:text-brand-purple transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-brand-purple transition-colors">Text Studio</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">Design custom typographic assets and brand icons.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-purple transition-colors">
              <span>Open Studio</span>
              <ArrowRight className="w-2 h-2" />
            </div>
          </Link>

          <Link to="/explore-emojis" className="glass-panel p-6 flex flex-col gap-4 group hover:border-brand-cyan/20 transition-all">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-cyan/20 group-hover:bg-brand-cyan/5 transition-all">
              <Smile className="w-5 h-5 text-slate-400 group-hover:text-brand-cyan transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">Emoji Studio</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">Create favicons from our premium vector emoji library.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-cyan transition-colors">
              <span>Open Studio</span>
              <ArrowRight className="w-2 h-2" />
            </div>
          </Link>

          <a 
            href="https://flatpalette.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-panel p-6 flex flex-col gap-4 group hover:border-brand-purple/20 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-purple/20 group-hover:bg-brand-purple/5 transition-all">
              <Sparkles className="w-5 h-5 text-slate-400 group-hover:text-brand-purple transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-brand-purple transition-colors">Advance Palettes</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">Professional color tools for modern web interfaces.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-purple transition-colors">
              <span>Explore Resource</span>
              <ArrowRight className="w-2 h-2" />
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard 
            title="Free Icon Gallery"
            description="Customize and export over 10,000+ vector icons."
            icon={Box}
            link="https://templatemind.com/tools/icons"
          />
          <ResourceCard 
            title="Free Color Palettes"
            description="Premium color combinations for UI design."
            icon={Palette}
            link="https://templatemind.com/tools/color-palettes"
          />
          <ResourceCard 
            title="Free UI Resources"
            description="Curated layout cards and interface components."
            icon={Target}
            link="https://templatemind.com/"
          />
        </div>
      </div>
    </div>
  );
}
