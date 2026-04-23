export interface TravelEntry {
  id: string;
  city: string;
  province: string;
  date: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  coordinates: [number, number]; // [longitude, latitude]
}

export interface provinceStats {
  name: string;
  count: number;
}
