import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, MessageSquareHeart, User } from 'lucide-react';
import { WishMessage } from '../types';

interface WishesWallProps {
  wishes: WishMessage[];
  onAddWish: (name: string, message: string) => void;
  onLikeWish: (id: string) => void;
}

export const WishesWall: React.FC<WishesWallProps> = ({ wishes, onAddWish, onLikeWish }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsPosting(true);
    onAddWish(name.trim(), message.trim());

    try {
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#E32636', '#D4AF37', '#FF9BB2'],
      });
    } catch {}

    setName('');
    setMessage('');
    setTimeout(() => setIsPosting(false), 400);
  };

  return (
    <section id="wishes-wall-section" className="relative py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f5d061] text-xs font-cairo mb-2">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>دفتر التهاني والتبريكات</span>
          </div>
          <h3 className="font-aref text-2xl font-bold gold-gradient-text">
            كلمات من القلب للعروسين
          </h3>
          <p className="text-xs text-[#f8ede3]/70 font-cairo mt-1">
            اترك كلمة محبة ودعاء بالبركة لمحمد وولاء
          </p>
        </motion.div>

        {/* New Wish Form */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-b from-[#240c17]/90 to-[#14050d]/90 border border-[#d4af37]/30 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
              <input
                type="text"
                required
                placeholder="اسمك الكريم..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pr-9 pl-3 py-2 rounded-xl bg-[#0f0409] border border-[#d4af37]/25 text-xs text-[#f8ede3] placeholder:text-neutral-500 font-cairo focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <textarea
              required
              rows={2}
              placeholder="اكتب تهنئتك ودعاءك للعروسين هنا..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#0f0409] border border-[#d4af37]/25 text-xs text-[#f8ede3] placeholder:text-neutral-500 font-cairo focus:outline-none focus:border-[#d4af37]"
            />
            <button
              id="send-wish-btn"
              type="submit"
              disabled={isPosting}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5d061] to-[#d4af37] text-[#12040b] font-bold font-cairo text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال التهنئة للعروسين 💌</span>
            </button>
          </form>
        </div>

        {/* Wishes List */}
        <div className="space-y-3">
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl bg-gradient-to-b from-[#1c0812] to-[#12040b] border border-[#d4af37]/20 shadow-md"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#a81c2f] to-[#e32636] text-white flex items-center justify-center text-xs font-bold font-aref">
                      {wish.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-cairo text-xs font-bold text-[#fff6d6]">
                        {wish.name}
                      </h5>
                      {wish.relation && (
                        <span className="text-[10px] text-[#f5d061]/70 font-cairo">
                          {wish.relation}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-cairo">
                    {wish.timestamp}
                  </span>
                </div>

                <p className="text-xs text-[#f8ede3]/90 font-cairo leading-relaxed pr-2">
                  {wish.message}
                </p>

                {/* Like Button */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-end">
                  <button
                    onClick={() => onLikeWish(wish.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#e32636]/20 text-[11px] font-cairo text-[#ff9bb2] transition-colors cursor-pointer"
                  >
                    <Heart className="w-3 h-3 fill-[#e32636] text-[#e32636]" />
                    <span>{wish.likes} مباركة</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
