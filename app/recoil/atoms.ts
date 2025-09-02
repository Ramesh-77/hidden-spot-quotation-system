"use client"
import { atom } from "recoil";
import { FormData } from "../TSTypes/MenuInterface";

export const quotationFormAtom = atom<FormData>({
  key: "quotationFormAtom",
  default: {
    serviceType: "",

    // client
    fullName: "",
    email: "",
    phone: "",

    // event
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    eventType: "",
    numberOfGuests: 1,
    eventDuration: 0,
    beverageType: [],

    // service
    mealType: [],
    estimatedBudget: undefined,
    specialRequests: "",

    // catering
    cateringType: "",
    menuSelection: [],
    dietaryRestriction: [],
    serviceProvideType: "",
    setUpRequirement: [],
    mealTime: "",
    addOns: [],
  },
});

// prev and next form track
export const currentStepAtom = atom<number>({
  key: "currentStepAtom",
  default: 0,
});

// pdf file
export const pdfBase64Atom = atom<string | null>({
  key: "pdfBase64Atom",
  default: null,
});
