import React from "react";
import { Check, AlertCircle } from "lucide-react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldWithValidationProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  dir?: "rtl" | "ltr";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export function FormFieldWithValidation<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  dir = "rtl",
  startAdornment,
  endAdornment,
}: FormFieldWithValidationProps<T>) {
  const {
    register,
    formState: { errors, touchedFields },
    getValues,
  } = useFormContext<T>();

  const error = errors[name];
  const errorMessage = typeof error?.message === 'string' ? error.message : undefined;

  const isTouched = touchedFields[name];

  const fieldValue = getValues(name);
  const isValid = isTouched && !error && fieldValue && String(fieldValue).length > 0;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        {startAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {startAdornment}
          </div>
        )}
        <Input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={cn(
            "transition-all duration-200",
            { "border-destructive bg-destructive/5 animate-shake": errorMessage },
            { "border-green-500 bg-green-50/50": isValid },
            { "pr-10": startAdornment },
            { "pl-10": endAdornment || isValid || errorMessage }
          )}
          dir={dir}
          aria-invalid={!!errorMessage}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {isValid && !endAdornment && (
            <Check className="h-5 w-5 text-green-500 animate-fade-scale" />
          )}
          {errorMessage && !endAdornment && (
             <AlertCircle className="h-5 w-5 text-destructive animate-fade-scale" />
          )}
          {endAdornment}
        </div>
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive animate-slide-in-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
