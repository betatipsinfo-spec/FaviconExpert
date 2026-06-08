import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Boxes, Menu, X, Search, Settings, FileCode, Wand2, Image as ImageIcon, Smile, Facebook, Instagram, Linkedin, Twitter, Pin, LogIn, LogOut, User, Lock, AlertCircle, ChevronDown, ExternalLink, Type, Palette, Layout, Sparkles, Box } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { setIsAuthenticated } = useApp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Hardcoded credentials as requested
    if (email === 'michchansophaktra@gmail.com' && password === 'admin@123Tra') {
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
        onClose();
      }, 800);
    } else {
      setTimeout(() => {
        setError('Invalid credentials repository access denied.');
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0d1117] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-purple animate-gradient-x" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center shadow-lg shadow-brand-purple/20">
                <Lock className="w-8 h-8 text-white" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white font-display uppercase tracking-widest">Admin Access</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Identify to enter repository</p>
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4 pt-4">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ml-2">Identity (Email)</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-cyan transition-colors" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-brand-cyan/50 text-slate-200 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ml-2">Secure Key (Password)</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-purple transition-colors" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-brand-purple/50 text-slate-200 transition-all font-medium"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button 
                  disabled={isLoading}
                  className="w-full bg-white text-brand-dark py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-brand-cyan hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Decrypting Access...' : 'Authenticate Access'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isToolsOpen, setIsToolsOpen] = React.useState(false);
  const { siteConfig, isAuthenticated, logout } = useApp();
  const location = useLocation();

  const navItems = [
    { name: 'Generators', path: '/', icon: Wand2 },
    { name: 'Templates', path: '/create-text', icon: Wand2 },
    { name: 'Guides', path: '/guides', icon: FileCode },
  ];

  const freeTools = [
    { name: 'Text Studio', path: '/create-text', icon: Type },
    { name: 'Emoji Studio', path: '/explore-emojis', icon: Smile },
    { name: 'Image Studio', path: '/image-converter', icon: ImageIcon },
    { name: 'Free Icon Gallery', path: 'https://templatemind.com/tools/icons', icon: Box, external: true },
    { name: 'Free Color Palette', path: 'https://templatemind.com/tools/color-palettes', icon: Palette, external: true },
    { name: 'Free UI Resources', path: 'https://templatemind.com/', icon: Layout, external: true },
    { name: 'CSS Font Stacks', path: 'https://templatemind.com/tools/css-fonts', icon: Type, external: true },
    { name: 'Advance Palettes', path: 'https://flatpalette.com/', icon: Sparkles, external: true },
    { name: 'CSS Suit & Free Fonts', path: 'https://freecss.net/', icon: FileCode, external: true },
  ];

  return (
    <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 glass-panel md:mt-4 border-t-0 border-x-0 md:rounded-xl border-b shadow-2xl">
      <div className="flex items-center gap-4 sm:gap-8 h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group h-full">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
            {siteConfig.siteName.charAt(0)}
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic text-white flex shrink-0 lowercase">
            {siteConfig.siteName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium h-full items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "transition-colors pb-1 border-b-2",
                location.pathname === item.path 
                  ? "text-white border-brand-purple" 
                  : "text-slate-400 hover:text-brand-cyan border-transparent"
              )}
              id={`nav-${item.name.toLowerCase()}`}
            >
              {item.name}
            </Link>
          ))}

          {/* Free Tools Dropdown */}
          <div className="relative h-full flex items-center">
            <button 
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
              className={cn(
                "flex items-center gap-1.5 transition-colors pb-1 border-b-2 border-transparent",
                isToolsOpen ? "text-brand-cyan" : "text-slate-400 hover:text-brand-cyan"
              )}
            >
              <span>Free Tools</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", isToolsOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isToolsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseEnter={() => setIsToolsOpen(true)}
                  onMouseLeave={() => setIsToolsOpen(false)}
                  className="absolute top-full left-0 w-64 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 mt-1 backdrop-blur-xl"
                >
                  <div className="grid grid-cols-1 gap-1">
                    {freeTools.map((tool) => (
                      tool.external ? (
                        <a 
                          key={tool.name}
                          href={tool.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <tool.icon className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan" />
                            <span className="text-xs font-medium">{tool.name}</span>
                          </div>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <Link
                          key={tool.name}
                          to={tool.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
                        >
                          <tool.icon className="w-4 h-4 text-slate-500 group-hover:text-brand-purple" />
                          <span className="text-xs font-medium">{tool.name}</span>
                        </Link>
                      )
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop Search Case */}
        <div className="hidden md:flex relative group">
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="bg-brand-dark/50 border border-white/5 rounded-full py-1.5 px-4 text-xs w-48 focus:outline-none focus:border-brand-cyan transition-all outline-none"
            id="header-search"
          />
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link 
              to="/admin" 
              className="micro-label hover:text-white transition-colors border border-brand-purple/20 bg-brand-purple/5 px-3 py-1.5 rounded hidden sm:flex items-center gap-2"
              id="nav-admin-toggle"
            >
              <Settings className="w-3 h-3" />
              <span>Dashboard</span>
            </Link>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-red-400 transition-colors hidden sm:block"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="micro-label text-slate-400 hover:text-brand-cyan transition-colors border border-white/5 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full hidden sm:flex items-center gap-2"
            id="nav-signin-btn"
          >
            <LogIn className="w-3 h-3" />
            <span>Sign In</span>
          </button>
        )}

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white"
            id="mobile-menu-btn"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 md:hidden glass-panel mx-4 overflow-hidden z-50 p-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 flex items-center space-x-3"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 pb-2">
                <span className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-600">Free Resources</span>
              </div>

              {freeTools.map((tool) => (
                tool.external ? (
                  <a
                    key={tool.name}
                    href={tool.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <tool.icon className="w-4 h-4" />
                      <span>{tool.name}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                ) : (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 flex items-center space-x-3"
                  >
                    <tool.icon className="w-4 h-4" />
                    <span>{tool.name}</span>
                  </Link>
                )
              ))}
              
              <div className="h-px bg-white/5 my-2" />
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-brand-purple hover:bg-brand-purple/5 flex items-center space-x-3"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/5 flex items-center space-x-3 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-brand-cyan hover:bg-brand-cyan/5 flex items-center space-x-3 w-full text-left"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Admin Sign In</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}

export function Footer() {
  const { siteConfig } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel mb-4 mt-auto px-4 sm:px-6 md:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
              {siteConfig.siteName.charAt(0)}
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-white lowercase">
              {siteConfig.siteName}
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Premium assets and tools for the next generation of web builders. Forge your identity today.
          </p>
        </div>

        <div>
          <h4 className="micro-label text-white mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/" className="hover:text-brand-cyan transition-colors">Generators</Link></li>
            <li><Link to="/create-text" className="hover:text-brand-cyan transition-colors">Templates</Link></li>
            <li><Link to="/guides" className="hover:text-brand-cyan transition-colors">Guides</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="micro-label text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="micro-label text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/privacy" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-cyan transition-colors">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-slate-500">
          <span className="text-[10px] uppercase tracking-widest">&copy; {currentYear} {siteConfig.siteName}</span>
          <div className="h-4 w-px bg-white/5 hidden sm:block" />
          <div className="flex gap-4">
            <span className="text-[10px] uppercase tracking-widest text-brand-purple">Built for creators</span>
          </div>
        </div>

        {siteConfig.toggles.socialFooter && (
          <div className="flex items-center gap-3">
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center glass-panel rounded hover:border-brand-cyan hover:text-brand-cyan transition-all text-slate-400 group" title="Facebook">
              <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center glass-panel rounded hover:border-brand-cyan hover:text-brand-cyan transition-all text-slate-400 group" title="Instagram">
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center glass-panel rounded hover:border-brand-cyan hover:text-brand-cyan transition-all text-slate-400 group" title="Pinterest">
              <Pin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center glass-panel rounded hover:border-brand-cyan hover:text-brand-cyan transition-all text-slate-400 group" title="LinkedIn">
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center glass-panel rounded hover:border-brand-cyan hover:text-brand-cyan transition-all text-slate-400 group" title="X (Twitter)">
              <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
