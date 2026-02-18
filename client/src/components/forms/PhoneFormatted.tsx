import React from "react";
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface PhoneFormattedProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  dir?: "rtl" | "ltr";
}

export function PhoneFormatted<T extends FieldValues>({
  name,
  placeholder = "0912 345 6789",
  dir = "ltr",
}: PhoneFormattedProps<T>) {
  const { control } = useFormContext<T>();

  const formatPhoneNumber = (input: string) => {
    if (!input) return "";
    // Remove all non-digits
    const digitsOnly = input.replace(/\D/g, "");

    // Format as Persian phone: 0912 345 6789
    if (digitsOnly.length <= 4) return digitsOnly;
    if (digitsOnly.length <= 7) return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4)}`;
    return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4, 7)} ${digitsOnly.slice(7, 11)}`;
  };

  const unformatPhoneNumber = (formattedValue: string) => {
    return formattedValue.replace(/\s/g, "");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          type="tel"
          value={formatPhoneNumber(field.value || "")}
          onChange={(e) => {
            const unformatted = unformatPhoneNumber(e.target.value);
            // Only allow digits and limit length to 11
            if (/^\d*$/.test(unformatted) && unformatted.length <= 11) {
              field.onChange(unformatted);
            }
          }}
          placeholder={placeholder}
          dir={dir}
          maxLength={13} // "0912 345 6789" is 13 chars
          className="transition-all duration-200"
        />
      )}
    />
  );
}
