import { MenuItemSelection } from "../TSTypes/MenuInterface";

  // service type
  export const serviceTypeOptions = [
    { label: "Event", value: "event" },
    { label: "Catering", value: "catering" },
  ];
  // for event types
  export const eventTypes = [
    { label: "Wedding", value: "wedding" },
    { label: "Corporate", value: "corporate" },
    { label: "Birthday", value: "birthday" },
    { label: "Other", value: "other" },
  ];

  // meal type options
  export const mealTypeOptions = [
    { label: "Buffet", value: "buffet" },
    { label: "Plated Dinner", value: "plated" },
    { label: "Cocktail", value: "cocktail" },
  ];
  // beverage options
  export const beverageTypeOptions = [
    { label: "Tea", value: "tea" },
    { label: "Coffee", value: "coffee" },
    { label: "Alcohol", value: "alcohol" },
    { label: "Juice", value: "juice" },
  ];

  // catering service
  // export const cateringTypeOptions = [
  //   { label: "Buffet", value: "buffet" },
  //   { label: "Plated", value: "plated" },
  //   { label: "Family Style", value: "family" },
  // ];

  // export const menuOptions = [
  //   { label: "Italian Set", value: "italian" },
  //   { label: "Indian Combo", value: "indian" },
  //   { label: "Asian Fusion", value: "asian" },
  // ]

export const cateringTypeOptions = [
  { value: "buffet", label: "Buffet Catering" },
  { value: "plated", label: "Plated Meal Catering" },
  { value: "cocktail", label: "Cocktail/Canapé Catering" },
  { value: "bbq", label: "BBQ Catering" },
];

export const cateringMenuOptions: Record<string, MenuItemSelection[]> = {
  buffet: [
    { id: "hotBuffet", label: "Hot Buffet", price: 25, unit: "per person", quantity: 0 },
    { id: "coldBuffet", label: "Cold Buffet", price: 20, unit: "per person", quantity: 0 },
  ],
  plated: [
    { id: "2course", label: "2-Course Meal", price: 45, unit: "per person", quantity: 0 },
    { id: "3course", label: "3-Course Meal", price: 60, unit: "per person", quantity: 0 },
  ],
  cocktail: [
    { id: "canapes10", label: "10 Piece Canapé Set", price: 35, unit: "per person", quantity: 0 },
    { id: "canapes15", label: "15 Piece Canapé Set", price: 50, unit: "per person", quantity: 0 },
  ],
  bbq: [
    { id: "standardBBQ", label: "Standard BBQ Package", price: 30, unit: "per person", quantity: 0 },
    { id: "premiumBBQ", label: "Premium BBQ Package", price: 50, unit: "per person", quantity: 0 },
  ],
};




  export const dietaryRestrictionOptions = [
    { label: "Vegan", value: "vegan" },
    { label: "Halal", value: "halal" },
    { label: "Allergies", value: "allergies" },
  ];

  export const serviceProvideOptions = [
    { label: "Delivery", value: "delivery" },
    { label: "Onsite Staff", value: "onsite" },
    { label: "Full Service", value: "fullService" },
  ];

  export const setupOptions = [
    { label: "Tableware", value: "tableware" },
    { label: "Linens", value: "linens" },
    { label: "Cutlery", value: "cutlery" },
  ];

  export const mealTimes = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
  ];

  export const addOnOptions = [
    { label: "Desserts", value: "desserts" },
    { label: "Snacks", value: "snacks" },
    { label: "Appetizers", value: "appetizers" },
  ];
