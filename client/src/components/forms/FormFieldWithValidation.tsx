import React from "react";
import { Check, AlertCircle } from "lucide-react";
import {
  useFormContext,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define a generic type for the props to ensure type safety with React Hook Form
interface FormFieldWithValidationProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  dir?: "rtl" | "ltr";
}

export function FormFieldWithValidation<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  dir = "rtl",
}: FormFieldWithValidationProps<T>) {
  // Get the form context, which includes register, formState, and getFieldState
  const {
    register,
    formState: { errors, touchedFields },
    getValues,
  } = useFormContext<T>();

  // Determine the error state and message for the current field
  const error = errors[name];
  const errorMessage = typeof error?.message === 'string' ? error.message : undefined;

  // Determine if the field has been touched
  const isTouched = touchedFields[name];

  // Determine if the field is valid (touched, no errors, and has a value)
  const fieldValue = getValues(name);
  const isValid = isTouched && !error && fieldValue && String(fieldValue).length > 0;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          type={type}
          // Register the input with React Hook Form
          {...register(name)}
          placeholder={placeholder}
          className={`transition-all duration-200 ${
            errorMessage ? "border-destructive bg-destructive/5 animate-shake" : ""
          } ${isValid ? "border-green-500 bg-green-50/50" : ""}`}
          dir={dir}
          // Use aria-invalid to improve accessibility
          aria-invalid={!!errorMessage}
        />
        {isValid && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 animate-fade-scale">
            <Check className="h-5 w-5 text-green-500" />
          </div>
        )}
        {errorMessage && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 animate-fade-scale">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive animate-slide-in-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
