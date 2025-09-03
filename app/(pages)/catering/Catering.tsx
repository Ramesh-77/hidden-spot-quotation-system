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
  cateringTypeOptions, // ✅ new simple select options
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
  // watch for cateringType and menuSelection
  const cateringType = watch("cateringType");
  const menuSelection: MenuItemSelection[] = watch("menuSelection") || [];

  // Reset menuSelection when cateringType changes
  useEffect(() => {
    if (cateringType) {
      setValue("menuSelection", []); // clear previous selection
    }
  }, [cateringType, setValue]);

  //  Safe way with TypeScript
  const availableMenus: MenuItemSelection[] = cateringType
    ? cateringMenuOptions[cateringType as keyof typeof cateringMenuOptions] ||
      []
    : [];

  return (
    <>
      {/* Catering type */}
      <Select
        label="Catering Type"
        options={cateringTypeOptions} 
        {...register("cateringType", {
          required: "Select a catering type",
        })}
        error={errors.cateringType?.message}
      />

      {/* Menu selection */}
      {cateringType && (
        <div className="mt-4">
          <label className="block font-medium mb-2">Menu Selection</label>
          {availableMenus.length > 0 ? (
            availableMenus.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded p-2 mb-2"
              >
                {/* Checkbox for menu item */}
                <Controller
                  name="menuSelection"
                  control={control}
                  render={({ field }) => {
                    const isChecked = field.value.some(
                      (v: MenuItemSelection) => v.id === item.id
                    );

                    return (
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([
                              ...field.value,
                              { ...item, quantity: 1 },
                            ]);
                          } else {
                            field.onChange(
                              field.value.filter(
                                (v: MenuItemSelection) => v.id !== item.id
                              )
                            );
                          }
                        }}
                      />
                    );
                  }}
                />

                {/* Item info */}
                <div className="ml-2 flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} {item.unit}
                  </p>
                </div>

                {/* Quantity input (only if selected) */}
                <Controller
                  name="menuSelection"
                  control={control}
                  render={({ field }) => {
                    const selected = field.value.find(
                      (v: MenuItemSelection) => v.id === item.id
                    );

                    return selected ? (
                      <Input
                        label="Qty"
                        type="number"
                        min={1}
                        value={selected.quantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value) || 1;
                          const updated = field.value.map(
                            (v: MenuItemSelection) =>
                              v.id === item.id ? { ...v, quantity: newQty   } : v
                          );
                          field.onChange(updated);
                        }}
                        className="w-20 ml-4"
                      />
                    ) : (
                      <></>
                    );
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">Please select a catering type.</p>
          )}
        </div>
      )}

      {/* Dietary restriction */}
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
                  : field.value.filter((v: string) => v !== val)
              );
            }}
          />
        )}
      />

      {/* Service provide options */}
      <Controller
        name="serviceProvideType"
        control={control}
        rules={{ required: "Please select a service provide option" }}
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

      {/* Set up options */}
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
                  : field.value.filter((v: string) => v !== val)
              );
            }}
          />
        )}
      />

      {/* Meal times */}
      <Select
        label="Meal Time"
        options={mealTimes}
        {...register("mealTime", { required: "Select a meal time" })}
        error={errors.mealTime?.message}
      />

      {/* Add-ons */}
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
                  : field.value.filter((v: string) => v !== val)
              );
            }}
          />
        )}
      />
    </>
  );
}
