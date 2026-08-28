import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, X, MessageCircle, QrCode } from 'lucide-react';
import { WeddingDetails } from '../types';

interface ShareModalProps {
  details: WeddingDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareInvitationModal: React.FC<ShareModalProps> = ({ details, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const invitationText = `💍 دعوة خاصة لحضور حفل زفاف محمد وولاء 👰🤵\n\nيسرنا دعوتكم لمشاركتنا فرحتنا بمناسبة زفافنا بعد ${details.daysRemaining} يوماً في ${details.venueName}.\n\nلمشاهدة بطاقة الدعوة التفاعلية وتأكيد الحضور:\n${window.location.href}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(invitationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(invitationText)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-sm w-full rounded-3xl bg-gradient-to-b from-[#240c17] via-[#1a0710] to-[#12040b] p-6 border-2 border-[#d4af37]/50 gold-border-glow shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 text-neutral-300 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-5">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#ffd700] flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-6 h-6" />
            </div>
            <h4 className="font-aref text-xl font-bold gold-gradient-text">
              مشاركة بطاقة الدعوة
            </h4>
            <p className="text-xs text-[#f8ede3]/70 font-cairo mt-1">
              شارك بطاقة زفاف محمد وولاء مع الأهل والأصدقاء
            </p>
          </div>

          <div className="space-y-3">
            {/* WhatsApp Share Button */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold font-cairo text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال الدعوة عبر WhatsApp</span>
            </button>

            {/* Copy Full Invitation Text */}
            <button
              onClick={handleCopyText}
              className="w-full py-3 px-4 rounded-xl bg-[#14050d] border border-[#d4af37]/40 text-[#f5d061] font-bold font-cairo text-xs hover:bg-[#250a17] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">تم نسخ نص الدعوة!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ نص الدعوة كاملاً</span>
                </>
              )}
            </button>

            {/* Copy Link only */}
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-cairo text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>نسخ رابط الصفحة فقط</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
