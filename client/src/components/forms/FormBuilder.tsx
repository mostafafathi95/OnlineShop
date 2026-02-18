import React from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormFieldWithValidation } from "./FormFieldWithValidation";
import { Button } from "@/components/ui/button";

// Define the types for the form field configurations, now with a component property
export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  component?: React.ElementType; // Optional custom component for the field
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
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || ({} as T),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => {
          // Use the custom component if provided, otherwise default to FormFieldWithValidation
          const ComponentToRender = field.component || FormFieldWithValidation;

          // Pass all field properties to the component
          return <ComponentToRender key={field.name} {...field} />;
        })}

        {/* Render any additional children, like suggestion components */}
        {children}

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
