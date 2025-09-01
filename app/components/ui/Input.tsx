"use client";
import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

// resuable input field for the text, email, number, phone, date, time
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// for the textarea for the special request
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

// for the select field
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: {
    label: string;
    value: string;
  }[];
  multiple?: boolean;
}

// for the checkbox field
interface CheckboxGroupProps {
  label: string;
  error?: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string, checked: boolean) => void;
  selectedValues: string[];
}

// for the radio group
interface RadioGroupProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
}

// function for the input field (text, email, phone, date and time)
export function Input({ label, error, ...props }: InputProps) {
  return (
    <>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
        <input
          className={`w-full rounded border p-2 focus:outline-none focus:ring ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    </>
  );
}

// function for the textarea/description/notes
export function Textarea({ label, error, ...props }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <textarea
        className={`w-full rounded border p-2 focus:outline-none focus:ring ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

// function for the select input field
export function Select({
  label,
  error,
  options,
  multiple,
  ...props
}: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <select
        multiple={multiple}
        className={`w-full rounded border p-2 focus:outline-none focus:ring ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      >
        {!multiple && <option value="">Select an option</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

// function for the check box group (dietary restrictions, additional services, beverage options, etc.
export function CheckboxGroup({
  label,
  options,
  selectedValues = [],
  onChange,
  error,
  ...props
}: CheckboxGroupProps) {
  return (
    <div className="mb-4">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedValues.includes(opt.value)}
              onChange={(e) => onChange(opt.value, e.target.checked)}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

// function for the radio group enum fields with single select (event type, preferred quote method)
export function RadioGroup({
  label,
  options,
  selectedValue,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <div className="mb-4">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      <div className="flex flex-wrap gap-6">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center">
            <input
              type="radio"
              name={label}
              className="mr-2"
              checked={selectedValue === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
