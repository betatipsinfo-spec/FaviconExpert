import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { generateFaviconDataUrl, cn } from '../lib/utils';
import { Globe, Plus, X, Lock } from 'lucide-react';

interface BrowserPreviewProps {
  mode: 'text' | 'emoji' | 'image';
  theme?: 'dark' | 'light';
  customImage?: string | null;
  imageGlow?: {
    enabled: boolean;
    color: string;
    intensity: number;
  };
}

export function BrowserPreview({ mode, theme = 'dark', customImage, imageGlow }: BrowserPreviewProps) {
  const { settings } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (mode === 'image' && customImage) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            const size = 32;
            canvasRef.current!.width = size;
            canvasRef.current!.height = size;
            ctx.clearRect(0, 0, size, size);
            
            const margin = imageGlow?.enabled ? (size * 0.1) : 0;
            const drawSize = size - (margin * 2);

            if (imageGlow?.enabled) {
              ctx.shadowColor = imageGlow.color;
              ctx.shadowBlur = (size * imageGlow.intensity) / 100;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = (size * 2) / 100;
            } else {
              ctx.shadowBlur = 0;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
            }

            ctx.drawImage(img, margin, margin, drawSize, drawSize);
          };
          img.src = customImage;
        }
      } else {
        generateFaviconDataUrl(canvasRef.current, 32, settings, mode as 'text' | 'emoji');
      }
    }
  }, [settings, mode, customImage, imageGlow]);

  const isDark = theme === 'dark';

  return (
    <div className={cn("w-full glass-panel overflow-hidden border-white/10 shadow-2xl transition-colors duration-500", !isDark && "bg-slate-100")}>
      {/* Browser Header/Tabs */}
      <div className={cn("px-3 pt-3 flex items-end space-x-1 border-b transition-colors duration-500", isDark ? "bg-[#1a1c1e] border-white/5" : "bg-slate-200 border-slate-300")}>
        <div className="flex-1 flex max-w-[200px]">
          <div className={cn("px-4 py-2 rounded-t-lg flex items-center space-x-3 w-full border-t border-x relative group transition-colors duration-500", isDark ? "bg-brand-dark/80 border-white/5" : "bg-white border-slate-300")}>
            <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
               <canvas ref={canvasRef} width={16} height={16} className="w-4 h-4 rounded-sm" />
            </div>
            <span className={cn("text-[10px] font-medium truncate pr-4 transition-colors", isDark ? "text-slate-200" : "text-slate-900")}>faviconExpert Studio — Asset...</span>
            <X className={cn("w-2.5 h-2.5 absolute right-2 hover:text-white cursor-pointer transition-colors", isDark ? "text-slate-500" : "text-slate-400 hover:text-slate-900")} />
          </div>
        </div>
        <div className={cn("p-2 mb-1 rounded-md cursor-pointer transition-colors", isDark ? "hover:bg-white/5" : "hover:bg-black/5")}>
          <Plus className={cn("w-3 h-3 transition-colors", isDark ? "text-slate-400" : "text-slate-500")} />
        </div>
      </div>
      
      {/* Address Bar Area */}
      <div className={cn("p-2 border-b flex items-center space-x-3 transition-colors duration-500", isDark ? "bg-brand-dark/50 border-white/5" : "bg-white border-slate-300")}>
        <div className="flex space-x-1.5 px-2">
          <div className={cn("w-2 h-2 rounded-full", isDark ? "bg-slate-700" : "bg-slate-300")} />
          <div className={cn("w-2 h-2 rounded-full", isDark ? "bg-slate-700" : "bg-slate-300")} />
          <div className={cn("w-2 h-2 rounded-full", isDark ? "bg-slate-700" : "bg-slate-300")} />
        </div>
        <div className={cn("flex-1 rounded-full border py-1 px-4 flex items-center space-x-2 transition-colors duration-500", isDark ? "bg-black/40 border-white/5" : "bg-slate-100 border-slate-200")}>
          <Lock className={cn("w-2.5 h-2.5", isDark ? "text-green-500" : "text-slate-400")} />
          <span className={cn("text-[9px] font-mono transition-colors", isDark ? "text-slate-500" : "text-slate-400")}>https://faviconexpert.app/generator</span>
        </div>
        <div className={cn("w-6 h-6 rounded-full border mr-2 flex items-center justify-center text-[8px] font-bold transition-colors duration-500", isDark ? "bg-slate-800 border-white/5 text-white" : "bg-slate-200 border-slate-300 text-slate-600")}>B</div>
      </div>

      {/* Content Area (Representative) */}
      <div className={cn("h-24 flex items-center justify-center relative overflow-hidden transition-colors duration-500", isDark ? "bg-[#090d16]" : "bg-white")}>
        <div className={cn("absolute inset-0 transition-opacity duration-500", isDark ? "bg-[radial-gradient(circle,rgba(6,182,212,0.05)_0%,transparent_70%)]" : "bg-[radial-gradient(circle,rgba(0,0,0,0.02)_0%,transparent_70%)]")} />
        <div className={cn("text-[8px] micro-label opacity-30 transition-colors", isDark ? "text-white" : "text-black")}>Production Environment Simulation</div>
      </div>
    </div>
  );
}
