"use client";

import { Input, Select, CheckboxGroup } from "@/app/components/ui/Input";
import { eventTypes, beverageTypeOptions } from "@/app/middleware/MenuOptions";
import { getDurationInHours } from "@/app/middleware/EventDuration";
import { Controller } from "react-hook-form";
import { EventCateringProps } from "@/app/TSTypes/EventCateringProps";

export default function Event({
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
      <Select
        label="Event Type"
        options={eventTypes}
        {...register("eventType", {
          required: "Please select an event type",
        })}
        error={errors.eventType?.message}
      />
      {/* Event Type (Controller since Select is custom) */}
      {/* <Controller
        name="eventType"
        control={control}
        rules={{ required: "Please select an event type" }}
        render={({ field }) => (
          <Select
            label="Event Type"
            options={eventTypes}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            error={errors.eventType?.message}
          />
        )}
      /> */}

      {/* Event Date */}
      <Input
        label="Event Date"
        type="date"
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
            {...register("eventStartTime", {
              required: "Event start time is required",
            })}
            error={errors.eventStartTime?.message}
          />

          <Input
            label="Event End Time"
            type="time"
            {...register("eventEndTime", {
              required: "Event end time is required",
            })}
            error={errors.eventEndTime?.message}
          />
        </>
      )}

      {/* Number of Guests */}
      <Input
        label="Number of Guests"
        type="number"
        placeholder="100"
        {...register("numberOfGuests", {
          required: "Number of guests is required",
          min: { value: 1, message: "At least 1 guest is required" },
        })}
        error={errors.numberOfGuests?.message}
      />

      {/* Calculated Duration */}
      {eventStartTime && eventEndTime && (
        <p className="block mb-1 font-medium text-gray-700">
          Total Duration:{" "}
          <span>{getDurationInHours(eventStartTime, eventEndTime)} hours</span>
        </p>
      )}

      {/* Beverage Type */}
      <Controller
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
      />
    </>
  );
}
