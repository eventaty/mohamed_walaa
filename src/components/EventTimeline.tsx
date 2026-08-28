import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown, Cake, Utensils, Heart, Clock } from 'lucide-react';
import { ceremonyTimeline } from '../data/weddingData';

export const EventTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#ffd700]" />;
      case 'Crown':
        return <Crown className="w-4 h-4 text-[#ffd700]" />;
      case 'Cake':
        return <Cake className="w-4 h-4 text-[#ffd700]" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-[#ffd700]" />;
      default:
        return <Heart className="w-4 h-4 text-[#ffd700]" />;
    }
  };

  return (
    <section id="ceremony-timeline-section" className="relative py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f5d061] text-xs font-cairo mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>برنامج وفقرات الحفل</span>
          </div>
          <h3 className="font-aref text-2xl font-bold gold-gradient-text">
            جدول الليلة المباركة
          </h3>
        </motion.div>

        {/* Timeline Items */}
        <div className="relative border-r-2 border-[#d4af37]/30 mr-4 sm:mr-6 space-y-6">
          {ceremonyTimeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative pr-6 sm:pr-8"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -right-[17px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] via-[#a81c2f] to-[#5a0b18] border-2 border-[#ffd700] flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
                {getIcon(item.icon)}
              </div>

              {/* Event Content Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#240c17]/90 to-[#14050d]/90 border border-[#d4af37]/25 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-aref text-base font-bold text-[#fff6d6]">
                    {item.title}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[11px] font-cairo font-semibold text-[#f5d061]">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-[#f8ede3]/75 font-cairo leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
