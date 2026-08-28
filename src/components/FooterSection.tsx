import React from 'react';
import { Heart, Sparkles, Share2 } from 'lucide-react';
import { WeddingDetails } from '../types';

interface FooterSectionProps {
  details: WeddingDetails;
  onOpenShare: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ details, onOpenShare }) => {
  return (
    <footer className="relative pt-8 pb-20 px-4 text-center border-t border-[#d4af37]/20 bg-gradient-to-b from-[#12040b] to-[#080205]">
      
      {/* Decorative Golden Emblem */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-12 h-[1px] bg-gradient-to-l from-[#d4af37]/60 to-transparent" />
        <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#ffd700]">
          <Heart className="w-4 h-4 fill-[#e32636] text-[#e32636]" />
        </div>
        <div className="w-12 h-[1px] bg-gradient-to-r from-[#d4af37]/60 to-transparent" />
      </div>

      <h4 className="font-aref text-2xl font-bold gold-gradient-text">
        {details.groomName} &amp; {details.brideName}
      </h4>
      <p className="text-xs text-[#f8ede3]/70 font-cairo mt-1">
        نسأل الله أن يبارك لنا ويبارك علينا ويجمع بيننا في خير
      </p>

      {/* Dress code & special note */}
      <div className="max-w-xs mx-auto mt-5 p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
        <span className="text-[11px] text-[#f5d061] font-cairo block font-semibold mb-0.5">
          ✨ ملاحظة لطيفة
        </span>
        <p className="text-[11px] text-[#f8ede3]/80 font-cairo">
          فرحتنا تكتمل برؤيتكم، جنة الأطفال منازلهم 👶❤️
        </p>
      </div>

      {/* Share Button in Footer */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onOpenShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#e32636]/20 to-[#d4af37]/20 border border-[#d4af37]/40 text-xs font-cairo text-[#fff6d6] hover:border-[#d4af37] active:scale-95 transition-all cursor-pointer shadow-md"
        >
          <Share2 className="w-3.5 h-3.5 text-[#ffd700]" />
          <span>مشاركة رابط الدعوة مع الأصدقاء</span>
        </button>
      </div>

      <p className="text-[10px] text-neutral-500 font-cairo mt-8">
        تم تصميم وبرمجة بطاقة الدعوة بكل حب لمناسبة زفاف محمد وولاء &bull; 2026
      </p>
    </footer>
  );
};
