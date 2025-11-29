import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
  icon: React.ReactNode;
}

interface StepProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepProgressIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <nav className="flex items-center justify-center gap-2 md:gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                currentStep >= step.id ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => onStepClick?.(step.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= step.id
                    ? "border-primary bg-primary text-primary-foreground scale-110"
                    : "border-muted"
                } ${currentStep === step.id ? "animate-step-slide" : ""}`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5 animate-checkmark" />
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              <span className={`hidden sm:inline font-medium transition-opacity duration-300 ${
                currentStep >= step.id ? "opacity-100" : "opacity-60"
              }`}>
                {step.name}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-8 md:w-12 mx-2 md:mx-4 transition-all duration-500 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
