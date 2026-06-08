import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  FileText, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  BarChart3, 
  Globe, 
  Navigation,
  FolderOpen,
  Eye,
  Edit2,
  Trash2,
  ChevronRight,
  AlertTriangle,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { AdminPost, MediaFile } from '../../types';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { siteConfig } = useApp();
  const menuItems = [
    { label: 'Dashboard', icon: BarChart3, path: '/admin' },
    { label: 'Content (CMS)', icon: FileText, path: '/admin/cms' },
    { label: 'Design Config', icon: SettingsIcon, path: '/admin/config' },
    { label: 'Media Library', icon: FolderOpen, path: '/admin/media' },
    { label: 'SEO Suite', icon: Globe, path: '/admin/seo' },
    { label: 'Navigation', icon: Navigation, path: '/admin/nav' },
  ];

  return (
    <div className="min-h-screen bg-[#070a11] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 glass flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Forge Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link to="/" className="flex items-center space-x-2 text-xs text-slate-500 hover:text-slate-300">
            <ChevronRight className="w-3 h-3 rotate-180" />
            <span>Back to Web Application</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0d1117] border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-widest">{title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex w-full gap-3 pt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 px-6 py-4 rounded-2xl bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-xl shadow-red-500/20"
                >
                  Delete Asset
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function MediaLibrary() {
  const { media, setMedia } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    const newFiles = await Promise.all(Array.from(files).map(async (file) => {
      return new Promise<MediaFile>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              url: e.target?.result as string,
              type: file.type,
              size: file.size,
              dimensions: { width: img.width, height: img.height },
              createdAt: new Date().toISOString()
            });
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    }));

    setMedia(prev => [...newFiles, ...prev]);
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDeleteTrigger = (id: string) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setMedia(media.filter(m => m.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-display">Media Engine</h1>
          <p className="text-slate-500 mt-1 text-sm">Upload and manage local icons, textures, and UI assets.</p>
        </div>
        <div className="text-[10px] font-black uppercase text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded tracking-[0.2em] animate-pulse">
          Local Storage Sync
        </div>
      </div>

      <div 
        className={cn(
          "relative group border-2 border-dashed rounded-[2.5rem] p-12 transition-all flex flex-col items-center justify-center text-center space-y-4",
          dragActive ? "border-brand-cyan bg-brand-cyan/5 scale-[0.99]" : "border-white/10 bg-white/[0.02] hover:border-white/20"
        )}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <div className="w-20 h-20 rounded-3xl bg-brand-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <ImageIcon className="w-8 h-8 text-brand-cyan" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white tracking-tight">Drop your assets here</h3>
          <p className="text-slate-500 text-xs font-medium">SVG, PNG, or WEBP. Maximum 2MB per file recommended.</p>
        </div>
        <input 
          type="file" 
          multiple 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {media.map((file) => (
          <motion.div 
            layout
            key={file.id} 
            className="group relative glass rounded-3xl overflow-hidden border-white/5 aspect-square"
          >
            <img src={file.url} alt={file.name} className="w-full h-full object-cover p-2 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
              <span className="text-[10px] font-bold text-white truncate w-full mb-1">{file.name}</span>
              <span className="text-[8px] text-slate-400 font-mono">{(file.size / 1024).toFixed(1)} KB</span>
              <div className="flex gap-2 mt-3">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" title="Download">
                  <a href={file.url} download={file.name}><ImageIcon className="w-3.5 h-3.5 text-white" /></a>
                </button>
                <button 
                  onClick={() => handleDeleteTrigger(file.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors" 
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {media.length === 0 && (
        <div className="py-20 text-center glass rounded-[2.5rem] border-white/5">
          <p className="text-slate-600 font-mono text-xs italic">The media repository is currently empty.</p>
        </div>
      )}

      <ConfirmationModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Destroy Asset"
        message="Are you sure you want to permanently remove this asset from the local media library? This will free up storage space."
      />
    </div>
  );
}

export function CMSManager() {
  const { posts, setPosts } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<AdminPost> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCreate = () => {
    setEditingPost({
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      category: 'Guide',
      tags: [],
      createdAt: new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleEdit = (post: AdminPost) => {
    setEditingPost({ ...post });
    setIsEditing(true);
  };

  const handleDeleteTrigger = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      setPosts(posts.filter(p => p.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  const handleSave = () => {
    if (!editingPost?.title || !editingPost?.slug) {
      alert('Title and Slug are required.');
      return;
    }

    if (posts.find(p => p.id === editingPost.id)) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...editingPost } as AdminPost : p));
    } else {
      setPosts([...posts, editingPost as AdminPost]);
    }
    setIsEditing(false);
    setEditingPost(null);
  };

  if (isEditing && editingPost) {
    return (
      <div className="space-y-8 pb-20">
        <div className="flex justify-between items-center bg-[#0d1117] p-6 rounded-2xl border border-white/5 shadow-2xl">
          <div>
            <h1 className="text-2xl font-bold font-display uppercase tracking-widest text-white">Editor Mode</h1>
            <p className="text-slate-500 text-sm mt-1">Refining: <span className="text-brand-cyan">{editingPost.title || 'Untitled Asset'}</span></p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-brand-purple text-white hover:bg-brand-purple/80 transition-all shadow-lg shadow-brand-purple/20"
            >
              Commit & Sync
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-[2rem] space-y-6 border-white/5">
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Document Title</label>
                <input 
                  type="text" 
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="The Ultimate Favicon Guide..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-cyan/50 text-xl font-bold text-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Markdown Source Content</label>
                <textarea 
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full h-[500px] bg-white/5 border border-white/10 rounded-3xl p-8 focus:outline-none focus:border-brand-purple/50 text-slate-300 font-mono text-sm leading-relaxed resize-none transition-all"
                  placeholder="# Enter markdown content here..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass p-8 rounded-[2rem] space-y-8 border-white/5">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                <SettingsIcon className="w-3.5 h-3.5 text-brand-cyan" />
                Asset Metadata
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">URL Routing (Slug)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs">/</span>
                    <input 
                      type="text" 
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:border-brand-cyan/50 text-slate-300 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Category Bracket</label>
                  <select 
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-slate-300 text-xs font-bold"
                  >
                    <option value="Guide">Guide</option>
                    <option value="Technical">Technical</option>
                    <option value="Announcements">Announcements</option>
                    <option value="SEO Assets">SEO Assets</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-500 uppercase font-black tracking-[0.2em]">Deployment Status</label>
                  <div className="flex gap-2">
                    {['draft', 'published'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setEditingPost({ ...editingPost, status: status as any })}
                        className={cn(
                          "flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                          editingPost.status === status 
                            ? "bg-brand-cyan/20 border-brand-cyan text-brand-cyan shadow-lg shadow-brand-cyan/10" 
                            : "bg-white/5 border-white/10 text-slate-500 hover:text-slate-300"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono">
                  <span>Last Modified:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-display">Content Engine</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage your guides, documentation, and SEO pages.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-brand-purple px-6 py-3 rounded-xl border border-brand-purple/50 flex items-center space-x-2 font-black text-xs uppercase tracking-widest hover:bg-brand-purple/80 transition-all shadow-xl shadow-brand-purple/20 text-white"
        >
          <Plus className="w-4 h-4" />
          <span>New Document</span>
        </button>
      </div>

      <div className="glass rounded-[2rem] overflow-hidden border-white/5 pb-12">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-brand-dark/50 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-brand-cyan/50 w-80 text-slate-300 transition-all"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex p-1 bg-brand-dark/80 rounded-xl border border-white/10">
              <button className="px-5 py-2 text-[9px] font-black rounded-lg bg-white/5 text-slate-300 uppercase tracking-widest">Drafts</button>
              <button className="px-5 py-2 text-[9px] font-black rounded-lg bg-brand-cyan text-brand-dark uppercase tracking-widest">Live Assets</button>
            </div>
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-500 uppercase font-black tracking-[0.2em] border-b border-white/5">
              <th className="px-8 py-6 font-black">Document Title</th>
              <th className="px-8 py-6 font-black">Category</th>
              <th className="px-8 py-6 font-black">Status</th>
              <th className="px-8 py-6 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                <td className="px-8 py-6">
                  <div className="font-bold text-slate-200 group-hover:text-brand-cyan transition-colors">{post.title}</div>
                  <div className="text-[10px] text-slate-600 font-mono mt-0.5">/{post.slug}</div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[9px] px-2.5 py-1 rounded-md font-black uppercase tracking-tighter bg-white/5 text-slate-400 border border-white/5">{post.category}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full shadow-sm", 
                      post.status === 'published' ? 'bg-green-500 shadow-green-500/50 animate-pulse' : 'bg-yellow-500 shadow-yellow-500/50'
                    )} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{post.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end space-x-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(post)} className="p-2.5 hover:bg-white/10 rounded-xl transition-all" title="Edit"><Edit2 className="w-4 h-4 text-slate-500 hover:text-brand-cyan" /></button>
                    <button onClick={() => handleDeleteTrigger(post.id)} className="p-2.5 hover:bg-red-500/10 rounded-xl transition-all" title="Delete"><Trash2 className="w-4 h-4 text-red-500/60 hover:text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPosts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center text-slate-600 font-mono text-xs italic">
                  No assets found in the Content Engine database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to permanently delete this asset? This action cannot be undone and will immediately remove the content from the production database."
      />
    </div>
  );
}
