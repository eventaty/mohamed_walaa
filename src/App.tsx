import React, { useState, useEffect } from 'react';
import { FallingPetalsCanvas } from './components/FallingPetalsCanvas';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { CouplePortrait } from './components/CouplePortrait';
import { CountdownTimer } from './components/CountdownTimer';
import { EventDetails } from './components/EventDetails';
import { EventTimeline } from './components/EventTimeline';
import { RsvpSection } from './components/RsvpSection';
import { WishesWall } from './components/WishesWall';
import { ShareInvitationModal } from './components/ShareInvitationModal';
import { FooterSection } from './components/FooterSection';
import { defaultWeddingDetails, initialWishes } from './data/weddingData';
import { WishMessage } from './types';
import { Share2, MailOpen } from 'lucide-react';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [wishes, setWishes] = useState<WishMessage[]>(() => {
    const saved = localStorage.getItem('wedding_wishes_mohamed_walaa');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialWishes;
      }
    }
    return initialWishes;
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('wedding_wishes_mohamed_walaa', JSON.stringify(wishes));
  }, [wishes]);

  const handleAddWish = (name: string, message: string) => {
    const newWish: WishMessage = {
      id: Date.now().toString(),
      name,
      message,
      likes: 1,
      timestamp: 'الآن',
    };
    setWishes((prev) => [newWish, ...prev]);
  };

  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0e070b] text-[#f8ede3] overflow-x-hidden selection:bg-[#c93b51] selection:text-white">
      
      {/* Background Floating Petals & Gold Dust Canvas */}
      <FallingPetalsCanvas />

      {/* Interactive Envelope Opening Experience (Wax Seal) */}
      <EnvelopeIntro
        details={defaultWeddingDetails}
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
      />

      {/* Seamless Floating Music Player */}
      <MusicPlayer
        videoId={defaultWeddingDetails.youtubeVideoId}
        autoPlayTriggered={isEnvelopeOpen}
      />

      {/* Quick Floating Top Bar for Re-opening envelope or Sharing */}
      {isEnvelopeOpen && (
        <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#0e070b]/80 border-b border-[#d4af37]/20 py-2.5 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-aref font-bold text-sm sm:text-base gold-gradient-text">
              محمد &amp; ولاء
            </span>
            <span className="text-[10px] text-[#f5d061]/70 font-cairo hidden sm:inline">
              &bull; دعوة زفاف
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEnvelopeOpen(false)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1c0812] border border-[#d4af37]/30 text-[11px] font-cairo text-[#f5d061] hover:bg-[#2e0e1e] active:scale-95 transition-all cursor-pointer"
            >
              <MailOpen className="w-3 h-3 text-[#ffd700]" />
              <span>الظرف</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d061] text-[#12040b] font-bold text-[11px] font-cairo shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-3 h-3" />
              <span>مشاركة</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="relative z-20 max-w-lg mx-auto pb-8">
        
        {/* 1. Hero & Quranic Verse Section */}
        <HeroSection details={defaultWeddingDetails} />

        {/* 2. Couple Portrait & Artwork */}
        <CouplePortrait details={defaultWeddingDetails} />

        {/* 3. Live Countdown Timer (26 Days) */}
        <CountdownTimer details={defaultWeddingDetails} />

        {/* 4. Event Location, Date & Maps */}
        <EventDetails details={defaultWeddingDetails} />

        {/* 5. Ceremony Program Timeline */}
        <EventTimeline />

        {/* 6. RSVP WhatsApp Confirmation */}
        <RsvpSection
          details={defaultWeddingDetails}
          onAddWish={handleAddWish}
        />

        {/* 7. Interactive Congratulations Wishes Book */}
        <WishesWall
          wishes={wishes}
          onAddWish={handleAddWish}
          onLikeWish={handleLikeWish}
        />

        {/* 8. Footer with Prayer and Credits */}
        <FooterSection
          details={defaultWeddingDetails}
          onOpenShare={() => setIsShareModalOpen(true)}
        />
      </main>

      {/* Share Modal */}
      <ShareInvitationModal
        details={defaultWeddingDetails}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
