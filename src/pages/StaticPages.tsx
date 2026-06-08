import React from 'react';
import { motion } from 'motion/react';
import { FAQSection, CORE_FAQ_ITEMS } from '../components/FAQSection';
import { DesignResourcesSection } from '../components/DesignResources';

export function AboutPage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-20 space-y-20">
      <section>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-8 italic uppercase tracking-tighter"
        >
          About <span className="neon-text">faviconExpert</span>
        </motion.h1>
        <div className="glass-panel p-8 space-y-6 text-slate-300 leading-relaxed">
          <p>
            faviconExpert is a premium digital asset generation platform designed for modern web developers and designers. 
            We specialize in providing high-quality icons, text styles, and image conversion tools that streamline your workflow.
          </p>
          <p>
            Our mission is to simplify the process of creating professional-grade web assets using cutting-edge technologies. 
            Whether you're building a landing page, a mobile app, or a complex web dashboard, faviconExpert provides the building blocks 
            you need to create stunning visual experiences.
          </p>
        </div>
      </section>

      <DesignResourcesSection />

      <section>
        <FAQSection items={CORE_FAQ_ITEMS} />
      </section>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-20 space-y-20">
      <section>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-8 italic uppercase tracking-tighter"
        >
          Contact <span className="neon-text">Us</span>
        </motion.h1>
        <div className="glass-panel p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="micro-label text-slate-400">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-brand-dark/50 border border-white/5 rounded-lg py-3 px-4 focus:outline-none focus:border-brand-cyan transition-all"
                  placeholder="Your name"
                  id="contact-name"
                />
              </div>
              <div className="space-y-2">
                <label className="micro-label text-slate-400">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-brand-dark/50 border border-white/5 rounded-lg py-3 px-4 focus:outline-none focus:border-brand-cyan transition-all"
                  placeholder="your@email.com"
                  id="contact-email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="micro-label text-slate-400">Message</label>
              <textarea 
                className="w-full bg-brand-dark/50 border border-white/5 rounded-lg py-3 px-4 h-32 focus:outline-none focus:border-brand-cyan transition-all"
                placeholder="How can we help?"
                id="contact-message"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-lg font-black text-sm uppercase tracking-widest text-white shadow-lg shadow-brand-purple/20 hover:scale-[1.02] transition-all"
              id="contact-submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <DesignResourcesSection />
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-20 space-y-20">
      <section>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-8 italic uppercase tracking-tighter"
        >
          Privacy <span className="neon-text">Policy</span>
        </motion.h1>
        <div className="glass-panel p-8 space-y-6 text-slate-300">
          <p className="text-sm italic text-slate-500">Last Updated: June 5, 2024</p>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Data Collection</h2>
            <p>We collect minimal data necessary to provide our services. This may include basic usage statistics and your preferred settings.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Cookies</h2>
            <p>We use cookies to remember your preferences and ensure a seamless experience on our platform.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. Third Parties</h2>
            <p>We do not sell your personal information to third parties. Some data may be shared with service providers only for operational purposes.</p>
          </section>
        </div>
      </section>

      <DesignResourcesSection />
    </div>
  );
}

export function TermsOfUsePage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-20 space-y-20">
      <section>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-8 italic uppercase tracking-tighter"
        >
          Terms Of <span className="neon-text">Use</span>
        </motion.h1>
        <div className="glass-panel p-8 space-y-6 text-slate-300">
          <p className="text-sm italic text-slate-500">Last Updated: June 5, 2024</p>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Use of Services</h2>
            <p>You agree to use faviconExpert services for lawful purposes only and in accordance with these Terms.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Intellectual Property</h2>
            <p>The icons and assets generated are yours to use, but the faviconExpert platform and its underlying technology are the property of faviconExpert.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. Limitations</h2>
            <p>We provide our services "as is" and are not responsible for any direct or indirect damages resulting from the use of our platform.</p>
          </section>
        </div>
      </section>

      <DesignResourcesSection />
    </div>
  );
}

