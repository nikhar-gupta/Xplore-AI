export interface TravelFormData {
  destination: string;
  days: number;
  travelType: string;
  interests: string[];
}

export interface ItineraryDay {
  day: number;
  plan: string;
}
