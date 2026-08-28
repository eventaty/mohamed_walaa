import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Send, User, Users, HeartHandshake, Sparkles } from 'lucide-react';
import { WeddingDetails } from '../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface RsvpSectionProps {
  details: WeddingDetails;
  onAddWish: (name: string, message: string) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ details, onAddWish }) => {
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attendance, setAttendance] = useState<'attending' | 'apologetic'>('attending');
  const [customWish, setCustomWish] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    // Trigger confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#E32636', '#FF9BB2', '#FFF6D6'],
      });
    } catch {}

    // Save to Cloud Firestore
    try {
      await addDoc(collection(db, 'rsvps'), {
        guestName: guestName.trim(),
        guestsCount: attendance === 'attending' ? guestCount : 0,
        attendance,
        customWish: customWish.trim(),
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn('Firestore RSVP save note:', err);
    }

    // Add to wishes board if message provided
    if (customWish.trim()) {
      onAddWish(guestName.trim(), customWish.trim());
    }

    // Prepare WhatsApp Message
    const attendanceText =
      attendance === 'attending'
        ? `✅ يشرفني ويسعدني الحضور ومشاركتكم الفرحة (عدد الأفراد: ${guestCount})`
        : `💌 أعتذر عن الحضور مع خالص دعواتي لكما بالتوفيق والسعادة الدائمة`;

    const wishPart = customWish.trim() ? `\n\n✨ تهنئتي للعروسين:\n"${customWish.trim()}"` : '';

    const whatsappMessage = `*دعوة زفاف ${details.groomName} و ${details.brideName}* 💍\n\n*المرسل:* ${guestName}\n*حالة الحضور:* ${attendanceText}${wishPart}\n\nألف مبروك لأجمل عروسين! ❤️🎉`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${details.whatsappContactNumber}&text=${encodeURIComponent(
      whatsappMessage
    )}`;

    setIsSubmitted(true);

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  return (
    <section id="rsvp-confirmation-section" className="relative py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#4ade80] text-xs font-cairo mb-2">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>تأكيد الحضور (RSVP)</span>
          </div>
          <h3 className="font-aref text-2xl font-bold gold-gradient-text">
            يسعدنا تأكيد حضوركم الكريم
          </h3>
          <p className="text-xs text-[#f8ede3]/70 font-cairo mt-1">
            يرجى تأكيد الحضور لإتمام كافة الترتيبات وحجز الأماكن
          </p>
        </motion.div>

        {/* RSVP Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-b from-[#240c17] via-[#1a0710] to-[#12040b] p-6 border border-[#d4af37]/35 gold-border-glow shadow-2xl"
        >
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#25D366]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-aref text-xl font-bold text-[#fff6d6]">
                شكراً لك يا {guestName}!
              </h4>
              <p className="text-xs text-[#f8ede3]/80 font-cairo">
                تم تسجيل ردك بنجاح وجاري فتح واتساب لإرسال التأكيد للعروسين.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-[#16060e] border border-[#d4af37]/40 text-xs text-[#f5d061] font-cairo hover:bg-[#250a17] cursor-pointer"
              >
                تعديل البيانات أو إرسال تأكيد آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-cairo font-semibold text-[#fff6d6] mb-1.5">
                  الاسم الكريم *
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
                  <input
                    type="text"
                    required
                    placeholder="اكتب اسمك الكريم هنا..."
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#14050d] border border-[#d4af37]/30 text-sm text-[#f8ede3] placeholder:text-neutral-500 font-cairo focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-cairo font-semibold text-[#fff6d6] mb-1.5">
                  حالة الحضور *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-3 px-3 rounded-xl border text-xs font-cairo font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      attendance === 'attending'
                        ? 'bg-gradient-to-r from-[#25D366]/20 to-[#128C7E]/30 border-[#25D366] text-[#4ade80] shadow-md'
                        : 'bg-[#14050d] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span>يشرفني الحضور 💍</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('apologetic')}
                    className={`py-3 px-3 rounded-xl border text-xs font-cairo font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      attendance === 'apologetic'
                        ? 'bg-neutral-800/80 border-neutral-600 text-neutral-200 shadow-md'
                        : 'bg-[#14050d] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span>أعتذر بكل ود 🌹</span>
                  </button>
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {attendance === 'attending' && (
                <div>
                  <label className="block text-xs font-cairo font-semibold text-[#fff6d6] mb-1.5">
                    عدد الأفراد والمرافقين
                  </label>
                  <div className="relative">
                    <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#14050d] border border-[#d4af37]/30 text-sm text-[#f8ede3] font-cairo focus:outline-none focus:border-[#d4af37] transition-all cursor-pointer"
                    >
                      <option value={1} className="bg-[#14050d] text-white">شخص واحد (أنا فقط)</option>
                      <option value={2} className="bg-[#14050d] text-white">شخصان (٢)</option>
                      <option value={3} className="bg-[#14050d] text-white">٣ أشخاص</option>
                      <option value={4} className="bg-[#14050d] text-white">٤ أشخاص أو عائلة</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Custom Blessing / Congratulations */}
              <div>
                <label className="block text-xs font-cairo font-semibold text-[#fff6d6] mb-1.5">
                  كلمة طيبة أو دعاء للعروسين (اختياري)
                </label>
                <textarea
                  rows={2}
                  placeholder="بارك الله لكما وبارك عليكما..."
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#14050d] border border-[#d4af37]/30 text-sm text-[#f8ede3] placeholder:text-neutral-500 font-cairo focus:outline-none focus:border-[#d4af37] transition-all"
                />
              </div>

              {/* Submit to WhatsApp Button */}
              <button
                id="submit-rsvp-btn"
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#128C7E] text-white font-bold font-cairo shadow-lg shadow-[#25D366]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>إرسال التأكيد عبر واتساب</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
