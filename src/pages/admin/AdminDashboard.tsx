import React from 'react';
import { AdminLayout, CMSManager, MediaLibrary } from '../../components/admin/AdminComponents';
import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Palette, Globe, Layers, Eye, Smartphone, Search, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

function DashboardHome() {
  const { siteConfig, posts } = useApp();
  
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Generations" value="28,492" change="+12%" icon={Layers} />
        <StatCard label="Live Documents" value={posts.filter(p => p.status === 'published').length.toString()} change="Dynamic" icon={Globe} />
        <StatCard label="Active Styles" value="4" change="+2" icon={Palette} />
        <StatCard label="Mobile Traffic" value="42%" change="+5%" icon={Smartphone} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-6 space-y-4">
          <h3 className="font-bold flex items-center justify-between text-white">
            <span>Recent Activity</span>
            <Link to="/admin/cms" className="text-xs text-brand-cyan">View All</Link>
          </h3>
          <div className="space-y-3">
            {recentPosts.map(post => (
              <div key={post.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xs font-bold uppercase tracking-tighter">
                    {post.category.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">{post.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">/{post.slug} • {new Date(post.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <Link to="/admin/cms" className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <Eye className="w-4 h-4 text-slate-600 hover:text-white" />
                </Link>
              </div>
            ))}
            {recentPosts.length === 0 && (
              <div className="text-center py-10 text-slate-600 text-xs font-mono">No recent repository activity.</div>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-white">Active Module Status</h3>
            <span className="text-[10px] font-black uppercase text-brand-purple tracking-widest">Real-time</span>
          </div>
          <div className="space-y-4">
            <ToggleModule 
              name="Hero Interaction Engine" 
              status={siteConfig.toggles.hero ? "Enabled" : "Disabled"} 
              color={siteConfig.toggles.hero ? "cyan" : "red"} 
            />
            <ToggleModule 
              name="Font Pairing Directory" 
              status={siteConfig.toggles.popularFonts ? "Enabled" : "Disabled"} 
              color={siteConfig.toggles.popularFonts ? "cyan" : "red"} 
            />
            <ToggleModule 
              name="Generator Suite" 
              status={siteConfig.toggles.generators ? "Enabled" : "Disabled"} 
              color={siteConfig.toggles.generators ? "cyan" : "red"} 
            />
            <ToggleModule 
              name="Documentation & Guides" 
              status={siteConfig.toggles.guides ? "Enabled" : "Disabled"} 
              color={siteConfig.toggles.guides ? "cyan" : "red"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon }: any) {
  return (
    <div className="glass p-6 rounded-2xl space-y-2 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <Icon className="w-12 h-12" />
      </div>
      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">{label}</div>
      <div className="text-3xl font-display font-black leading-none">{value}</div>
      <div className="text-xs font-bold text-green-400">{change}</div>
    </div>
  );
}

function ToggleModule({ name, status, color }: any) {
  const colors: any = {
    cyan: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30',
    purple: 'bg-brand-purple/20 text-brand-purple border-brand-purple/30',
    yellow: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    red: 'bg-red-500/20 text-red-500 border-red-500/30',
  };
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
      <span className="text-sm font-medium">{name}</span>
      <span className={cn("text-[10px] uppercase font-black px-2 py-1 rounded-md border", colors[color])}>{status}</span>
    </div>
  );
}

function SiteConfigEditor() {
  const { siteConfig, setSiteConfig } = useApp();
  
  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-display">Design Configurator</h1>
          <p className="text-slate-500 mt-1 text-sm">Rewrite global design tokens and structural layout order.</p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Real-time Sync Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual Tokens */}
        <div className="glass p-8 rounded-3xl space-y-8 border-white/5">
          <h3 className="font-bold flex items-center space-x-2 text-white">
            <Palette className="w-5 h-5 text-brand-cyan" />
            <span>Visual Tokens</span>
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Application Name</label>
              <input 
                type="text"
                value={siteConfig.siteName}
                onChange={(e) => setSiteConfig({ ...siteConfig, siteName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-cyan/50 text-slate-200 transition-all"
                placeholder="e.g. iconforge"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Accent Color</label>
                <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-2.5">
                  <input 
                    type="color"
                    value={siteConfig.accentColor}
                    onChange={(e) => setSiteConfig({ ...siteConfig, accentColor: e.target.value })}
                    className="w-10 h-10 rounded-lg bg-transparent cursor-pointer border-none"
                  />
                  <code className="text-xs font-mono text-slate-400 uppercase tracking-tighter">{siteConfig.accentColor}</code>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Corner Radius</label>
                <select 
                  value={siteConfig.borderRadius}
                  onChange={(e) => setSiteConfig({ ...siteConfig, borderRadius: e.target.value })}
                  className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none text-slate-200"
                >
                  <option value="0.5rem">Subtle (8px)</option>
                  <option value="0.75rem">Standard (12px)</option>
                  <option value="1rem">Modern (16px)</option>
                  <option value="1.5rem">Hybrid (24px)</option>
                  <option value="2rem">Organic (32px)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Global Font Family</label>
              <select 
                value={siteConfig.fontFamily}
                onChange={(e) => setSiteConfig({ ...siteConfig, fontFamily: e.target.value })}
                className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none text-slate-200"
              >
                <option value="Inter">Inter (Swiss Modern)</option>
                <option value="Space Grotesk">Space Grotesk (Tech Geometric)</option>
                <option value="Outfit">Outfit (Clean Sans)</option>
                <option value="JetBrains Mono">JetBrains Mono (Technical)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feature Modular Toggles */}
        <div className="glass p-8 rounded-3xl space-y-8 border-white/5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center space-x-2 text-white">
              <Layout className="w-5 h-5 text-brand-purple" />
              <span>Feature Modules</span>
            </h3>
            <span className="text-[9px] font-black uppercase text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded tracking-tighter">Architecture</span>
          </div>
          
          <div className="space-y-3">
            {Object.keys(siteConfig.toggles).map((key) => (
              <div key={key} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="space-y-0.5">
                  <span className="capitalize font-bold text-sm text-slate-200">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <p className="text-xs text-slate-500 font-medium">Control visibility of this section.</p>
                </div>
                <button 
                  onClick={() => setSiteConfig({
                    ...siteConfig,
                    toggles: { ...siteConfig.toggles, [key]: !siteConfig.toggles[key as keyof typeof siteConfig.toggles] }
                  })}
                  className={cn(
                    "w-14 h-7 rounded-full transition-all relative p-1",
                    siteConfig.toggles[key as keyof typeof siteConfig.toggles] ? "bg-brand-cyan" : "bg-white/10"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 bg-white rounded-full transition-all shadow-lg shadow-black/20",
                    siteConfig.toggles[key as keyof typeof siteConfig.toggles] ? "translate-x-7" : "translate-x-0"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Social Network Links */}
        <div className="glass p-8 rounded-3xl space-y-8 border-white/5 lg:col-span-2">
          <h3 className="font-bold flex items-center space-x-2 text-white">
            <Globe className="w-5 h-5 text-brand-cyan" />
            <span>Social Ecosystem Links</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(siteConfig.social).map((network) => (
              <div key={network} className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em] capitalize">{network}</label>
                <div className="relative group">
                  <input 
                    type="text"
                    value={siteConfig.social[network as keyof typeof siteConfig.social]}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      social: { ...siteConfig.social, [network]: e.target.value }
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-12 py-4 focus:outline-none focus:border-brand-purple/50 text-slate-300 text-xs font-mono transition-all"
                    placeholder={`https://${network}.com/your-brand`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity">
                    <Search className="w-3.5 h-3.5 text-brand-purple" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO & Meta Engine */}
        <div className="glass p-8 rounded-3xl space-y-8 border-white/5 lg:col-span-2">
          <h3 className="font-bold flex items-center space-x-2 text-white">
            <Search className="w-5 h-5 text-brand-purple" />
            <span>SEO & Indexing Metadata</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Meta Title Template</label>
                <input 
                  type="text"
                  value={siteConfig.seo.title}
                  onChange={(e) => setSiteConfig({ ...siteConfig, seo: { ...siteConfig.seo, title: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-cyan/50 text-slate-200 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Meta Keywords</label>
                <textarea 
                  value={siteConfig.seo.keywords}
                  onChange={(e) => setSiteConfig({ ...siteConfig, seo: { ...siteConfig.seo, keywords: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-cyan/50 text-slate-300 text-xs h-32 resize-none transition-all"
                />
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Global Description</label>
                <textarea 
                  value={siteConfig.seo.description}
                  onChange={(e) => setSiteConfig({ ...siteConfig, seo: { ...siteConfig.seo, description: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-cyan/50 text-slate-300 text-xs h-[13.5rem] resize-none transition-all leading-relaxed"
                />
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Open Graph Image (URL)</label>
                <input 
                  type="text"
                  value={siteConfig.seo.ogImage}
                  onChange={(e) => setSiteConfig({ ...siteConfig, seo: { ...siteConfig.seo, ogImage: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-cyan/50 text-slate-200 transition-all text-xs font-mono"
                  placeholder="https://example.com/og-image.png"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">OG Type</label>
                  <select 
                    value={siteConfig.seo.ogType}
                    onChange={(e) => setSiteConfig({ ...siteConfig, seo: { ...siteConfig.seo, ogType: e.target.value } })}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 focus:outline-none text-slate-200 text-xs"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Twitter Card</label>
                  <select 
                    value={siteConfig.seo.twitterCard}
                    onChange={(e) => setSiteConfig({ ...siteConfig, seo: { ...siteConfig.seo, twitterCard: e.target.value } })}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 focus:outline-none text-slate-200 text-xs"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Large Image</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Twitter Site Handler</label>
                <input 
                  type="text"
                  value={siteConfig.seo.twitterSite}
                  onChange={(e) => setSiteConfig({ ...siteConfig, seo: { ...siteConfig.seo, twitterSite: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-cyan/50 text-slate-200 transition-all text-xs font-mono"
                  placeholder="@yourhandle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="cms" element={<CMSManager />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="config" element={<SiteConfigEditor />} />
        <Route path="*" element={<div className="text-slate-500 font-mono">Module integration in progress...</div>} />
      </Routes>
    </AdminLayout>
  );
}
