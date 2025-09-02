"use client";
import { Controller } from "react-hook-form";
import { EventCateringProps } from "@/app/TSTypes/EventCateringProps";
import { CheckboxGroup, RadioGroup, Select } from "@/app/components/ui/Input";
import { addOnOptions, cateringTypeOptions, dietaryRestrictionOptions, mealTimes, menuOptions, serviceProvideOptions, setupOptions } from "@/app/middleware/MenuOptions";

export default function Catering({
  register,
  errors,
  control,
}: EventCateringProps) {
  return (
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
  );
}
