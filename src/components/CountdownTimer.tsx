import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Sparkles, Heart } from 'lucide-react';
import { WeddingDetails } from '../types';

interface CountdownTimerProps {
  details: WeddingDetails;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ details }) => {
  const targetDateMs = React.useMemo(() => {
    return new Date(details.targetDateIso).getTime();
  }, [details.targetDateIso]);

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDateMs - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateMs]);

  const timeUnits = [
    { label: 'يوم', value: timeLeft.days, color: 'text-[#ffd700]' },
    { label: 'ساعة', value: timeLeft.hours, color: 'text-[#fff6d6]' },
    { label: 'دقيقة', value: timeLeft.minutes, color: 'text-[#ff9bb2]' },
    { label: 'ثانية', value: timeLeft.seconds, color: 'text-[#f5d061]' },
  ];

  return (
    <section id="countdown-timer-section" className="relative py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f5d061] text-xs font-cairo mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>العد التنازلي لليلة العمر</span>
          </div>
          <h3 className="font-aref text-2xl font-bold gold-gradient-text">
            ننتظر تشريفكم بعد {timeLeft.days} يوماً
          </h3>
          <p className="text-xs text-[#f8ede3]/70 font-cairo mt-1">
            {details.displayDateArabic} &bull; {details.eventTime}
          </p>
        </motion.div>

        {/* 4 Countdown Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#240c17] via-[#16060e] to-[#0f0409] border border-[#d4af37]/30 gold-border-glow shadow-xl"
            >
              {/* Digit Value */}
              <span className={`font-aref text-2xl sm:text-3xl font-bold ${unit.color} tracking-tight`}>
                {unit.value.toString().padStart(2, '0')}
              </span>
              
              {/* Unit Label */}
              <span className="text-[11px] sm:text-xs font-cairo text-[#f8ede3]/80 font-medium mt-1">
                {unit.label}
              </span>

              {/* Top Accent bar */}
              <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Celebratory reminder footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-5 p-3 rounded-xl bg-[#1c0812]/60 border border-[#d4af37]/20 flex items-center justify-center gap-2 text-center text-xs font-cairo text-[#fff6d6]/90"
        >
          <Heart className="w-3.5 h-3.5 text-[#e63946] fill-[#e63946] shrink-0" />
          <span>حضوركم ومشاركتكم فرحتنا تزيد ليلتنا بهاءً وسعادة</span>
        </motion.div>
      </div>
    </section>
  );
};
