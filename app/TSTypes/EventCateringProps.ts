import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, } from "react-hook-form";
import { FormData } from "./MenuInterface";

export interface EventCateringProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    watch: UseFormWatch<FormData>;
    control: Control<FormData>;
    setValue: UseFormSetValue<FormData>;
}
