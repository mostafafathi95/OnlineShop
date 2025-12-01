import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "@shared/schema";
import type { AddressFormData } from "./types";

const initialFormData: AddressFormData = {
  title: "",
  fullName: "",
  phone: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
  isDefault: false,
};

export function useAddressForm() {
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const resetForm = () => setFormData(initialFormData);
  return { formData, setFormData, resetForm };
}

export function useAddresses(enabled: boolean) {
  return useQuery<Address[]>({
    queryKey: ["/api/addresses"],
    enabled,
  });
}

export function parseAddressForEdit(address: Address): AddressFormData {
  return {
    title: address.title,
    fullName: address.fullName,
    phone: address.phone,
    province: address.province,
    city: address.city,
    address: address.address,
    postalCode: address.postalCode,
    isDefault: address.isDefault || false,
  };
}
