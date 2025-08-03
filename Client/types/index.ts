type Property = {
  id: number;
  images: string[];
  title: string;
  description: string;
  dateBuilt: string;
  location: {
    longitude: number;
    latitude: number;
    region: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  parkingSpace: number;
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
  administrationFee: number;
  priceType: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  reference_no: string;
  neighborhood: string;
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
  projectStatus: string;
  housingType: string;
  parkingRange: string;

  delivery_time: string;
  waterHeater: string;
  coolingSystem: string;
  internet: string;
  powerBackup: string;
  nearbyInfrastructure: string[];

  areaRange: string;
  bedroomRange: string;
  bathroomRange: string;
  floorRange: string;
  price: number;
  priceRange: string;
  adminFeeRange: string;
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
  amenities: {
    name: string;
    sub_amenities: string[];
  }[];


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


