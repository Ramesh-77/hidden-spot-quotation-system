"use client";
import Button from "@/app/components/ui/Button";
import {
  CheckboxGroup,
  Input,
  Select,
  Textarea,
} from "@/app/components/ui/Input";
// import axios from "axios";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// event types
// create form data
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  eventDate: Date;
  eventLocation: string;
  eventType: string;
  numberOfGuests: number;
  eventDuration: number;
  // sevice form data
  mealType: string[];
  estimatedBudget?: number;
  specialRequests?: string;
  // cuisinePreferences: string[];
  // dietaryRestrictions: string[];
  // additionalServices: string[];
  // beverageOptions: string[];
}
export default function Quote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      mealType: [],
      // cuisinePreferences: [],
      // dietaryRestrictions: [],
      // additionalServices: [],
      // beverageOptions: [],
    },
  });

  // for event types
  const eventTypes = [
    { label: "Wedding", value: "wedding" },
    { label: "Corporate", value: "corporate" },
    { label: "Birthday", value: "birthday" },
    { label: "Other", value: "other" },
  ];

  // meal type options
  const mealTypeOptions = [
    { label: "Buffet", value: "buffet" },
    { label: "Plated Dinner", value: "plated" },
    { label: "Cocktail", value: "cocktail" },
  ];

  // cuisine options
  // const cuisineOptions = [
  //   { label: "Italian", value: "italian" },
  //   { label: "Indian", value: "indian" },
  //   { label: "Vegan", value: "vegan" },
  //   { label: "Gluten-Free", value: "glutenFree" },
  // ];

  // // dietary options
  // const dietaryOptions = [
  //   { label: "Vegetarian", value: "vegetarian" },
  //   { label: "Vegan", value: "vegan" },
  //   { label: "Gluten-Free", value: "glutenFree" },
  //   { label: "Allergies", value: "allergies" },
  // ];

  // // sevice options
  // const serviceOptions = [
  //   { label: "Waitstaff", value: "waitstaff" },
  //   { label: "Bar Service", value: "bar" },
  //   { label: "Table Setup", value: "setup" },
  //   { label: "Decorations", value: "decorations" },
  // ];

  // // beverage options
  // const beverageOptions = [
  //   { label: "Alcoholic", value: "alcoholic" },
  //   { label: "Non-Alcoholic", value: "nonAlcoholic" },
  //   { label: "Coffee/Tea", value: "coffeeTea" },
  //   { label: "Open Bar", value: "openBar" },
  // ];

  const handleFormDataSubmit: SubmitHandler<FormData> = async (formData) => {
    // const res = await axios.post(
    //   "http://localhost:3000/api/v1/quote",
    //   formData
    // );
    console.log(formData);
  };
  return (
    <>
      <div>
        <h1>Quotation Form</h1>
        <form action="" onSubmit={handleSubmit(handleFormDataSubmit)}>
          {/* Start: client details like full name, email, phone */}
          {/* full name input field */}
          <Input
            label="Full Name"
            {...register("fullName", { required: "Full name is required" })}
            error={errors.fullName?.message}
            type="text"
            placeholder="Knox Prasad"
          />

          {/* email input field */}
          <Input
            label="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
            type="email"
            placeholder="example@example.com"
          />

          {/* phone input field */}
          <Input
            label="Contact NO."
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Phone number must be exactly 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Phone number must be exactly 10 digits",
              },
            })}
            error={errors.phone?.message}
            type="tel"
            placeholder="0431 954 396"
          />
          {/* end: client details like full name, email, phone */}

          {/* Start: Event details */}
          {/* event date */}
          <Input
            label="Event Date"
            {...register("eventDate", {
              required: "Event date and time is required",
            })}
            error={errors.eventDate?.message}
            type="datetime-local"
          />

          {/* event location */}
          <Input
            label="Event Location/Address"
            {...register("eventLocation", {
              required: "Event Location is required",
            })}
            error={errors.eventLocation?.message}
            type="text"
            placeholder="123 quotation street, city"
          />

          {/* event type */}
          <Select
            label="Event Type"
            options={eventTypes}
            {...register("eventType", {
              required: "Please select an event type",
            })}
            error={errors.eventType?.message}
          />

          {/* guest field */}
          <Input
            label="Number of Guests"
            type="number"
            placeholder="100"
            {...register("numberOfGuests", {
              required: "Number of guests is required",
              min: { value: 1, message: "At least 1 guest required" },
            })}
            error={errors.numberOfGuests?.message}
          />
          {/* event duration */}
          <Input
            label="Event Duration (hours)"
            type="number"
            placeholder="e.g., 4"
            {...register("eventDuration", {
              required: "Event duration is required",
              min: { value: 1, message: "Minimum 1 hour" },
            })}
            error={errors.eventDuration?.message}
          />
          {/* End: Event details */}

          {/* Start: Meal/Menu details */}
          {/* meal type */}
          <Controller
            name="mealType"
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                label="Meal Type"
                options={mealTypeOptions}
                selectedValues={field.value}
                onChange={(val, checked) => {
                  field.onChange(
                    checked
                      ? [...field.value, val]
                      : field.value.filter((v) => v !== val)
                  );
                }}
              />
            )}
          />
          {/* End: Meal/Menu Details */}

          {/* estimated budget */}
          <Input
            label="Estimated Budget (optional)"
            type="number"
            placeholder="e.g. 5000"
            {...register("estimatedBudget", {
              valueAsNumber: true,
              min: { value: 0, message: "Budget must be positive" },
            })}
            error={errors.estimatedBudget?.message}
          />

          {/* special request or notes */}
          <Textarea
            label="Special Requests / Notes"
            placeholder="Any extra details you want to share..."
            rows={4}
            {...register("specialRequests")}
            error={errors.specialRequests?.message}
          />
          {/* form submit button */}
          <Button
            type="submit"
            text="Send Quote"
            size="medium"
            variant="primary"
          />
        </form>
      </div>
    </>
  );
}
