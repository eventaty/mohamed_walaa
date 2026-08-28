export interface WeddingDetails {
  groomName: string;
  brideName: string;
  title: string;
  quranicVerse: string;
  introMessage: string;
  daysRemaining: number;
  targetDateIso: string;
  displayDateArabic: string;
  eventTime: string;
  venueName: string;
  venueCity: string;
  venueAddress: string;
  googleMapsUrl: string;
  youtubeVideoId: string;
  whatsappContactNumber: string;
  dressCodeText: string;
  coupleImage: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relation?: string;
  message: string;
  likes: number;
  timestamp: string;
}

export interface RsvpSubmission {
  guestName: string;
  guestsCount: number;
  attendance: 'attending' | 'apologetic';
  wishesText: string;
}
