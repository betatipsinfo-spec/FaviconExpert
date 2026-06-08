import React from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Globe } from 'lucide-react';
import { AdminPost } from '../types';
import { cn } from '../lib/utils';

interface Step {
  title: string;
  content: string;
  icon: any;
  code?: string;
}

export function ImplementationSteps({ steps }: { steps: Step[] }) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {steps.map((step, i) => (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          key={i} 
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 text-brand-purple group-hover:bg-brand-purple/10 transition-all">
            <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="space-y-3 sm:space-y-4 flex-1 w-full">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">{step.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{step.content}</p>
            
            {step.code && (
              <div className="relative group/code">
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover/code:opacity-100 transition-opacity z-10">
                  <button 
                    onClick={() => copyCode(step.code!, i)}
                    className="p-2 glass rounded-lg bg-brand-dark/80 hover:bg-white/10 transition-all backdrop-blur-md border border-white/10"
                  >
                    {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                </div>
                <pre className="bg-brand-dark/50 border border-white/5 p-4 sm:p-6 rounded-xl sm:rounded-2xl overflow-x-auto text-brand-cyan font-mono text-[10px] sm:text-xs">
                  <code className="whitespace-pre sm:whitespace-pre-wrap break-all sm:break-normal">{step.code}</code>
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TechSpecsTable() {
  const specs = [
    { name: 'favicon.ico', size: '16x16, 32x32, 48x48', type: 'ICO', purpose: 'Legacy support' },
    { name: 'favicon-16x16.png', size: '16x16', type: 'PNG', purpose: 'Modern tabs' },
    { name: 'favicon-32x32.png', size: '32x32', type: 'PNG', purpose: 'Taskbar/Tabs' },
    { name: 'apple-touch-icon.png', size: '180x180', type: 'PNG', purpose: 'iOS Home Screen' },
    { name: 'android-chrome-192.png', size: '192x192', type: 'PNG', purpose: 'Android/PWA' },
    { name: 'android-chrome-512.png', size: '512x512', type: 'PNG', purpose: 'PWA Splash' },
  ];

  return (
    <div className="glass rounded-2xl sm:rounded-3xl overflow-hidden border-white/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-white/5 text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-slate-500">
              <th className="px-4 sm:px-8 py-3 sm:py-4">Filename</th>
              <th className="px-4 sm:px-8 py-3 sm:py-4">Dimensions</th>
              <th className="px-4 sm:px-8 py-3 sm:py-4">Type</th>
              <th className="px-4 sm:px-8 py-3 sm:py-4">Usage</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {specs.map((spec, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-all">
                <td className="px-4 sm:px-8 py-4 sm:py-6 font-mono text-brand-cyan whitespace-nowrap">{spec.name}</td>
                <td className="px-4 sm:px-8 py-4 sm:py-6 text-slate-300 whitespace-nowrap">{spec.size}</td>
                <td className="px-4 sm:px-8 py-4 sm:py-6">
                  <span className="px-2 py-1 rounded bg-white/10 text-[9px] sm:text-[10px] font-bold text-slate-400">{spec.type}</span>
                </td>
                <td className="px-4 sm:px-8 py-4 sm:py-6 text-slate-500 min-w-[200px]">{spec.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function KnowledgeBase({ posts }: { posts: AdminPost[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.filter(p => p.status === 'published').map((post) => (
        <motion.div 
          key={post.id}
          whileHover={{ y: -5 }}
          className="glass p-8 rounded-3xl space-y-4 border-white/5 hover:border-brand-purple/30 transition-all"
        >
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[10px] font-black uppercase tracking-tighter">
              {post.category}
            </span>
            <Globe className="w-4 h-4 text-slate-700" />
          </div>
          <h3 className="text-xl font-bold font-display leading-tight text-white">{post.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{post.content}</p>
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono text-slate-600">#{tag}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
