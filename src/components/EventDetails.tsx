import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Navigation, Check, Copy, Share2, Sparkles, Building2 } from 'lucide-react';
import { WeddingDetails } from '../types';

interface EventDetailsProps {
  details: WeddingDetails;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ details }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const textToCopy = `${details.venueName} - ${details.venueAddress}, ${details.venueCity}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddToGoogleCalendar = () => {
    const startTime = new Date(details.targetDateIso);
    const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

    const formatCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `حفل زفاف ${details.groomName} و ${details.brideName}`
    )}&dates=${formatCalDate(startTime)}/${formatCalDate(endTime)}&details=${encodeURIComponent(
      `يسرنا حضوركم ومشاركتنا فرحتنا بحفل زفاف ${details.groomName} وولاء في ${details.venueName}.`
    )}&location=${encodeURIComponent(`${details.venueName}, ${details.venueAddress}`)}`;

    window.open(googleCalUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const startTime = new Date(details.targetDateIso);
    const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000);

    const formatIcsDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//Mohamed & Walaa//AR',
      'BEGIN:VEVENT',
      `SUMMARY:حفل زفاف ${details.groomName} و ${details.brideName}`,
      `DESCRIPTION:يسرنا حضوركم ومشاركتنا فرحتنا بحفل زفاف محمد وولاء`,
      `LOCATION:${details.venueName}, ${details.venueAddress}`,
      `DTSTART:${formatIcsDate(startTime)}`,
      `DTEND:${formatIcsDate(endTime)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `wedding-${details.groomName}-${details.brideName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="event-details-section" className="relative py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e32636]/15 border border-[#e32636]/30 text-[#ff9bb2] text-xs font-cairo mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>الموعد وموقع الحفل</span>
          </div>
          <h3 className="font-aref text-2xl font-bold gold-gradient-text">
            تفاصيل ليلة العمر
          </h3>
        </motion.div>

        {/* Main Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-b from-[#240c17] via-[#1a0710] to-[#12040b] p-6 border border-[#d4af37]/35 gold-border-glow shadow-2xl space-y-6"
        >
          {/* Date & Time Row */}
          <div className="flex items-start gap-4 pb-5 border-b border-[#d4af37]/20">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d4af37] to-[#aa771c] text-[#12040b] flex items-center justify-center shrink-0 shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-cairo text-[#d4af37] font-semibold uppercase tracking-wider block mb-0.5">
                تاريخ المناسبة
              </span>
              <h4 className="font-aref text-lg font-bold text-[#fff6d6]">
                {details.displayDateArabic}
              </h4>
              <p className="text-xs text-[#f8ede3]/70 font-cairo mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#f5d061]" />
                <span>{details.eventTime}</span>
              </p>
            </div>
          </div>

          {/* Venue & Hall Row */}
          <div className="flex items-start gap-4 pb-5 border-b border-[#d4af37]/20">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#e32636] to-[#a81c2f] text-white flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-['Cairo',sans-serif] text-[#ff9bb2] font-semibold uppercase tracking-wider block mb-0.5">
                  مكان وقاعة الحفل
                </span>
              </div>
              <h4 className="font-['Aref_Ruqaa',serif] text-xl font-bold text-[#fff6d6]">
                {details.venueName}
              </h4>
              <p className="text-xs text-[#f8ede3]/75 font-cairo mt-1">
                {details.venueAddress} &bull; {details.venueCity}
              </p>
            </div>
          </div>

          {/* Interactive Map Buttons */}
          <div className="space-y-3 pt-1">
            {/* Google Maps Button */}
            <a
              id="google-maps-location-btn"
              href={details.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#e32636] via-[#c9184a] to-[#a81c2f] text-white font-bold font-cairo shadow-lg shadow-[#e32636]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#ffd700]" />
              <span>الاتجاهات على خرائط Google Maps</span>
            </a>

            {/* Sub Action Buttons: Copy Address & Add to Calendar */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                id="copy-venue-address-btn"
                onClick={handleCopyAddress}
                className="py-2.5 px-3 rounded-xl bg-[#1a0710] border border-[#d4af37]/40 text-xs font-cairo font-semibold text-[#f5d061] hover:bg-[#2b0c1b] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ العنوان</span>
                  </>
                )}
              </button>

              <button
                id="add-to-calendar-btn"
                onClick={handleAddToGoogleCalendar}
                className="py-2.5 px-3 rounded-xl bg-[#1a0710] border border-[#d4af37]/40 text-xs font-cairo font-semibold text-[#f5d061] hover:bg-[#2b0c1b] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>إضافة للتقويم</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
