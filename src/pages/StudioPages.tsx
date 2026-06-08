import React from 'react';
import { FaviconStudio } from '../components/FaviconStudio';
import { motion } from 'motion/react';
import { Type, Smile } from 'lucide-react';
import { FAQSection, CORE_FAQ_ITEMS } from '../components/FAQSection';

export function TextGeneratorPage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-12 space-y-12">
      <header className="flex flex-col space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="micro-label text-brand-purple"
        >
          Typography Architecture
        </motion.div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase italic">Text-to-<span className="neon-text">Favicon</span></h1>
          <p className="text-slate-400 text-lg mt-2 max-w-xl">
            Input characters, pick fonts, and design vibrant background gradients for your brand's unique identity.
          </p>
        </div>
      </header>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FaviconStudio mode="text" />
      </motion.div>

      <div className="pt-20">
        <FAQSection items={CORE_FAQ_ITEMS} />
      </div>
    </div>
  );
}

export function EmojiGeneratorPage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-12 space-y-12">
      <header className="flex flex-col space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="micro-label text-brand-cyan"
        >
          Symbolic Layering
        </motion.div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase italic">Emoji-to-<span className="neon-text">Favicon</span></h1>
          <p className="text-slate-400 text-lg mt-2 max-w-xl">
            Search for your favorite emojis and instantly package them for production-ready web deployments.
          </p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FaviconStudio mode="emoji" />
      </motion.div>

      <div className="pt-20">
        <FAQSection items={CORE_FAQ_ITEMS} />
      </div>
    </div>
  );
}
