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
        url: "/properties?dealType=New",
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
        title: "AirbndRental",
        url: "/services"
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
  {
    title: "navServices",
    url: "/services",
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
  id: 6,
  label: "Bavaria",
  longitude: -74.1789542,
  latitude: 11.2312456,
  region: "Bavaria, Santa Marta, Magdalena, Colombia",
},
{
  id: 8,
  label: "Bellavista",
  longitude: -74.1892642,
  latitude: 11.2356789,
  region: "Bellavista, Santa Marta, Magdalena, Colombia",
},
{
  id: 2,
  label: "Bello Horizonte",
  longitude: -74.1925478,
  latitude: 11.1478661,
  region: "Bello Horizonte, Santa Marta, Magdalena, Colombia",
},
{
  id: 0,
  label: "El Rodadero",
  longitude: -74.1768871,
  latitude: 11.1682225,
  region: "El Rodadero, Santa Marta, Magdalena, Colombia",
},
{
  id: 5,
  label: "Gaira",
  longitude: -74.1827893,
  latitude: 11.1789542,
  region: "Gaira, Santa Marta, Magdalena, Colombia",
},
{
  id: 7,
  label: "Los Cocos",
  longitude: -74.1827893,
  latitude: 11.2425671,
  region: "Los Cocos, Santa Marta, Magdalena, Colombia",
},
{
  id: 9,
  label: "Mamatoco",
  longitude: -74.1641100,
  latitude: 11.2326900,
  region: "Mamatoco, Santa Marta, Magdalena, Colombia",
},
{
  id: 4,
  label: "Playa Salguero",
  longitude: -74.1892642,
  latitude: 11.1532749,
  region: "Playa Salguero, Santa Marta, Magdalena, Colombia",
},
{
  id: 3,
  label: "Pozos Colorados",
  longitude: -74.2007561,
  latitude: 11.1378863,
  region: "Pozos Colorados, Santa Marta, Magdalena, Colombia",
},
{
  id: 1,
  label: "Rodadero Sur",
  longitude: -74.1827893,
  latitude: 11.1594316,
  region: "Rodadero Sur, Santa Marta, Magdalena, Colombia",
},






];
