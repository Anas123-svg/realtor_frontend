import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";
import img4 from "@/assets/4.png";
import img5 from "@/assets/5.png";

export const navLinks = [
  {
    title: "navHome",
    url: "/",
  },
  {
    title: "navExistingProperties",
    url: "/properties?condition=Used&dealType=Sale",
  },

  {
    title: "navNewDevelopments",
    url: "/projects",
    children: [
      {
        title: "Projects", // or a more specific name like "newConstruction"
        url: "/projects",
      },
      {
        title: "Properties in Projects",
        url: "/properties?condition=Used&dealType=Sale",
      },
    ],
  },
  {
    title: "navRentals",
    url: "/properties?dealType=Rental",
    children: [
      {
        title: "touristRental",
        url: "/properties?dealType=Tourist%20Rental",
      },
      {
        title: "residentialRental",
        url: "/properties?dealType=Residential%20Rental",
      },
    ],
  },
  {
    title: "navSellRent",
    url: "/sell-rent",
  },

  {
    title: "navAbout",
    url: "/about",
  },
];










export interface AmenityCategoryDef {
  id: number;
  name: string;
  items: string[];
}

export const AMENITIES_WITH_I: AmenityCategoryDef[] = [
  {
    id: 1,
    name: "Pools & Water Features",
    items: [
      "Adult swimming pool",
      "Kids' swimming pool",
      "Lap pool",
      "Jacuzzi",
      "Solarium",
    ],
  },
  {
    id: 2,
    name: "Social & Entertainment",
    items: [
      "BBQ area",
      "Lounge bar",
      "Bar/restaurant area",
      "Event hall",
      "Beach club",
      "Mini-theater",
      "Game room",
    ],
  },
  {
    id: 3,
    name: "Health & Wellness",
    items: ["Gym", "Multi-purpose exercise room", "Spa", "Massage room"],
  },
  {
    id: 4,
    name: "Sports & Outdoor",
    items: [
      "Jogging trail",
      "Bicycle trail",
      "Kids' playroom",
      "Multi-sports court",
      "Squash court",
      "Paddle court",
      "Tennis court",
      "Football pitch",
      "Mini golf",
      "Bowling",
    ],
  },
  {
    id: 5,
    name: "Business & Services",
    items: [
      "Coworking space",
      "Staff service area",
      "Administration office",
      "Reception area",
      "Mini-market zone",
    ],
  },
  {
    id: 6,
    name: "Security & Sustainability",
    items: [
      "Recycling area",
      "Communal parking",
      "Elevators",
      "Gated community",
      "Security guard",
      "Alarm system",
    ],
  },
];



export const AMENITIES_WITH_ID = [
  {
    id: 1,
    name: "Pools & Water Features",
    items: [
      "Adult swimming pool",
      "Kids' swimming pool",
      "Lap pool",
      "Jacuzzi",
      "Solarium"
    ],
  },
  {
    id: 2,
    name: "Social & Entertainment",
    items: [
      "BBQ area",
      "Lounge bar",
      "Bar/restaurant area",
      "Event hall",
      "Beach club",
      "Mini-theater",
      "Game room"
    ],
  },
  {
    id: 3,
    name: "Health & Wellness",
    items: [
      "Gym",
      "Multi-purpose exercise room",
      "Spa",
      "Massage room"
    ],
  },
  {
    id: 4,
    name: "Sports & Outdoor",
    items: [
      "Jogging trail",
      "Bicycle trail",
      "Kids' playroom",
      "Multi-sports court",
      "Squash court",
      "Paddle court",
      "Tennis court",
      "Football pitch",
      "Mini golf",
      "Bowling"
    ],
  },
  {
    id: 5,
    name: "Business & Services",
    items: [
      "Coworking space",
      "Staff service area",
      "Administration office",
      "Reception area",
      "Mini-market zone"
    ],
  },
  {
    id: 6,
    name: "Security & Sustainability",
    items: [
      "Recycling area",
      "Communal parking",
      "Elevators",
      "Gated community",
      "Security guard",
      "Alarm system"
    ],
  },
];


export const AMENITIESF = {
  "Pools & Water Features": [
    "Adult swimming pool",
    "Kids' swimming pool",
    "Lap pool",
    "Jacuzzi",
    "Solarium"
  ],
  "Social & Entertainment": [
    "BBQ area",
    "Lounge bar",
    "Bar/restaurant area",
    "Event hall",
    "Beach club",
    "Mini-theater",
    "Game room"
  ],
  "Health & Wellness": [
    "Gym",
    "Multi-purpose exercise room",
    "Spa",
    "Massage room"
  ],
  "Sports & Outdoor": [
    "Jogging trail",
    "Bicycle trail",
    "Kids' playroom",
    "Multi-sports court",
    "Squash court",
    "Paddle court",
    "Tennis court",
    "Football pitch",
    "Mini golf",
    "Bowling"
  ],
  "Business & Services": [
    "Coworking space",
    "Staff service area",
    "Administration office",
    "Reception area",
    "Mini-market zone"
  ],
  "Security & Sustainability": [
    "Recycling area",
    "Communal parking",
    "Elevators",
    "Gated community",
    "Security guard",
    "Alarm system"
  ],
};











export const team = [
  {
    img: img1.src,
    name: "Gloria Noguera",
    description: "gloriaText",
    whatsapp: "https://wa.me/+573013981672",
  },
  {
    img: img2.src,
    name: "Ingrid Burke Sanchez",
    description: "ingridText",
    whatsapp: "https://wa.me/+573154638039",
  },
  {
    img: img3.src,
    name: "Glenis Charris",
    description: "glenisText",
    whatsapp: "https://wa.me/+573192647084",
  },
  {
    img: img4.src,
    name: "Dayana Vega Guerrero",
    description: "dayanaText",
    whatsapp: "https://wa.me/+573044415007",
  },
  {
    img: img5.src,
    name: "Ibelis Moreno",
    description: "ibelisText",
    whatsapp: "https://wa.me/+573012921856",
  },
] as const;

export const BEDROOM_OPTIONS = ["1", "2", "3", "4", "4+"] as const;

export const BATHROOM_OPTIONS = ["1", "2", "3", "4", "4+"] as const;

export const PARKIING_OPTIONS = ["1", "2", "3", "4", "4+"] as const;

export const FLOOR_OPTIONS = ["1", "2", "3", "4", "4+"] as const;

export const RADIUS_OPTIONS = [
  { value: "5", label: "5 miles" },
  { value: "10", label: "10 miles" },
  { value: "20", label: "20 miles" },
  { value: "50", label: "50 miles" },
  { value: "100", label: "100 miles" },
] as const;

export const PROPERTY_TYPES = [
  "House",
  "Beach House",
  "Condo",
  "Apartment",
  "Studio Apartment",
  "Commercial",
  "Land",
  "Offices",

];

export const VIEW_OPTIONS = ["City", "Mountain", "Water", "Park"];

export const OUTDOOR_OPTIONS = ["Balcony", "Garden", "Pool", "Patio"];

export const PROPERTY_STYLES = [
  "Modern",
  "Classic",
  "Contemporary",
  "Colonial",
];

export const NOISE_LEVELS = ["Low", "Medium", "High"];

export const LAUNDRY_OPTIONS = ["In Unit", "Shared/Communal"];

export const SECURITY_FEATURES = [
  "Gated Community",
  "Security Guard",
  "Alarm System",
];

export const AMENITIES = [
  "Adult swimming pool",
  "Kids' swimming pool",
  "Lap pool",
  "BBQ area",
  "Jacuzzi",
  "Lounge bar",
  "Solarium",
  "Bar/restaurant area",
  "Staff service area",
  "Administration office",
  "Coworking space",
  "Beach club",
  "Event hall",
  "Gym",
  "Multi-purpose exercise room",
  "Jogging trail",
  "Bicycle trail",
  "Kids' playroom",
  "Multi-sports court",
  "Game room",
  "Reception area",
  "Mini-market zone",
  "Mini-theater",
  "Spa",
  "Massage room",
  "Recycling area",
  "Communal parking",
  "Elevators",
];




export const INTERNET_TYPES = ["Fiber", "Cable", "DSL"];

export const HEATING_TYPES = ["Not Available", "Available", "Gas", "Electric"];

export const COOLING_TYPES = [
  "Central Air Conditioning",
  "Mini Split Air Conditioning",
];



export const NEARBY_INFRASTRUCTURE = [
  "Hospital",
  "School",
  "Supermarket",
  "Park",
  "Shopping Mall",
  "Public Transport",
];

export const POWER_BACKUP = ["Partial Coverage", "Full Coverage"];

export const PROPERTY_STATUS = [
  "Off Plan",
  "Under Construction",
  "Brand New",
  "Used",
  "Turnkey",
];

export const locations = [
  {
    id: 0,
    label: "El Rodadero",
    longitude: -74.1768871,
    latitude: 11.1682225,
    region: "El Rodadero, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 1,
    label: "Rodadero Sur",
    longitude: -74.1827893,
    latitude: 11.1594316,
    region: "Rodadero Sur, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 2,
    label: "Bello Horizonte",
    longitude: -74.1925478,
    latitude: 11.1478661,
    region: "Bello Horizonte, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 3,
    label: "Pozos Colorados",
    longitude: -74.2007561,
    latitude: 11.1378863,
    region: "Pozos Colorados, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 4,
    label: "Playa Salguero",
    longitude: -74.1892642,
    latitude: 11.1532749,
    region: "Playa Salguero, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 5,
    label: "Taganga",
    longitude: -74.1927791,
    latitude: 11.2639323,
    region: "Taganga, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 6,
    label: "Gaira",
    longitude: -74.1827893,
    latitude: 11.1789542,
    region: "Gaira, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 7,
    label: "Bavaria",
    longitude: -74.1789542,
    latitude: 11.2312456,
    region: "Bavaria, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 8,
    label: "Los Cocos",
    longitude: -74.1827893,
    latitude: 11.2425671,
    region: "Los Cocos, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 9,
    label: "Jardín",
    longitude: -74.1789542,
    latitude: 11.2256789,
    region: "Jardín, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 10,
    label: "Ciudad Jardín",
    longitude: -74.1754893,
    latitude: 11.2289542,
    region: "Ciudad Jardín, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 11,
    label: "Bellavista",
    longitude: -74.1892642,
    latitude: 11.2356789,
    region: "Bellavista, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 12,
    label: "Villa Marbella",
    longitude: -74.1827893,
    latitude: 11.1689542,
    region: "Villa Marbella, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 13,
    label: "Santa Cruz de Curinca",
    longitude: -74.1754893,
    latitude: 11.1956789,
    region: "Santa Cruz de Curinca, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 14,
    label: "La Castellana",
    longitude: -74.1892642,
    latitude: 11.2156789,
    region: "La Castellana, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 15,
    label: "Riviera del Mar",
    longitude: -74.1754893,
    latitude: 11.1856789,
    region: "Riviera del Mar, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 16,
    label: "Altos de Delicias",
    longitude: -74.1892642,
    latitude: 11.2056789,
    region: "Altos de Delicias, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 17,
    label: "Alameda del Río",
    longitude: -74.1754893,
    latitude: 11.2156789,
    region: "Alameda del Río, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 18,
    label: "Villa Támara",
    longitude: -74.1892642,
    latitude: 11.1956789,
    region: "Villa Támara, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 19,
    label: "Villa Concha",
    longitude: -74.1989542,
    latitude: 11.2656789,
    region: "Villa Concha, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 20,
    label: "Minca",
    longitude: -74.1197791,
    latitude: 11.1439323,
    region: "Minca, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 21,
    label: "Bonda",
    longitude: -74.1254893,
    latitude: 11.2356789,
    region: "Bonda, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 22,
    label: "Palomino",
    longitude: -73.5589542,
    latitude: 11.2556789,
    region: "Palomino, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 23,
    label: "Don Jaca",
    longitude: -74.2127893,
    latitude: 11.1278863,
    region: "Don Jaca, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 24,
    label: "La Sierra",
    longitude: -74.1754893,
    latitude: 11.2456789,
    region: "La Sierra, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 25,
    label: "Manzanares",
    longitude: -74.1892642,
    latitude: 11.2256789,
    region: "Manzanares, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 26,
    label: "Villa Tanga",
    longitude: -74.1754893,
    latitude: 11.2356789,
    region: "Villa Tanga, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 27,
    label: "Marbella",
    longitude: -74.1892642,
    latitude: 11.1756789,
    region: "Marbella, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 28,
    label: "San Francisco",
    longitude: -74.1754893,
    latitude: 11.2156789,
    region: "San Francisco, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 29,
    label: "Los Alcatraces",
    longitude: -74.1892642,
    latitude: 11.2056789,
    region: "Los Alcatraces, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 30,
    label: "Los Almendros",
    longitude: -74.1754893,
    latitude: 11.2256789,
    region: "Los Almendros, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 31,
    label: "Cabo Tortuga",
    longitude: -74.2092642,
    latitude: 11.1456789,
    region: "Cabo Tortuga, Santa Marta, Magdalena, Colombia",
  },
  {
    id: 32,
    label: "Irotama",
    longitude: -74.1954893,
    latitude: 11.1556789,
    region: "Irotama, Santa Marta, Magdalena, Colombia",
  },
];
