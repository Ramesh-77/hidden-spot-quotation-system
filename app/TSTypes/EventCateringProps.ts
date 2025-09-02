import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "./MenuInterface";

export interface EventCateringProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    watch: UseFormWatch<FormData>;
    control: Control<FormData>;
}


// making the typescript safety check

// /app/TSTypes/EventCateringProps.ts
// import {
//     Control,
//     FieldErrors,
//     UseFormRegister,
//     UseFormWatch,
//     FieldValues,
// } from "react-hook-form";

// export interface EventCateringProps<T extends FieldValues> {
//     register: UseFormRegister<T>;
//     errors: FieldErrors<T>;
//     watch: UseFormWatch<T>;
//     control: Control<T>;
// }
