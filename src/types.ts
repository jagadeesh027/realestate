export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Mansion';
  image: string;
  description: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
