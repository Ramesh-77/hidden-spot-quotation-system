"use client";
import { Controller } from "react-hook-form";
import { EventCateringProps } from "@/app/TSTypes/EventCateringProps";
import {
  CheckboxGroup,
  Input,
  RadioGroup,
  Select,
} from "@/app/components/ui/Input";
import {
  addOnOptions,
  cateringMenuOptions,
  cateringTypeOptions,
  dietaryRestrictionOptions,
  mealTimes,
  serviceProvideOptions,
  setupOptions,
} from "@/app/middleware/MenuOptions";
import { MenuItemSelection } from "@/app/TSTypes/MenuInterface";
import { useEffect } from "react";

export default function Catering({
  register,
  errors,
  control,
  watch,
  setValue,
}: EventCateringProps) {
  // watch for the menu selection and catering type for rendering dynamic form
  const cateringType = watch("cateringType");
  const menuSelection: MenuItemSelection[] = watch("menuSelection") || [];

  // Reset menuSelection when catering type changes
  useEffect(() => {
    if (cateringType) {
      setValue("menuSelection", []); // clear previous selection
    }
  }, [cateringType, setValue]);

  const availableMenu = cateringType ? cateringMenuOptions[cateringType] : [];

  const handleQuantityChange = (item: MenuItemSelection, qty: number) => {
    const updated = [...menuSelection];
    const index = updated.findIndex((m) => m.id === item.id);
    if (index >= 0) {
      updated[index] = { ...updated[index], quantity: qty };
    } else {
      updated.push({ ...item, quantity: qty });
    }
    setValue("menuSelection", updated);
  };
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
      {/* menu selection */}
      {/* Dynamic Menu Options */}
      {cateringType && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Menu Selection</h3>
          {availableMenu.map((item) => {
            const selected = menuSelection.find((m) => m.id === item.id);
            return (
              <div
                key={item.id}
                className="flex justify-between items-center border p-2 rounded mb-2"
              >
                <div>
                  <p>{item.label}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price} {item.unit}
                  </p>
                </div>
                <input
                  type="number"
                  min={0}
                  value={selected?.quantity || 0}
                  onChange={(e) =>
                    handleQuantityChange(item, Number(e.target.value))
                  }
                  className="w-20 border rounded p-1"
                />
              </div>
            );
          })}
        </div>
      )}
      {/* menu selection */}

      {/*  */}
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
