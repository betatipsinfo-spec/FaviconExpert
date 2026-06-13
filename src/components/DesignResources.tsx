import React from 'react';
import { Box, Palette, Sparkles, Target, Type, Layout, ExternalLink, ArrowRight, FileText, User, Wand2, Image as ImageIcon, Crop, Minimize2, Droplets, Camera, Stamp } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  icon: any;
  link: string;
  key?: string;
}

export const RESOURCES: Resource[] = [
  {
    title: "Free Advance Font Generator",
    description: "Pro-level typography conversion for unique brand identities.",
    icon: Sparkles,
    link: "https://genfonts.com/"
  },
  {
    title: "Free Advance Color Palettes",
    description: "Professional flat color palette generator for modern web interfaces.",
    icon: Palette,
    link: "https://flatpalette.com/"
  },
  {
    title: "CSS Suite & Free Fonts",
    description: "Download premium grade CSS templates and free font assets.",
    icon: Layout,
    link: "https://freecss.net/"
  },
  {
    title: "Free Resource UI",
    description: "Curated collection of layout cards, navbars, and interactive buttons.",
    icon: Target,
    link: "https://templatemind.com/"
  },
  {
    title: "Image Watermarker",
    description: "Protect your visual assets with custom text or image watermarks.",
    icon: Stamp,
    link: "https://templatemind.com/tools/watermark"
  },
  {
    title: "Image Converter",
    description: "Batch convert images between PNG, JPG, WebP, and SVG formats.",
    icon: ImageIcon,
    link: "https://templatemind.com/tools/image-converter"
  },
  {
    title: "Image Cropper",
    description: "Precision cropping tool for social media and web platform assets.",
    icon: Crop,
    link: "https://templatemind.com/tools/image-cropper"
  },
  {
    title: "Image Compressor",
    description: "Reduce file sizes while maintaining high-quality visual standards.",
    icon: Minimize2,
    link: "https://templatemind.com/tools/image-compressor"
  },
  {
    title: "Word Count",
    description: "Accurate character and word counting tool for content creators.",
    icon: FileText,
    link: "https://templatemind.com/tools/word-counter"
  },
  {
    title: "Profile Picture Maker",
    description: "Generate professional social media profile avatars instantly.",
    icon: User,
    link: "https://templatemind.com/tools/profile-maker"
  },
  {
    title: "Fancy Font Generator",
    description: "Transform plain text into decorative stylish font variations.",
    icon: Wand2,
    link: "https://templatemind.com/tools/font-generator"
  },
  {
    title: "Free Icon Gallery",
    description: "Customize and export over 10,000+ vector icons for web projects.",
    icon: Box,
    link: "https://templatemind.com/tools/icons"
  },
  {
    title: "Free Color Palettes",
    description: "Premium color combinations and gradient presets for UI design.",
    icon: Palette,
    link: "https://templatemind.com/tools/color-palettes"
  },
  {
    title: "CSS Font Stacks",
    description: "The most comprehensive collection of web-safe CSS font stacks.",
    icon: Type,
    link: "https://templatemind.com/tools/css-fonts"
  },
  {
    title: "Gradient Generator",
    description: "Create smooth CSS linear and radial gradients with live previews.",
    icon: Droplets,
    link: "https://templatemind.com/tools/gradients"
  },
  {
    title: "Screen Capture",
    description: "Take high-resolution screenshots of any URL or viewport size.",
    icon: Camera,
    link: "https://templatemind.com/tools/screenshot"
  }
];

export function ResourceCard({ title, description, icon: Icon, link }: Resource) {
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
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div className="mt-2 pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-cyan transition-colors">
        <span>Explore Resource</span>
        <ArrowRight className="w-2 h-2" />
      </div>
    </a>
  );
}

export function DesignResourcesSection() {
  return (
    <section id="design-resources" className="space-y-8">
      <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <span className="micro-label">Eco-System Assets</span>
          <h2 className="text-2xl font-black font-display uppercase tracking-widest mt-1">Design Resources</h2>
        </div>
        <p className="text-slate-500 text-sm font-medium hidden md:block">Complementary tools for premium interface development.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {RESOURCES.map((resource) => (
          <ResourceCard 
            key={resource.title} 
            title={resource.title}
            description={resource.description}
            icon={resource.icon}
            link={resource.link}
          />
        ))}
      </div>
    </section>
  );
}
