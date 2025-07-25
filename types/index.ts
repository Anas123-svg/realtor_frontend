type Property = {
  id: number;
  images: string[];
  title: string;
  description: string;
  location: {
    longitude: number;
    latitude: number;
    region: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  propertyStatus: string;
  dealType: string;
  view: string[];
  outdoor: string[];
  propertyStyle: string[];
  floors: number;
  noiseLevel: string;
  laundry: string;
  securityFeatures: string[];
  amenities: string[];
  internet: string;
  heating: string[];
  cooling: string[];
  powerBackup: string[];
  nearbyInfrastructure: string[];
  condition: string;
  video: string;
  price: number;
  priceType: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
};

type Blog = {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  titleImage: string;
  description: string;
  category: string;
  content: string;
  timeToRead: string;
  created_at: string;
  updated_at: string;
};

type Project = {
  id: number;
  title: string;
  images: string[];
  projectType: string;
  price: number;
  priceRange: string;
  description: string;
  videos: string[];
  address: string;
  longitude: number;
  latitude: number;
  region: string;
  developerInformation: string;
  neighborhood: string[];
  communityFeatures: string[];
  sustainabilityFeatures: string[];
  investmentReason: string[];
  amenities: string[];
  progress: number;
  properties: Property[];
  investmentPotential: string;
  FAQ: {
    question: string;
    answer: string;
  }[];
  created_at: string;
  updated_at: string;
};
