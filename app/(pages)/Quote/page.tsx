"use client";

import Button from "@/app/components/ui/Button";
import {
  CheckboxGroup,
  Input,
  RadioGroup,
  Textarea,
} from "@/app/components/ui/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {
  mealTypeOptions,
  serviceTypeOptions,
} from "@/app/middleware/MenuOptions";
import { FormData } from "@/app/TSTypes/MenuInterface";
import Event from "../event/Event";
import Catering from "../catering/Catering";
import User from "../user/User";
import { useRecoilState } from "recoil";
import { currentStepAtom, quotationFormAtom } from "@/app/recoil/atoms";
import { toAmPm } from "@/app/middleware/TimeHelper";
import EventCateringCommonFields from "../commonFields/EventCateringCommonFields";

export default function Quote() {
  const [step, setStep] = useRecoilState(currentStepAtom);
  const [formData, setFormData] = useRecoilState(quotationFormAtom);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: formData,
  });

  // Restore saved form values whenever formData or step changes
  useEffect(() => {
    reset(formData);
  }, [step, reset]);

  // Watch serviceType for dynamic rendering
  const serviceType = watch("serviceType");
  const eventStartTime = watch("eventStartTime");
  const eventEndTime = watch("eventEndTime");

  // --- Save form data + move next ---
  const onNext = (data: FormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  // to go back to prev form
  const onBack = () => setStep(step - 1);

  const handleFormDataSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      eventStartTime: toAmPm(data.eventStartTime),
      eventEndTime: toAmPm(data.eventEndTime),
    };
    console.log("formattedData", formattedData);
    setFormData((prev) => ({ ...prev, ...formattedData }));
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/quote",
        formattedData
      );
      const pdf = await res.data?.data?.pdfBase64;
      if (pdf) setPdfBase64(pdf);
    } catch (err) {
      console.error("Failed to submit form", err);
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

  // console.log("step count: ", step)

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
  const handlePreviewClick = () => {
    if (!pdfBase64) {
      alert("Please generate the quote first by submitting the form.");
      return;
    }
    sessionStorage.setItem("pdfData", pdfBase64);
    window.open("/pdfPreview", "_blank");
  };

  return (
    <>
      <div>
        <form
          action=""
          onSubmit={handleSubmit(step === 2 ? handleFormDataSubmit : onNext)}
        >
          {/* service type */}
          {/* STEP 0: Choose service type */}
          {step === 0 && (
            <>
              <Controller
                name="serviceType"
                control={control}
                rules={{ required: "Please select a service type" }}
                render={({ field, fieldState }) => (
                  <RadioGroup
                    label="Service Type"
                    options={serviceTypeOptions}
                    selectedValue={field.value}
                    onChange={(val) => {
                      // if switching service type -> reset opposite fields
                      if (val !== field.value) {
                        if (val === "event") {
                          reset({
                            ...formData,
                            serviceType: "event",
                            // keep current date/time
                            eventDate: watch("eventDate"),
                            eventStartTime: watch("eventStartTime"),
                            eventEndTime: watch("eventEndTime"),
                            eventDuration: watch("eventDuration"),
                            numberOfGuests: watch("numberOfGuests"),
                            eventLocation: watch("eventLocation"),
                            // clear catering specific fields
                            cateringType: "",
                            menuSelection: [],
                            dietaryRestriction: [],
                            serviceProvideType: "",
                            setUpRequirement: [],
                            addOns: [],
                          });
                        } else if (val === "catering") {
                          reset({
                            ...formData,
                            serviceType: "catering",
                            // keep current date/time
                            eventDate: watch("eventDate"),
                            eventStartTime: watch("eventStartTime"),
                            eventEndTime: watch("eventEndTime"),
                            eventDuration: watch("eventDuration"),
                            numberOfGuests: watch("numberOfGuests"),
                            eventLocation: watch("eventLocation"),
                            // clear event specific fields
                            eventType: "",
                            beverageType: [],
                          });
                        }
                      }
                      field.onChange(val);
                    }}
                    // onChange={field.onChange}

                    error={fieldState.error?.message}
                  />
                )}
              />
              {/* render the dynamic fields for events */}
              {serviceType === "event" && (
                // all the inputs related to event only
                <Event
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                  setValue={setValue}
                />
              )}

              {serviceType === "catering" && (
                <Catering
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                  setValue={setValue}
                />
              )}
            </>
          )}

          {/* step 1: Event or catering */}
          {step === 1 && (
            <>
              {/* render the dynamic fields for events */}
              <EventCateringCommonFields
                register={register}
                control={control}
                watch={watch}
                errors={errors}
                setValue={setValue}
              />
              {/* {serviceType === "event" && (
                // all the inputs related to event only
                <Event
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                />
              )}

              {serviceType === "catering" && (
                <Catering
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                />
              )} */}
            </>
          )}

          {/* step 2: User details + other fields */}
          {step === 2 && (
            <>
              {/* Start: client details like full name, email, phone */}
              <User
                register={register}
                errors={errors}
                watch={watch}
                control={control}
                setValue={setValue}
              />
              {/* end: client details like full name, email, phone */}

              {/* Start: Meal/Menu details */}
              {/* meal type */}
              {/* <Controller
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
              /> */}
              {/* End: Meal/Menu Details */}

              {/* estimated budget */}
              <Input
                label="Estimated Budget (optional)"
                type="number"
                placeholder="e.g. 5000"
                min={1}
                {...register("estimatedBudget", {
                  valueAsNumber: true,
                  min: { value: 1, message: "Budget must be positive" },
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
              <div className="mt-4 flex justify-between items-center">
                <Button
                  type="button"
                  variant="secondary"
                  text="Back"
                  size="medium"
                  onClick={onBack}
                />
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    text="Send Quote"
                    size="medium"
                    variant="primary"
                  />
                  <Button
                    variant="secondary"
                    text="Preview"
                    size="medium"
                    onClick={handlePreviewClick}
                  />
                </div>
              </div>
            </>
          )}
          {/* Navigation */}
          {step < 2 && (
            <div className="mt-4 flex gap-2">
              {step > 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  text="Back"
                  size="medium"
                  onClick={onBack}
                />
              )}
              <Button
                type="submit"
                variant="primary"
                text="Next"
                size="medium"
              />
            </div>
          )}
        </form>
      </div>
    </>
  );
}
