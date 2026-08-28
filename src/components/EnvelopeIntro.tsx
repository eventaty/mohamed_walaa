import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { WeddingDetails } from '../types';

interface EnvelopeIntroProps {
  details: WeddingDetails;
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ details, onOpen, isOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpenEnvelope = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Fire luxury celebration confetti (gold + royal red)
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E32636', '#FFF6D6', '#AA771C', '#FF4D6D'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#E32636', '#F5D061'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#E32636', '#F5D061'],
        });
      }, 250);
    } catch {
      // Fallback if canvas is unavailable
    }

    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
    }, 600);
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="royal-envelope-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-[#0e070b]/95 backdrop-blur-xl"
      >
        {/* Glowing atmospheric circles */}
        <div className="absolute w-80 h-80 rounded-full bg-[#e32636]/15 blur-3xl pointer-events-none -top-10 -right-10" />
        <div className="absolute w-80 h-80 rounded-full bg-[#d4af37]/15 blur-3xl pointer-events-none -bottom-10 -left-10" />

        {/* Outer Frame */}
        <div className="relative w-full max-w-sm flex flex-col items-center">
          
          {/* Top Basmala & Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <span className="text-[#d4af37] text-sm tracking-widest font-amiri block mb-1">
              بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </span>
            <h2 className="text-xl font-bold font-aref gold-gradient-text">
              دعوة زفاف خاصة وفاخرة
            </h2>
            <p className="text-xs text-[#f8ede3]/70 font-cairo mt-1">
              لحضور حفل زفاف {details.groomName} & {details.brideName}
            </p>
          </motion.div>

          {/* 3D Envelope Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={handleOpenEnvelope}
            className="w-full relative cursor-pointer group"
          >
            {/* Envelope Body */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#240c17] via-[#1a0710] to-[#12040b] p-6 border-2 border-[#d4af37]/40 gold-border-glow shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-[#d4af37]/80">
              
              {/* Gold Filigree Corner Accents */}
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/60 rounded-tr-lg" />
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/60 rounded-tl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/60 rounded-br-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/60 rounded-bl-lg" />

              {/* Envelope Flap visual geometry */}
              <div className="relative border-b border-[#d4af37]/20 pb-4 mb-4 text-center">
                <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f5d061] text-xs font-['Cairo',sans-serif] font-semibold mb-2.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>بطاقة دعوة مع خالص الحب</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Aref_Ruqaa',serif] gold-gradient-text tracking-wide">
                  {details.groomName} &amp; {details.brideName}
                </h3>
              </div>

              {/* Center Wax Seal with Initials */}
              <div className="flex flex-col items-center justify-center my-4 py-2">
                <div className="relative">
                  {/* Glowing seal aura */}
                  <div className="absolute inset-0 rounded-full bg-[#e32636]/30 blur-md animate-pulse-glow" />
                  
                  {/* Wax Seal Disk */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] via-[#a81c2f] to-[#730a1c] border-3 border-[#ffd700] shadow-xl flex flex-col items-center justify-center text-center text-white"
                  >
                    <Heart className="w-4 h-4 text-[#ffd700] fill-[#ffd700] mb-0.5" />
                    <span className="font-aref font-bold text-xs tracking-wider text-[#fff6d6]">
                      M & W
                    </span>
                    <span className="text-[9px] font-cairo text-[#ffd700]/90">
                      زفاف
                    </span>
                  </motion.div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm font-cairo font-bold text-[#f5d061] flex items-center justify-center gap-1.5 animate-pulse">
                    <span>انقر هنا لفتح بطاقة الدعوة</span>
                    <Sparkles className="w-4 h-4 text-[#ffd700]" />
                  </p>
                </div>
              </div>

              {/* Bottom decorative bar */}
              <div className="pt-3 border-t border-[#d4af37]/20 flex items-center justify-between text-[11px] text-[#f8ede3]/60 font-cairo">
                <span>الموعد: بعد {details.daysRemaining} يوماً</span>
                <span className="text-[#f5d061] font-medium">{details.venueName.split('(')[0]}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
