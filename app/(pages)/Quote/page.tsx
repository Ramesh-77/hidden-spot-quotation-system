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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  mealTypeOptions,
  serviceTypeOptions,
} from "@/app/middleware/MenuOptions";
import { FormData } from "@/app/TSTypes/MenuInterface";
import Event from "../event/page";
import Catering from "../catering/page";
import User from "../user/page";

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

  // Watch serviceType for dynamic rendering
  const serviceType = watch("serviceType");
  const eventStartTime = watch("eventStartTime");
  const eventEndTime = watch("eventEndTime");
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  const handleFormDataSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/quote",
        formData
      );
      setPdfBase64(res.data?.data?.pdfBase64);
      console.log(res.data.data.pdfBase64);
    } catch (error) {
      console.log(error);
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
      {/* preview
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
      )} */}

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
          )}
          {/* Start: client details like full name, email, phone */}
          <User
            register={register}
            errors={errors}
            watch={watch}
            control={control}
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
           {/* Preview PDF button */}
        <Button
          variant="secondary"
          text="Preview"
          size="medium"
          className="ms-5"
          onClick={handlePreviewClick}
        />
        </form>
      </div>
    </>
  );
}
