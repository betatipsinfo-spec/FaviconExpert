import React from 'react';
import { motion } from 'motion/react';

export interface FAQItem {
  question: string;
  answer: string;
  color?: 'cyan' | 'purple';
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({ items, title = "Favicon Generator", subtitle = "FAQ" }: FAQSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">
          {title} <span className="neon-text">{subtitle}</span>
        </h2>
      </div>
      
      <div className="grid gap-6">
        {items.map((item, index) => (
          <div key={index} className="glass-panel p-6 space-y-3 tool-card">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${item.color === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'}`} />
              {item.question}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export const CORE_FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I use Text to Favicon?",
    answer: "Our Text to Favicon tool allows you to create professional letter-based icons instantly. Simply enter your initials or brand letters, choose from our curated selection of premium fonts (like Inter or Space Grotesk), and customize the background shape and colors. It's the perfect way to create a clean, typographic brand identity for your browser tab.",
    color: 'cyan'
  },
  {
    question: "How does Emoji to Favicon work?",
    answer: "Emoji to Favicon is our most playful tool. You can pick any standard emoji from our library and turn it into a high-resolution favicon package. We handle the scaling and centering automatically to ensure your chosen emoji looks crisp and perfectly aligned across all device resolutions.",
    color: 'purple'
  },
  {
    question: "What can the Image Converter do?",
    answer: "The Image Converter is a powerful utility for transforming your existing logos or graphics into optimized web formats. You can upload PNG or JPG files and convert them specifically for web manifests, Apple touch icons, and legacy ICO files. Our converter ensures that transparency is preserved and dimensions are precisely matched to modern web standards.",
    color: 'cyan'
  }
];
