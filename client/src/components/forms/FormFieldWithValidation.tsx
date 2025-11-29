import React from "react";
import { Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldWithValidationProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  validator?: (value: string) => boolean;
  errorClass?: string;
  dir?: "rtl" | "ltr";
}

export function FormFieldWithValidation({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required = false,
  validator,
  dir = "rtl",
}: FormFieldWithValidationProps) {
  const [touched, setTouched] = React.useState(false);
  const isValid = validator ? validator(value) && value.length > 0 : value.length > 0;
  const showError = touched && error;

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={label}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className={`transition-all duration-200 ${
            showError ? "border-destructive bg-destructive/5 animate-shake" : ""
          } ${isValid && touched ? "border-green-500 bg-green-50/50" : ""}`}
          dir={dir}
        />
        {isValid && touched && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 animate-fade-scale">
            <Check className="h-5 w-5 text-green-500" />
          </div>
        )}
        {showError && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 animate-fade-scale">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
        )}
      </div>
      {showError && (
        <p className="text-sm text-destructive animate-slide-in-error">
          {error}
        </p>
      )}
    </div>
  );
}
