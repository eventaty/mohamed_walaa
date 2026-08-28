import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { WeddingDetails } from '../types';

interface HeroSectionProps {
  details: WeddingDetails;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ details }) => {
  return (
    <section id="hero-invitation-section" className="relative pt-6 pb-10 px-4 text-center">
      {/* Decorative Golden Top Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/15 via-[#e32636]/20 to-[#d4af37]/15 border border-[#d4af37]/40 backdrop-blur-md mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
        <span className="text-xs font-cairo font-semibold text-[#fff6d6] tracking-wide">
          دعوة زفاف بخالص الحب
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
      </motion.div>

      {/* Bismillah */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-4"
      >
        <p className="font-amiri text-lg md:text-xl text-[#f5d061] tracking-wider">
          بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
        </p>
      </motion.div>

      {/* Quranic Verse Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-lg mx-auto p-5 rounded-2xl bg-gradient-to-b from-[#1c0812]/80 to-[#12040b]/80 border border-[#d4af37]/30 gold-border-glow shadow-xl backdrop-blur-md mb-8"
      >
        {/* Ornate corner points */}
        <div className="absolute top-2 right-2 text-[#d4af37]/40 text-xs">✤</div>
        <div className="absolute top-2 left-2 text-[#d4af37]/40 text-xs">✤</div>
        <div className="absolute bottom-2 right-2 text-[#d4af37]/40 text-xs">✤</div>
        <div className="absolute bottom-2 left-2 text-[#d4af37]/40 text-xs">✤</div>

        <p className="font-amiri text-base sm:text-lg leading-relaxed text-[#fff6d6] italic px-2">
          &ldquo;{details.quranicVerse}&rdquo;
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-[#f5d061]/75 font-cairo">
          <span>سورة الروم - آية ٢١</span>
        </div>
      </motion.div>

      {/* Warm Invitation Message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-md mx-auto mb-8 px-2"
      >
        <p className="text-sm sm:text-base text-[#f8ede3]/90 font-cairo font-light leading-relaxed">
          {details.introMessage}
        </p>
      </motion.div>

      {/* Royal Names of the Bride & Groom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="relative my-6 py-4 flex flex-col items-center justify-center"
      >
        {/* Background glow behind names */}
        <div className="absolute w-64 h-32 bg-[#e32636]/20 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          
          {/* Groom Name */}
          <div className="flex flex-col items-center">
            <h1 className="font-aref text-4xl sm:text-5xl font-bold gold-gradient-text tracking-wide drop-shadow-md">
              {details.groomName}
            </h1>
          </div>

          {/* Golden Heart & Connector */}
          <div className="flex items-center gap-2 my-1 sm:my-0">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#a81c2f] to-[#e32636] border border-[#ffd700]/70 flex items-center justify-center shadow-lg animate-pulse-glow">
              <Heart className="w-5 h-5 text-[#ffd700] fill-[#ffd700]" />
            </div>
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </div>

          {/* Bride Name */}
          <div className="flex flex-col items-center">
            <h1 className="font-aref text-4xl sm:text-5xl font-bold rose-gradient-text tracking-wide drop-shadow-md">
              {details.brideName}
            </h1>
          </div>
        </div>

        {/* English Script Line */}
        <p className="mt-3 text-xs tracking-[0.3em] uppercase text-[#d4af37]/80 font-cairo">
          Mohamed &amp; Walaa &bull; Wedding Celebration
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-4 w-48">
          <div className="h-[1px] flex-1 bg-gradient-to-l from-[#d4af37]/60 to-transparent" />
          <Star className="w-3.5 h-3.5 text-[#ffd700] fill-[#ffd700]" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#d4af37]/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};
