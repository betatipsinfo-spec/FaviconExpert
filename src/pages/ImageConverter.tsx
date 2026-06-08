import React, { useCallback, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Download, FileType, Check, AlertCircle, RefreshCw, BookOpen, Terminal, Info, FileCode, Sun, Moon, Sparkles, ExternalLink, ArrowRight, Wand2, Smile, Type, Target, Box, Palette } from 'lucide-react';
import JSZip from 'jszip';
import { Link } from 'react-router-dom';

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
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';
import { ImplementationSteps, TechSpecsTable, KnowledgeBase } from '../components/GuideComponents';

import { FAQSection, CORE_FAQ_ITEMS } from '../components/FAQSection';
import { BrowserPreview } from '../components/BrowserPreview';

export function ImageConverterPage() {
  const { posts } = useApp();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [showGlow, setShowGlow] = useState(false);
  const [glowColor, setGlowColor] = useState('#06b6d4');
  const [glowIntensity, setGlowIntensity] = useState(15);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, SVG)');
      return;
    }
    setError(null);
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownloadZip = async () => {
    if (!preview) return;
    setIsProcessing(true);
    
    const zip = new JSZip();
    const sizes = [16, 32, 180, 192, 512];
    const img = new Image();
    img.src = preview;
    
    await new Promise((resolve) => (img.onload = resolve));
    
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d')!;

    for (const size of sizes) {
      tempCanvas.width = size;
      tempCanvas.height = size;
      ctx.clearRect(0, 0, size, size);

      const margin = showGlow ? (size * 0.1) : 0;
      const drawSize = size - (margin * 2);

      if (showGlow) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = (size * glowIntensity) / 100;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = (size * 2) / 100;
      }

      ctx.drawImage(img, margin, margin, drawSize, drawSize);
      
      const dataUrl = tempCanvas.toDataURL('image/png');
      const base64Data = dataUrl.split(',')[1];
      
      let filename = `favicon-${size}x${size}.png`;
      if (size === 180) filename = 'apple-touch-icon.png';
      if (size === 192) filename = 'android-chrome-192x192.png';
      if (size === 512) filename = 'android-chrome-512x512.png';
      
      zip.file(filename, base64Data, { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'iconforge-converted-assets.zip';
    link.click();
    setIsProcessing(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-12 space-y-12">
      <header className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="micro-label text-brand-cyan"
        >
          Asset Optimization
        </motion.div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase italic">Image-<span className="neon-text">Converter</span></h1>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Drop any high-resolution logo or image to instantly generate a complete 
            cross-platform favicon package. All processing happens securely in your browser.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Upload Zone */}
        <div className="space-y-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={cn(
              "border-2 border-dashed glass-panel p-12 flex flex-col items-center justify-center space-y-8 transition-all min-h-[440px] tool-card",
              file ? "border-brand-cyan/50 bg-brand-cyan/5" : "border-white/5 hover:border-white/20"
            )}
            id="image-dropzone"
          >
            <div className="w-20 h-20 rounded-3xl bg-brand-dark/50 border border-white/5 flex items-center justify-center shadow-2xl">
              {file ? <Check className="w-10 h-10 text-brand-cyan" /> : <Upload className="w-10 h-10 text-slate-500" />}
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-xl font-bold font-display text-white italic">
                {file ? file.name : "System Ingestion Point"}
              </p>
              <p className="micro-label">SVG, PNG, JPG or WebP (Max 5MB)</p>
            </div>

            <input 
              type="file" 
              className="hidden" 
              id="file-input" 
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <label 
              htmlFor="file-input"
              className="px-10 py-3 bg-white text-black font-black text-[10px] rounded uppercase tracking-widest hover:bg-slate-200 transition-all cursor-pointer shadow-xl shadow-white/5"
            >
              Select Source
            </label>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Background Glow Controls */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="micro-label text-white !text-xs">Background Glow</h3>
              <button 
                onClick={() => setShowGlow(!showGlow)}
                className={cn(
                  "w-8 h-4 rounded-full transition-colors relative",
                  showGlow ? "bg-brand-purple" : "bg-white/10"
                )}
                id="toggle-image-bg-glow"
              >
                <div className={cn(
                  "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                  showGlow ? "right-0.5" : "left-0.5"
                )} />
              </button>
            </div>
            
            {showGlow && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="micro-label !text-[8px]">Glow Color</label>
                  <input 
                    type="color"
                    value={glowColor}
                    onChange={(e) => setGlowColor(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer bg-transparent border border-white/5"
                    id="input-image-glow-color"
                  />
                </div>
                <div className="space-y-1">
                  <label className="micro-label !text-[8px] flex justify-between">Intensity <span>{glowIntensity}px</span></label>
                  <input 
                    type="range"
                    min="0"
                    max="50"
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(Number(e.target.value))}
                    className="w-full accent-brand-purple h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    id="input-image-glow-blur"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="p-8 glass-panel space-y-6">
            <h4 className="micro-label text-white">Asset Manifest Details</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[11px] font-medium">
              <li className="flex items-center space-x-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                <span>favicon.ico (32x32px)</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                <span>apple-touch-icon.png</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                <span>android-chrome (512px)</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>site.webmanifest (JSON)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={cn("space-y-8 transition-opacity duration-500", preview ? "opacity-100" : "opacity-30 pointer-events-none")}>
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                <span className="micro-label !text-[8px] text-white uppercase tracking-widest">Live Environment Simulation</span>
              </div>
              
              <div className="flex items-center bg-brand-dark/50 rounded-full border border-white/5 p-1">
                <button 
                  onClick={() => setShowGlow(!showGlow)}
                  className={cn(
                    "p-1.5 rounded-full transition-all mr-1",
                    showGlow ? "bg-brand-purple/20 text-brand-purple" : "text-slate-500 hover:text-white"
                  )}
                  title="Toggle Glow"
                  id="toggle-image-glow"
                >
                  <Sparkles className="w-3 h-3" />
                </button>
                <div className="w-px h-3 bg-white/10 mr-1" />
                <button 
                  onClick={() => setPreviewTheme('light')}
                  className={cn(
                    "p-1.5 rounded-full transition-all",
                    previewTheme === 'light' ? "bg-white text-brand-dark" : "text-slate-500 hover:text-white"
                  )}
                  id="preview-theme-light-image"
                >
                  <Sun className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => setPreviewTheme('dark')}
                  className={cn(
                    "p-1.5 rounded-full transition-all",
                    previewTheme === 'dark' ? "bg-brand-cyan text-brand-dark" : "text-slate-500 hover:text-white"
                  )}
                  id="preview-theme-dark-image"
                >
                  <Moon className="w-3 h-3" />
                </button>
              </div>
            </div>
            <BrowserPreview 
              mode="image" 
              theme={previewTheme} 
              customImage={preview} 
              imageGlow={{
                enabled: showGlow,
                color: glowColor,
                intensity: glowIntensity
              }}
            />
          </div>

          <div className={cn(
            "glass-panel p-12 flex flex-col items-center justify-center space-y-12 relative overflow-hidden group transition-colors duration-500",
            previewTheme === 'light' ? "bg-slate-100/50" : ""
          )}>
            {showGlow && (
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[100px] pointer-events-none transition-all duration-1000 opacity-60 animate-pulse"
                style={{ 
                  width: `${glowIntensity * 4 + 100}px`, 
                  height: `${glowIntensity * 4 + 100}px`,
                  backgroundColor: glowColor 
                }} 
              />
            )}
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[80px] pointer-events-none transition-all duration-1000",
              previewTheme === 'dark' ? "bg-brand-cyan/5 group-hover:bg-brand-purple/5" : "bg-brand-cyan/10 opacity-50"
            )} />
            
            <div className="relative">
              {preview ? (
                <img src={preview} alt="Preview" className="w-32 h-32 object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-brand-dark/50 border border-white/5 relative" />
              )}
              <div className={cn("absolute -bottom-4 -right-4 micro-label !text-[8px] glass-panel px-2 py-0.5 z-20 transition-colors", previewTheme === 'dark' ? "text-slate-500" : "text-slate-400")}>Preview Model</div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold font-display text-white italic">Architectural Expanded Assets</h3>
              <p className="micro-label">Ready for multi-format production deployment</p>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={!preview || isProcessing}
              className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-3 hover:scale-105 transition-all disabled:opacity-50 shadow-2xl shadow-brand-purple/20"
              id="btn-download-image-bundle"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>Generate Favicon Package</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Tools & Resources */}
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

      {/* Integration Guides */}
      <div className="pt-24 space-y-24">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
        
        <header className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-4 mx-auto">
            <BookOpen className="w-3 h-3" />
            <span>Developer Documentation</span>
          </div>
          <h2 className="text-4xl font-display font-black tracking-tight text-white text-center">Implementation Guide.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-center">Detailed technical specifications and deployment instructions for your converted assets.</p>
        </header>

        {/* Quick Start Steps */}
        <div className="space-y-12 w-full">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 border-l-2 border-brand-purple pl-4">Deployment Workflow</h3>
          <ImplementationSteps steps={[
            {
              icon: Terminal,
              title: "1. Asset Deployment",
              content: "After downloading your icon package, extract the contents into the root directory of your project folder.",
            },
            {
              icon: Info,
              title: "2. Root Directives",
              content: "Ensure all files (favicon.ico, apple-touch-icon.png, etc.) are at the same level as your top-level index.html.",
            },
            {
              icon: FileCode,
              title: "3. Header Integration",
              content: "Paste the following HTML code snippets inside the <head> block of your webpage to enable cross-platform assets.",
              code: `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="manifest" href="/site.webmanifest">`
            }
          ]} />
        </div>

        {/* Technical Specifications Table */}
        <div className="space-y-8 w-full">
          <div className="flex items-center space-x-4">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap text-center">Technical Specs</h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <TechSpecsTable />
        </div>

        {/* KB Articles */}
        <div className="space-y-12 w-full pb-20 border-b border-white/5">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 border-l-2 border-brand-cyan pl-4 text-left">Optimization Articles</h3>
          <KnowledgeBase posts={posts} />
        </div>

        <div className="pb-20 w-full">
          <FAQSection items={CORE_FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
