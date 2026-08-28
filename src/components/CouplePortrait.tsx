import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X, Heart } from 'lucide-react';
import { WeddingDetails } from '../types';
import coupleImgFallback from '../assets/images/wedding_couple_portrait_1787953632893.jpg';

interface CouplePortraitProps {
  details: WeddingDetails;
}

export const CouplePortrait: React.FC<CouplePortraitProps> = ({ details }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(coupleImgFallback);

  return (
    <section id="couple-portrait-section" className="relative py-8 px-4 flex flex-col items-center">
      
      {/* Decorative Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-[#200812]/80 border border-[#d4af37]/40 mb-2 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#ffd700]" />
          <span className="text-xs font-['Cairo',sans-serif] font-semibold text-[#f5d061]">
            أجمل حكاية حب
          </span>
          <Sparkles className="w-3 h-3 text-[#ffd700]" />
        </div>
        <h3 className="font-['Aref_Ruqaa',serif] text-3xl sm:text-4xl font-bold gold-gradient-text tracking-wide">
          العريس محمد &amp; العروسة ولاء
        </h3>
      </motion.div>

      {/* Portrait Container with Arch / Royal Frame */}
      <div className="relative w-full max-w-xs sm:max-w-sm flex flex-col items-center">
        
        {/* Ambient Back Glow */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-[#e32636]/30 via-[#d4af37]/25 to-[#a81c2f]/30 rounded-[40px] blur-2xl -z-10 animate-pulse-glow" />

        {/* Ornate Outer Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -4 }}
          className="relative w-full rounded-[32px] p-2.5 sm:p-3 bg-gradient-to-b from-[#d4af37] via-[#a81c2f]/70 to-[#d4af37] border border-[#ffd700]/70 gold-border-glow shadow-2xl overflow-hidden group"
        >
          {/* Inner dark luxury container */}
          <div className="relative rounded-[24px] bg-[#0c0408] overflow-hidden flex flex-col items-center justify-center">
            
            {/* Top gold badge */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-[#16060e]/95 border border-[#d4af37]/60 backdrop-blur-md flex items-center gap-1.5 text-xs text-[#f5d061] font-['Cairo',sans-serif] font-medium shadow-md">
              <Heart className="w-3 h-3 text-[#e63946] fill-[#e63946]" />
              <span>محمد &amp; ولاء</span>
            </div>

            {/* Click to Zoom indicator button */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              aria-label="تكبير الصورة"
              className="absolute bottom-4 left-4 z-20 w-9 h-9 rounded-full bg-[#1a0710]/90 border border-[#d4af37]/70 text-[#f5d061] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer hover:bg-[#2e0b1c]"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Framed Image */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-[4/5] overflow-hidden cursor-pointer flex items-center justify-center bg-neutral-950"
            >
              <img
                src={imageSrc}
                alt="محمد وولاء"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 contrast-105 brightness-105 saturate-110 drop-shadow-[0_10px_35px_rgba(227,38,54,0.4)]"
                onError={() => {
                  if (imageSrc !== coupleImgFallback) {
                    setImageSrc(coupleImgFallback);
                  }
                }}
              />

              {/* Romantic Bottom Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0408] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Portrait Bottom Caption */}
            <div className="w-full py-3.5 px-4 bg-gradient-to-r from-[#1a0610] via-[#2a0c1c] to-[#1a0610] border-t border-[#d4af37]/30 text-center">
              <p className="text-sm font-['Cairo',sans-serif] text-[#fff6d6] font-medium tracking-wide">
                &ldquo;معاً نبدأ رحلة العمر وميثاق الحب الأبدي&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-md w-full max-h-[85vh] rounded-3xl overflow-hidden border-2 border-[#d4af37]/70 shadow-2xl p-1 bg-gradient-to-b from-[#d4af37] to-[#e32636]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-[22px] overflow-hidden bg-black flex flex-col items-center">
                <img
                  src={imageSrc}
                  alt="محمد وولاء"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[70vh] object-contain contrast-105 brightness-105"
                />
                <div className="w-full p-4 bg-[#12040b] text-center border-t border-[#d4af37]/30">
                  <h4 className="font-['Aref_Ruqaa',serif] text-2xl font-bold gold-gradient-text">
                    {details.groomName} &amp; {details.brideName}
                  </h4>
                  <p className="text-sm text-[#f8ede3]/90 font-['Cairo',sans-serif] mt-1">
                    بارك الله لكما وبارك عليكما وجمع بينكما في خير
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
