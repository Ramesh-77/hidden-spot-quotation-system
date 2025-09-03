import { MenuItemSelection } from "../TSTypes/MenuInterface";

// service type
export const serviceTypeOptions = [
  { label: "Event", value: "event" },
  { label: "Catering", value: "catering" },
];

// event types
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

// ✅ Catering service types (for dropdown)
export const cateringTypeOptions = [
  { label: "Buffet", value: "buffet" },
  { label: "Plated", value: "plated" },
  { label: "Cocktail", value: "cocktail" },
  { label: "Food Truck", value: "foodTruck" },
  { label: "Corporate Catering", value: "corporate" },
  { label: "Drinks & Beverages", value: "drinks" },
];

// =====================
// Menus by catering type
// =====================

// Buffet
const buffetMenu: MenuItemSelection[] = [
  { id: "buffet_hot", label: "Hot Buffet (2 mains + 2 sides)", price: 25, unit: "per person", quantity: 0 },
  { id: "buffet_veg", label: "Vegetarian Buffet", price: 22, unit: "per person", quantity: 0 },
  { id: "buffet_premium", label: "Premium Buffet (steak, seafood, etc.)", price: 40, unit: "per person", quantity: 0 },
];

// Plated
const platedMenu: MenuItemSelection[] = [
  { id: "plated_3course", label: "3-Course Meal", price: 55, unit: "per person", quantity: 0 },
  { id: "plated_4course", label: "4-Course Meal", price: 70, unit: "per person", quantity: 0 },
  { id: "plated_kids", label: "Kids Meal", price: 20, unit: "per person", quantity: 0 },
];

// Cocktail
const cocktailMenu: MenuItemSelection[] = [
  { id: "cocktail_basic", label: "Basic Canapés (5 items)", price: 18, unit: "per person", quantity: 0 },
  { id: "cocktail_premium", label: "Premium Canapés (8 items)", price: 28, unit: "per person", quantity: 0 },
  { id: "cocktail_platter", label: "Mixed Finger Food Platter", price: 45, unit: "per platter", quantity: 0 },
];

// Food Truck
const foodTruckMenu: MenuItemSelection[] = [
  { id: "truck_bbq", label: "BBQ Station (burgers, ribs)", price: 15, unit: "per person", quantity: 0 },
  { id: "truck_taco", label: "Taco Bar", price: 12, unit: "per person", quantity: 0 },
  { id: "truck_pizza", label: "Wood-fired Pizza Station", price: 18, unit: "per person", quantity: 0 },
];

// Corporate
const corporateMenu: MenuItemSelection[] = [
  { id: "corp_sandwich", label: "Sandwich Platter (10 pieces)", price: 40, unit: "per platter", quantity: 0 },
  { id: "corp_wraps", label: "Wrap Platter (10 pieces)", price: 45, unit: "per platter", quantity: 0 },
  { id: "corp_breakfast", label: "Breakfast Box (croissant + juice + fruit)", price: 12, unit: "per package", quantity: 0 },
];

// Drinks
const drinksMenu: MenuItemSelection[] = [
  { id: "drinks_soft", label: "Soft Drinks & Juices", price: 5, unit: "per person", quantity: 0 },
  { id: "drinks_beer", label: "Beer & Wine Package (2 hrs)", price: 25, unit: "per person", quantity: 0 },
  { id: "drinks_premium", label: "Cocktail Package (3 hrs)", price: 45, unit: "per person", quantity: 0 },
];

// ✅ Map cateringType → menu list
export const cateringMenuOptions: Record<string, MenuItemSelection[]> = {
  buffet: buffetMenu,
  plated: platedMenu,
  cocktail: cocktailMenu,
  foodTruck: foodTruckMenu,
  corporate: corporateMenu,
  drinks: drinksMenu,
};

// dietary restrictions
export const dietaryRestrictionOptions = [
  { label: "Vegan", value: "vegan" },
  { label: "Halal", value: "halal" },
  { label: "Allergies", value: "allergies" },
];

// service type
export const serviceProvideOptions = [
  { label: "Delivery", value: "delivery" },
  { label: "Onsite Staff", value: "onsite" },
  { label: "Full Service", value: "fullService" },
];

// setup
export const setupOptions = [
  { label: "Tableware", value: "tableware" },
  { label: "Linens", value: "linens" },
  { label: "Cutlery", value: "cutlery" },
];

// meal times
export const mealTimes = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
];

// add-ons
export const addOnOptions = [
  { label: "Desserts", value: "desserts" },
  { label: "Snacks", value: "snacks" },
  { label: "Appetizers", value: "appetizers" },
];
