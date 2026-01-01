import React from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormFieldWithValidation } from "./FormFieldWithValidation";
import { Button } from "@/components/ui/button";

// Define the types for the form field configurations
type FormFieldConfig<T extends FieldValues> = {
  name: keyof T;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

// Define the props for the FormBuilder component
interface FormBuilderProps<T extends FieldValues> {
  schema: z.Schema<T>;
  onSubmit: SubmitHandler<T>;
  fields: FormFieldConfig<T>[];
  defaultValues?: T;
  children?: React.ReactNode;
}

export function FormBuilder<T extends FieldValues>({
  schema,
  onSubmit,
  fields,
  defaultValues,
  children,
}: FormBuilderProps<T>) {
  // Initialize React Hook Form with the Zod schema resolver
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    // Use FormProvider to pass the form context to nested components
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <FormFieldWithValidation
            key={String(field.name)}
            name={String(field.name)}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}
        <Button type="submit">Submit</Button>
        {children}
      </form>
    </FormProvider>
  );
}
