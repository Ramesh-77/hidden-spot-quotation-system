export interface MenuItemSelection {
  id: string;        // unique identifier e.g. "buffet", "sandwichPlatter"
  label: string;     // display label e.g. "Hot Buffet"
  price: number;     // unit price
  unit: string;      // "per person" | "per platter" | "per package"
  quantity: number;  // number selected
}
export interface FormData {
  serviceType: "event" | "catering" | "";
  // client data
  fullName: string;
  email: string;
  phone: string;

  // event form data
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventType: string;
  numberOfGuests: number;
  eventDuration: number;
  beverageType: string[];

  // sevice form data
  mealType: string[];
  estimatedBudget?: number;
  specialRequests?: string;

  // catering data
  cateringType: string;
  // menuSelection: string[];
  menuSelection: MenuItemSelection[]
  dietaryRestriction: string[];
  serviceProvideType: "delivery" | "onsite" | "fullService" | "";
  setUpRequirement: string[];
  mealTime: string;
  addOns: string[];
}