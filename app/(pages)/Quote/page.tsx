"use client";
import Button from "@/app/components/ui/Button";
import {
  CheckboxGroup,
  Input,
  RadioGroup,
  Select,
  Textarea,
} from "@/app/components/ui/Input";
import { getDurationInHours } from "@/app/middleware/EventDuration";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface FormData {
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
export default function Quote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      serviceType: "",
      numberOfGuests: 1,
      mealType: [],
      beverageType: [],
      menuSelection: [],
      dietaryRestriction: [],
      serviceProvideType: "",
      setUpRequirement: [],
      addOns: [],
    },
  });

  // service type
  const serviceTypeOptions = [
    { label: "Event", value: "event" },
    { label: "Catering", value: "catering" },
  ];
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
  // beverage options
  const beverageTypeOptions = [
    { label: "Tea", value: "tea" },
    { label: "Coffee", value: "coffee" },
    { label: "Alcohol", value: "alcohol" },
    { label: "Juice", value: "juice" },
  ];

  // catering service
  const cateringTypeOptions = [
    { label: "Buffet", value: "buffet" },
    { label: "Plated", value: "plated" },
    { label: "Family Style", value: "family" },
  ];

  const menuOptions = [
    { label: "Italian Set", value: "italian" },
    { label: "Indian Combo", value: "indian" },
    { label: "Asian Fusion", value: "asian" },
  ];

  const dietaryRestrictionOptions = [
    { label: "Vegan", value: "vegan" },
    { label: "Halal", value: "halal" },
    { label: "Allergies", value: "allergies" },
  ];

  const serviceProvideOptions = [
    { label: "Delivery", value: "delivery" },
    { label: "Onsite Staff", value: "onsite" },
    { label: "Full Service", value: "fullService" },
  ];

  const setupOptions = [
    { label: "Tableware", value: "tableware" },
    { label: "Linens", value: "linens" },
    { label: "Cutlery", value: "cutlery" },
  ];

  const mealTimes = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
  ];

  const addOnOptions = [
    { label: "Desserts", value: "desserts" },
    { label: "Snacks", value: "snacks" },
    { label: "Appetizers", value: "appetizers" },
  ];

  // Watch serviceType for dynamic rendering
  const serviceType = watch("serviceType");
  // watch for event date/starttime/endtime for showing event start and end time
  const eventDate = watch("eventDate");
  const eventStartTime = watch("eventStartTime");
  const eventEndTime = watch("eventEndTime");
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  const handleFormDataSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const res = await axios.post(
      "http://localhost:3000/api/v1/quote",
      formData
    );
    // console.log(res.data.data)
    // console.log(res.data?.data.fullName)
    // console.log(res.data.data.email)
    // console.log()
    setPdfBase64(res.data?.data?.pdfBase64)
    console.log(res.data.data.pdfBase64)
    
    
    } catch (error) {
      
    }
    
    
  };

  // useeffect for event date, start time, and end time
  useEffect(() => {
    const now = new Date();

    const date = now.toISOString().split("T")[0];
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;

    setValue("eventDate", date);
    setValue("eventStartTime", time);
    setValue("eventEndTime", time);
  }, [setValue]);

  // useeffect for calculating total duration when first component mounts
  useEffect(() => {
    if (eventStartTime && eventEndTime) {
      const [startH, startM] = eventStartTime.split(":").map(Number);
      const [endH, endM] = eventEndTime.split(":").map(Number);

      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;

      let diff = endTotal - startTotal;
      if (diff < 0) diff += 24 * 60; // handle overnight events

      const duration = +(diff / 60).toFixed(2); // round to 2 decimal places
      setValue("eventDuration", duration);
    }
  }, [eventStartTime, eventEndTime, setValue]);

  //

  return (
    <>
    {/* preview */}
     {pdfBase64 && (
        <div style={{ marginTop: "20px" }}>
          <h2>PDF Preview:</h2>
          <iframe
            src={`data:application/pdf;base64,${pdfBase64}`}
            width="100%"
            height="600px"
            title="PDF Preview"
          />
        </div>
      )}




      <div>
        <h1>Quotation Form</h1>
        <form action="" onSubmit={handleSubmit(handleFormDataSubmit)}>
          {/* service type */}
          <Controller
            name="serviceType"
            control={control}
            rules={{ required: "Please select a service type" }}
            render={({ field, fieldState }) => (
              <RadioGroup
                label="Service Type"
                options={serviceTypeOptions}
                selectedValue={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* render the dynamic fields for events */}
          {serviceType === "event" && (
            // all the inputs related to event only
            <>
              <Select
                label="Event Type"
                options={eventTypes}
                {...register("eventType", {
                  required: "Please select an event type",
                })}
                error={errors.eventType?.message}
              />

              {/* event date */}
              <Input
                label="Event Date"
                {...register("eventDate", {
                  required: "Event date and time is required",
                })}
                error={errors.eventDate?.message}
                type="date"
              />
              {eventDate && (
                <>
                  <Input
                    label="Event Start Time"
                    {...register("eventStartTime", {
                      required: "Event start time is required",
                    })}
                    error={errors.eventStartTime?.message}
                    type="time"
                  />
                  <Input
                    label="Event End Time"
                    {...register("eventEndTime", {
                      required: "Event end time is required",
                    })}
                    error={errors.eventEndTime?.message}
                    type="time"
                  />
                </>
              )}

              {/* guest no. */}
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

              {/* <Input
                label="Event Duration (hours)"
                type="number"
                placeholder="e.g., 4"
                {...register("eventDuration", {
                  required: "Event duration is required",
                  min: { value: 1, message: "Minimum 1 hour" },
                })}
                error={errors.eventDuration?.message}
              /> */}
              {/* Show calculated duration (read-only) */}
              {eventStartTime && eventEndTime && (
                <>
                  <Input
                    label="Event Duration (hours)"
                    type="number"
                    value={watch("eventDuration") || ""}
                    readOnly
                  />
                  <p className="text-sm text-gray-600">
                    Duration: {getDurationInHours(eventStartTime, eventEndTime)}
                  </p>
                </>
              )}

              <Controller
                name="beverageType"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Beverage Type"
                    options={beverageTypeOptions}
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
            </>
          )}

          {serviceType === "catering" && (
            <>
              {/* catering type */}
              <Select
                label="Catering Type"
                options={cateringTypeOptions}
                {...register("cateringType", {
                  required: "Select a catering type",
                })}
                error={errors.cateringType?.message}
              />
              {/* meal styles */}
              <Controller
                name="menuSelection"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Menu Selection"
                    options={menuOptions}
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
              {/* dietary restriction */}
              <Controller
                name="dietaryRestriction"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Dietary Restrictions"
                    options={dietaryRestrictionOptions}
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

              {/* service provide options */}
              <Controller
                name="serviceProvideType"
                control={control}
                rules={{ required: "Please select a sevice provide option" }}
                render={({ field, fieldState }) => (
                  <RadioGroup
                    label="Service Provide Type"
                    options={serviceProvideOptions}
                    selectedValue={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
              {/* set up options options */}
              <Controller
                name="setUpRequirement"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Set up options"
                    selectedValues={field.value}
                    options={setupOptions}
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

              {/* meal times */}
              <Select
                label="Meal Time"
                options={mealTimes}
                {...register("mealTime", { required: "Select a meal time" })}
                error={errors.mealTime?.message}
              />

              {/* for addons */}
              <Controller
                name="addOns"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Add-ons"
                    options={addOnOptions}
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
            </>
          )}
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
