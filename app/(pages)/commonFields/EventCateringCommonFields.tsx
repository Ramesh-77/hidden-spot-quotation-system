"use client";

import { Input, Select, CheckboxGroup } from "@/app/components/ui/Input";
import {
  eventTypes,
  beverageTypeOptions,
  mealTypeOptions,
  mealTimes,
} from "@/app/middleware/MenuOptions";
import { Controller } from "react-hook-form";
import { EventCateringProps } from "@/app/TSTypes/EventCateringProps";
import { getDurationInHours } from "@/app/middleware/TimeHelper";

export default function EventCateringCommonFields({
  register,
  errors,
  watch,
  control,
}: EventCateringProps) {
  const eventDate = watch("eventDate");
  const eventStartTime = watch("eventStartTime");
  const eventEndTime = watch("eventEndTime");

  return (
    <>
      {/* Event Type */}
      {/* <Select
        label="Event Type"
        options={eventTypes}
        {...register("eventType", {
          required: "Please select an event type",
        })}
        error={errors.eventType?.message}
      /> */}

      {/* Event Date */}
      <Input
        label="Event Date"
        type="date"
        // this will disable user to select past date
        min={new Date().toISOString().split("T")[0]}
        {...register("eventDate", {
          required: "Event date is required",
        })}
        error={errors.eventDate?.message}
      />

      {/* Event Time Fields */}
      {eventDate && (
        <>
          <Input
            label="Event Start Time"
            type="time"
            // disable past times if today date is selected
            min={
              eventDate === new Date().toISOString().split("T")[0]
                ? new Date().toTimeString().slice(0, 5)
                : undefined
            }
            {...register("eventStartTime", {
              required: "Event start time is required",
              validate: (value) => {
                if (eventDate === new Date().toISOString().split("T")[0]) {
                  const now = new Date();
                  const [h, m] = value.split(":").map(Number);
                  const selected = h * 60 + m;
                  const current = now.getHours() * 60 + now.getMinutes();
                  return (
                    selected >= current || "Start time cannot be in the past"
                  );
                }
                return true;
              },
            })}
            error={errors.eventStartTime?.message}
          />

          <Input
            label="Event End Time"
            type="time"
            {...register("eventEndTime", {
              required: "Event end time is required",
              // end time should not be earlier than the start time
              validate: (value) => {
                if (!eventStartTime) return true; // skip if start time not set yet
                return (
                  value >= eventStartTime ||
                  "End time cannot be earlier than start time"
                );
              },
            })}
            error={errors.eventEndTime?.message}
          />
        </>
      )}
      {/* Calculated Duration */}
      {eventStartTime && eventEndTime && (
        <p className="block mb-1 font-medium text-gray-700 text-sm">
          Total Duration:{" "}
          <span>
            <strong>
              {getDurationInHours(eventStartTime, eventEndTime)} hours
            </strong>
          </span>
        </p>
      )}

      {/* Number of Guests */}
      <Input
        label="Number of Guests"
        type="number"
        placeholder="100"
        min={1} // stops user from going below 1
        {...register("numberOfGuests", {
          required: "Number of guests is required",
          min: { value: 1, message: "At least 1 guest is required" },
        })}
        error={errors.numberOfGuests?.message}
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
      {/* meal time */}
      {/* meal times */}
      <Select
        label="Meal Time"
        options={mealTimes}
        {...register("mealTime", { required: "Select a meal time" })}
        error={errors.mealTime?.message}
      />
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

      {/* Beverage Type */}
      {/* <Controller
        name="beverageType"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="Beverage Type"
            options={beverageTypeOptions}
            selectedValues={field.value}
            onChange={(val, checked) => {
              const newValue = checked
                ? [...field.value, val]
                : field.value.filter((v) => v !== val);
              field.onChange(newValue);
            }}
          />
        )}
      /> */}
    </>
  );
}
