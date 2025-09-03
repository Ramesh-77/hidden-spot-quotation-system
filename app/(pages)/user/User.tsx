import { Input } from "@/app/components/ui/Input";
import { EventCateringProps } from "@/app/TSTypes/EventCateringProps";

export default function User({
  register,
  errors,
  watch,
  control,
}: EventCateringProps) {
  return (
    <>
      {/* full name input field */} 
      <Input
        label="Full Name"
        {...register("fullName", {
          required: "Full name is required",
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Full name should only contain letters and spaces",
          },
        })}
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
          // valueAsNumber: true,
           pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone number must be exactly 10 digits",
          },
          minLength: {
            value: 10,
            message: "Phone number should not be less than 10 digits",
          },
          maxLength: {
            value: 10,
            message: "Phone number must be exact 10 digits",
          },
        })}
        error={errors.phone?.message}
        type="tel"
        placeholder="0431 954 396"
      />
    </>
  );
}
