import React from "react";
import { z } from "zod";
import { FormBuilder } from "@/components/forms/FormBuilder";
import { EmailSuggestions } from "@/components/forms/EmailSuggestions";
import { PasswordStrengthIndicator } from "@/components/forms/PasswordStrengthIndicator";
import { PhoneFormatted } from "@/components/forms/PhoneFormatted";
import { SubmitHandler } from "react-hook-form";
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
  const onSubmit: SubmitHandler<DemoFormData> = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check the console for the data.");
  };

  const formFields = [
    { name: "fullName", label: "Full Name", placeholder: "Enter your full name", required: true },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
    { name: "phone", label: "Phone Number", required: true, component: PhoneFormatted },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Form Builder Demo</h1>
      <div className="max-w-lg">
        <FormBuilder<DemoFormData>
          schema={demoSchema}
          onSubmit={onSubmit}
          fields={formFields}
          defaultValues={{
            fullName: "",
            email: "",
            phone: "",
            password: "",
          }}
        >
          <EmailSuggestions<DemoFormData> name="email" />
          <PasswordStrengthIndicator<DemoFormData> name="password" />
        </FormBuilder>
      </div>
    </div>
  );
};

export default FormDemo;
