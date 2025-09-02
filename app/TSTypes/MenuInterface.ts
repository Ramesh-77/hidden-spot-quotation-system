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
  menuSelection: string[];
  dietaryRestriction: string[];
  serviceProvideType: "delivery" | "onsite" | "fullService" | "";
  setUpRequirement: string[];
  mealTime: string;
  addOns: string[];
}