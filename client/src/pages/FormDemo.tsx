import React from "react";
import { z } from "zod";
import { FormBuilder } from "@/components/forms/FormBuilder";
import { EmailSuggestions } from "@/components/forms/EmailSuggestions";
import { PasswordStrengthIndicator } from "@/components/forms/PasswordStrengthIndicator";
import { PhoneFormatted } from "@/components/forms/PhoneFormatted";
import { FormFieldWithValidation } from "@/components/forms/FormFieldWithValidation";
import {
  FormProvider,
  useForm,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

// Define the Zod schema for the demo form
const demoSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^09\d{9}$/, "Invalid Iranian phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type DemoFormData = z.infer<typeof demoSchema>;

const FormDemo = () => {
  const methods = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<DemoFormData> = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check the console for the data.");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Form Builder Demo</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
          <div>
            <FormFieldWithValidation<DemoFormData>
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <FormFieldWithValidation<DemoFormData>
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />
            <EmailSuggestions<DemoFormData> name="email" />
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <PhoneFormatted<DemoFormData> name="phone" />
          </div>
          <div>
            <FormFieldWithValidation<DemoFormData>
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <PasswordStrengthIndicator<DemoFormData> name="password" />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormDemo;
