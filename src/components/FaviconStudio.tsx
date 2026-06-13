import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Download, FileJson, Settings, Palette, Sun, Moon, Search, ExternalLink, ArrowRight, Wand2, Smile, Type, Target, Box, Sparkles, Image as ImageIcon } from 'lucide-react';
import JSZip from 'jszip';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { generateFaviconDataUrl, generateFaviconSvg, cn, AESTHETIC_PRESETS } from '../lib/utils';
import { BrowserPreview } from './BrowserPreview';
import { ImplementationSteps, TechSpecsTable, KnowledgeBase } from './GuideComponents';
import { Info, Terminal, BookOpen, Layers, X, FileCode } from 'lucide-react';
import { EMOJI_GROUPS } from '../data/emojis';

interface PreviewProps {
  mode: 'text' | 'emoji';
}

function ResourceItem({ title, description, icon: Icon, link }: any) {
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

export function FaviconStudio({ mode }: PreviewProps) {
  const { settings, setSettings, posts } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const glowY = useTransform(smoothProgress, [0, 1], ["-80%", "-20%"]);
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.6, 0.8]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const [previewSize, setPreviewSize] = useState(256);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [isDownloading, setIsDownloading] = useState(false);
  const [emojiSearch, setEmojiSearch] = useState('');

  const filteredEmojis = useMemo(() => {
    if (!emojiSearch) return [];
    return EMOJI_GROUPS.flatMap(g => g.items).filter(e => e.includes(emojiSearch));
  }, [emojiSearch]);

  useEffect(() => {
    if (canvasRef.current) {
      generateFaviconDataUrl(canvasRef.current, 512, settings, mode);
    }
  }, [settings, mode]);

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    const zip = new JSZip();
    const sizes = [16, 32, 180, 192, 512];
    const tempCanvas = document.createElement('canvas');

    // Add PNGs
    for (const size of sizes) {
      const dataUrl = generateFaviconDataUrl(tempCanvas, size, settings, mode);
      const base64Data = dataUrl.split(',')[1];
      let filename = `favicon-${size}x${size}.png`;
      if (size === 180) filename = 'apple-touch-icon.png';
      if (size === 192) filename = 'android-chrome-192x192.png';
      if (size === 512) filename = 'android-chrome-512x512.png';
      
      zip.file(filename, base64Data, { base64: true });
    }

    // Add SVG
    const svgStr = generateFaviconSvg(settings, mode);
    zip.file('favicon.svg', svgStr);

    // Add ICO (simplified as a 32x32 png for this exercise)
    const icoUrl = generateFaviconDataUrl(tempCanvas, 32, settings, mode);
    zip.file('favicon.ico', icoUrl.split(',')[1], { base64: true });

    // Add Manifest
    const manifest = {
      name: "faviconExpert App",
      short_name: "faviconExpert",
      icons: [
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
      ],
      theme_color: settings.backgroundColor,
      background_color: settings.backgroundColor,
      display: "standalone"
    };
    zip.file('site.webmanifest', JSON.stringify(manifest, null, 2));

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'favicon-package.zip';
    link.click();
    setIsDownloading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4 sm:py-8">
      {/* Controls */}
      <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
        {/* Aesthetic Presets */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-brand-purple" />
            <h3 className="micro-label text-white !text-xs">Aesthetic Presets</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {AESTHETIC_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setSettings({
                  ...settings,
                  backgroundColor: p.bg,
                  textColor: p.text,
                  gradientColors: p.gradient,
                  gradientType: p.type as any,
                  shadowColor: p.shadow,
                  showShadow: true,
                  shadowBlur: 15,
                  shadowOffsetY: 4
                })}
                className="group relative flex flex-col items-center justify-center p-3 rounded-lg border border-white/5 bg-brand-dark/30 hover:border-brand-purple/50 transition-all text-left"
              >
                <div className="flex -space-x-1 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.gradient[0] }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.gradient[1] }} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-400 group-hover:text-white transition-colors">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <h3 className="font-display font-bold text-sm uppercase tracking-widest flex items-center space-x-2 text-white">
            <Settings className="w-4 h-4 text-brand-cyan" />
            <span>Architecture</span>
          </h3>
          
          {mode === 'text' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="micro-label">Character String</label>
                <input 
                  type="text"
                  maxLength={4}
                  value={settings.text}
                  onChange={(e) => setSettings({ ...settings, text: e.target.value })}
                  className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-2 text-lg font-bold text-center focus:outline-none focus:border-brand-purple transition-all"
                  id="input-text-content"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="micro-label">Font Family</label>
                  <select 
                    value={settings.fontFamily}
                    onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-2 text-xs font-bold focus:outline-none focus:border-brand-purple transition-all text-white"
                    id="select-font-family"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Space Grotesk">Grotesk</option>
                    <option value="Outfit">Outfit</option>
                    <option value="JetBrains Mono">Mono</option>
                    <option value="Bebas Neue">Bebas</option>
                    <option value="Playfair Display">Serif</option>
                    <option value="Roboto Mono">Retro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="micro-label">Weight</label>
                  <select 
                    value={settings.fontWeight}
                    onChange={(e) => setSettings({ ...settings, fontWeight: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-2 text-xs font-bold focus:outline-none focus:border-brand-purple transition-all text-white"
                    id="select-font-weight"
                  >
                    <option value="400">Normal</option>
                    <option value="600">Semi</option>
                    <option value="700">Bold</option>
                    <option value="900">Black</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Search emoji library..."
                  value={emojiSearch}
                  onChange={(e) => setEmojiSearch(e.target.value)}
                  className="w-full bg-brand-dark/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-cyan transition-all text-white"
                  id="input-emoji-search"
                />
                {emojiSearch && (
                  <button 
                    onClick={() => setEmojiSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="max-h-[380px] overflow-y-auto no-scrollbar glass-panel p-3 space-y-8 scroll-smooth">
                {emojiSearch ? (
                  <div className="grid grid-cols-6 gap-2">
                    <AnimatePresence mode="popLayout">
                      {filteredEmojis.map((e) => (
                        <motion.button
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          key={e}
                          onClick={() => setSettings({ ...settings, emoji: e })}
                          className={cn(
                            "w-full aspect-square flex items-center justify-center text-xl hover:bg-white/10 rounded transition-all",
                            settings.emoji === e ? "bg-brand-cyan/20 ring-1 ring-brand-cyan" : ""
                          )}
                        >
                          {e}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                    {filteredEmojis.length === 0 && (
                      <div className="col-span-6 py-8 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">No emojis found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  EMOJI_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-px bg-white/5 flex-1" />
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap px-2">
                          {group.name}
                        </h4>
                        <div className="h-px bg-white/5 flex-1" />
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        {group.items.map((e) => (
                          <button
                            key={e}
                            onClick={() => setSettings({ ...settings, emoji: e })}
                            className={cn(
                              "w-full aspect-square flex items-center justify-center text-xl hover:bg-white/10 rounded transition-all",
                              settings.emoji === e ? "bg-brand-cyan/20 ring-1 ring-brand-cyan" : ""
                            )}
                          >
                            {e}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="micro-label flex justify-between">
                Expansion Scale <span>{settings.fontSize}%</span>
              </label>
              <input 
                type="range"
                min="10"
                max="100"
                value={settings.fontSize}
                onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })}
                className="w-full accent-brand-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                id="input-font-size"
              />
            </div>

            <div className="space-y-2">
              <label className="micro-label">Bounding Shape</label>
              <div className="grid grid-cols-3 gap-2">
                {['square', 'rounded', 'circle'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSettings({ ...settings, shape: s as any })}
                    className={cn(
                      "py-2 rounded text-[10px] uppercase font-bold transition-all border",
                      settings.shape === s ? "bg-brand-cyan/20 border-brand-cyan text-brand-cyan" : "bg-white/5 border-white/5 text-slate-500 hover:bg-white/10"
                    )}
                    id={`btn-shape-${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {settings.shape === 'rounded' && (
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-widest font-bold flex justify-between">
                  Corner Radius <span>{settings.borderRadius}%</span>
                </label>
                <input 
                  type="range"
                  min="0"
                  max="50"
                  value={settings.borderRadius}
                  onChange={(e) => setSettings({ ...settings, borderRadius: Number(e.target.value) })}
                  className="w-full accent-brand-cyan"
                  id="input-border-radius"
                />
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <h3 className="micro-label text-white !text-xs">Chroma Specs</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="micro-label !text-[8px]">Surface</label>
              <input 
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                className="w-full h-8 rounded cursor-pointer bg-transparent border border-white/5"
                id="input-bg-color"
              />
            </div>
            <div className="space-y-1">
              <label className="micro-label !text-[8px]">Glyph</label>
              <input 
                type="color"
                value={settings.textColor}
                onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                className="w-full h-8 rounded cursor-pointer bg-transparent border border-white/5"
                id="input-text-color"
              />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="micro-label text-white !text-xs">Shadow Tuning</h3>
            <button 
              onClick={() => setSettings({ ...settings, showShadow: !settings.showShadow })}
              className={cn(
                "w-8 h-4 rounded-full transition-colors relative",
                settings.showShadow ? "bg-brand-cyan" : "bg-white/10"
              )}
              id="toggle-shadow"
            >
              <div className={cn(
                "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                settings.showShadow ? "right-0.5" : "left-0.5"
              )} />
            </button>
          </div>
          
          {settings.showShadow && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="micro-label !text-[8px]">Shadow Color</label>
                <input 
                  type="color"
                  value={settings.shadowColor.startsWith('rgba') ? '#000000' : settings.shadowColor}
                  onChange={(e) => setSettings({ ...settings, shadowColor: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer bg-transparent border border-white/5"
                  id="input-shadow-color"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="micro-label !text-[8px] flex justify-between">Blur <span>{settings.shadowBlur}px</span></label>
                  <input 
                    type="range"
                    min="0"
                    max="50"
                    value={settings.shadowBlur}
                    onChange={(e) => setSettings({ ...settings, shadowBlur: Number(e.target.value) })}
                    className="w-full accent-brand-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    id="input-shadow-blur"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="micro-label !text-[8px] flex justify-between">Offset X <span>{settings.shadowOffsetX}</span></label>
                    <input 
                      type="range"
                      min="-20"
                      max="20"
                      value={settings.shadowOffsetX}
                      onChange={(e) => setSettings({ ...settings, shadowOffsetX: Number(e.target.value) })}
                      className="w-full accent-brand-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      id="input-shadow-offset-x"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="micro-label !text-[8px] flex justify-between">Offset Y <span>{settings.shadowOffsetY}</span></label>
                    <input 
                      type="range"
                      min="-20"
                      max="20"
                      value={settings.shadowOffsetY}
                      onChange={(e) => setSettings({ ...settings, shadowOffsetY: Number(e.target.value) })}
                      className="w-full accent-brand-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      id="input-shadow-offset-y"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="micro-label text-white !text-xs">Background Glow</h3>
            <button 
              onClick={() => setSettings({ ...settings, showBackgroundShadow: !settings.showBackgroundShadow })}
              className={cn(
                "w-8 h-4 rounded-full transition-colors relative",
                settings.showBackgroundShadow ? "bg-brand-purple" : "bg-white/10"
              )}
              id="toggle-bg-shadow"
            >
              <div className={cn(
                "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                settings.showBackgroundShadow ? "right-0.5" : "left-0.5"
              )} />
            </button>
          </div>
          
          {settings.showBackgroundShadow && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="micro-label !text-[8px]">Glow Color</label>
                <input 
                  type="color"
                  value={settings.backgroundShadowColor.startsWith('rgba') ? '#000000' : settings.backgroundShadowColor}
                  onChange={(e) => setSettings({ ...settings, backgroundShadowColor: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer bg-transparent border border-white/5"
                  id="input-bg-shadow-color"
                />
              </div>
              <div className="space-y-1">
                <label className="micro-label !text-[8px] flex justify-between">Intensity <span>{settings.backgroundShadowBlur}px</span></label>
                <input 
                  type="range"
                  min="0"
                  max="50"
                  value={settings.backgroundShadowBlur}
                  onChange={(e) => setSettings({ ...settings, backgroundShadowBlur: Number(e.target.value) })}
                  className="w-full accent-brand-purple h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  id="input-bg-shadow-blur"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <span className="micro-label !text-[8px] text-white uppercase tracking-widest">Live Environment Simulation</span>
            </div>
            
            <div className="flex items-center bg-brand-dark/50 rounded-full border border-white/5 p-1">
              <button 
                onClick={() => setPreviewTheme('light')}
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  previewTheme === 'light' ? "bg-white text-brand-dark" : "text-slate-500 hover:text-white"
                )}
                id="preview-theme-light"
              >
                <Sun className="w-3 h-3" />
              </button>
              <button 
                onClick={() => setPreviewTheme('dark')}
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  previewTheme === 'dark' ? "bg-brand-cyan text-brand-dark" : "text-slate-500 hover:text-white"
                )}
                id="preview-theme-dark"
              >
                <Moon className="w-3 h-3" />
              </button>
            </div>
          </div>
          <BrowserPreview mode={mode} theme={previewTheme} />
        </div>

        <div 
          ref={containerRef}
          className={cn(
          "flex flex-col items-center justify-center glass-panel p-12 min-h-[440px] relative overflow-hidden group transition-colors duration-500",
          previewTheme === 'light' ? "bg-slate-100/50" : ""
        )}>
          {/* Decorative Glow */}
          <motion.div 
            style={{ x: "-50%", y: glowY, scale: glowScale, opacity: glowOpacity }}
            className={cn(
              "absolute top-1/2 left-1/2 w-80 h-80 blur-[100px] pointer-events-none",
              previewTheme === 'dark' ? "bg-brand-cyan/20 group-hover:bg-brand-purple/20" : "bg-brand-cyan/30"
            )} 
          />
          
          <div className="relative group">
            <canvas 
              ref={canvasRef}
              className="max-w-full h-auto rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105 duration-700"
              style={{ width: previewSize, height: previewSize }}
              id="main-preview-canvas"
            />
            <div className={cn(
              "absolute -bottom-6 -right-6 glass-panel px-3 py-1 text-[9px] font-mono font-black transition-colors",
              previewTheme === 'dark' ? "text-slate-500" : "text-slate-400"
            )}>

            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="px-10 py-4 bg-gradient-to-r from-brand-purple to-brand-cyan rounded font-black text-[10px] uppercase tracking-widest text-white flex items-center space-x-3 hover:scale-105 transition-all disabled:opacity-50 shadow-2xl shadow-brand-purple/20"
              id="btn-download-bundle"
            >
              {isDownloading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" /> : <Download className="w-4 h-4" />}
              <span>Download Bundle</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {[16, 32, 64, 128, 512].map(sz => (
            <div key={sz} className="glass-panel p-6 flex flex-col items-center justify-between space-y-6 hover:border-brand-cyan/30 transition-all group">
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="bg-brand-dark/50 rounded p-4 border border-white/5 group-hover:border-brand-cyan/20 transition-colors w-24 h-24 flex items-center justify-center">
                  <canvas 
                    width={sz} 
                    height={sz} 
                    className={cn(
                      "rounded-sm shadow-xl",
                      sz > 64 ? "w-16 h-16" : ""
                    )}
                    ref={el => {
                      if (el) generateFaviconDataUrl(el, sz, settings, mode);
                    }}
                  />
                </div>
                <div className="text-center">
                  <span className="micro-label !text-[9px] text-white">{sz}x{sz}</span>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tight mt-1">Export Standard</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools & Resources */}
      <div className="lg:col-span-3 pt-24 space-y-12">
        <div className="flex items-end justify-between border-b border-white/5 pb-4">
          <div>
            <span className="micro-label">Studio Ecosystem</span>
            <h2 className="text-2xl font-black font-display uppercase tracking-widest mt-1">Related Tools & Resources</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mode === 'text' ? (
            <Link to="/explore-emojis" className="glass-panel p-6 flex flex-col gap-4 group hover:border-brand-cyan/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-cyan/20 group-hover:bg-brand-cyan/5 transition-all">
                <Smile className="w-5 h-5 text-slate-400 group-hover:text-brand-cyan transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">Emoji Studio</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Create favicons from our premium emoji library.</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-cyan transition-colors">
                <span>Open Studio</span>
                <ArrowRight className="w-2 h-2" />
              </div>
            </Link>
          ) : (
            <Link to="/create-text" className="glass-panel p-6 flex flex-col gap-4 group hover:border-brand-purple/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-purple/20 group-hover:bg-brand-purple/5 transition-all">
                <Type className="w-5 h-5 text-slate-400 group-hover:text-brand-purple transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white group-hover:text-brand-purple transition-colors">Text Studio</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Design custom typographic assets and icons.</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-purple transition-colors">
                <span>Open Studio</span>
                <ArrowRight className="w-2 h-2" />
              </div>
            </Link>
          )}

          <Link to="/image-converter" className="glass-panel p-6 flex flex-col gap-4 group hover:border-brand-cyan/20 transition-all">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-cyan/20 group-hover:bg-brand-cyan/5 transition-all">
              <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-brand-cyan transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">Image Converter</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">Convert PNG, JPG, or SVG into production web manifests.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-cyan transition-colors">
              <span>Start Converting</span>
              <ArrowRight className="w-2 h-2" />
            </div>
          </Link>


        </div>


      </div>

      {/* Integration Guides */}
      <div className="lg:col-span-3 pt-12 space-y-24">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
        
        <header className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-4 mx-auto">
            <BookOpen className="w-3 h-3" />
            <span>Developer Documentation</span>
          </div>
          <h2 className="text-4xl font-display font-black tracking-tight text-white">Implementation Guide.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Detailed technical specifications and deployment instructions for your generated assets.</p>
        </header>

        {/* Quick Start Steps */}
        <div className="space-y-12 max-w-4xl mx-auto">
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
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">Technical Specs</h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <TechSpecsTable />
        </div>

        {/* KB Articles */}
        <div className="space-y-12 max-w-4xl mx-auto pb-20">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 border-l-2 border-brand-cyan pl-4">Optimization Guides</h3>
          <KnowledgeBase posts={posts} />
        </div>
      </div>
    </div>
  );
}
