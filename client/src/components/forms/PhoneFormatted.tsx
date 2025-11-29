import React from "react";
import { Input } from "@/components/ui/input";

interface PhoneFormattedProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
}

export function PhoneFormatted({
  value,
  onChange,
  placeholder = "0912 345 6789",
  dir = "ltr",
}: PhoneFormattedProps) {
  const formatPhoneNumber = (input: string) => {
    // Remove all non-digits
    const digitsOnly = input.replace(/\D/g, "");

    // Format as Persian phone: 0912 345 6789
    if (digitsOnly.length <= 3) return digitsOnly;
    if (digitsOnly.length <= 6) return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4)}`;
    return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4, 7)} ${digitsOnly.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted.replace(/\s/g, ""));
  };

  return (
    <Input
      type="tel"
      value={formatPhoneNumber(value)}
      onChange={handleChange}
      placeholder={placeholder}
      dir={dir}
      maxLength={13}
      className="transition-all duration-200"
    />
  );
}
