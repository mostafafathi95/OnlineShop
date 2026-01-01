import React from "react";
import { Check, X } from "lucide-react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { t } from "@/lib/i18n";

interface PasswordStrengthIndicatorProps<T extends FieldValues> {
  name: Path<T>;
}

export function PasswordStrengthIndicator<T extends FieldValues>({ name }: PasswordStrengthIndicatorProps<T>) {
  const { watch } = useFormContext<T>();
  const password = watch(name) || "";

  const requirements = [
    { label: t('forms.passwordStrength.requirements.length'), met: password.length >= 8 },
    { label: t('forms.passwordStrength.requirements.uppercase'), met: /[A-Z]/.test(password) },
    { label: t('forms.passwordStrength.requirements.number'), met: /[0-9]/.test(password) },
    { label: t('forms.passwordStrength.requirements.specialChar'), met: /[!@#$%^&*]/.test(password) },
  ];

  const strength = requirements.filter((req) => req.met).length;
  const strengthText = [
    t('forms.passwordStrength.strength.weak'),
    t('forms.passwordStrength.strength.medium'),
    t('forms.passwordStrength.strength.good'),
    t('forms.passwordStrength.strength.strong'),
    t('forms.passwordStrength.strength.veryStrong')
  ][strength];

  const strengthColor =
    strength <= 1
      ? "bg-red-500"
      : strength === 2
      ? "bg-yellow-500"
      : strength === 3
      ? "bg-blue-500"
      : "bg-green-500";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{t('forms.passwordStrength.title')}</span>
        <span className={`text-sm font-medium ${strengthColor.replace("bg-", "text-")}`}>
          {strengthText}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${strengthColor} transition-all duration-300 ease-out`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-2">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            {req.met ? (
              <Check className="h-4 w-4 text-green-500 animate-fade-scale" />
            ) : (
              <X className="h-4 w-4 text-muted-foreground" />
            )}
            <span className={req.met ? "text-green-600" : "text-muted-foreground"}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
