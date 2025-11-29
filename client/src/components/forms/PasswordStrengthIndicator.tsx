import React from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const requirements = [
    { label: "حداقل 8 کاراکتر", met: password.length >= 8 },
    { label: "حروف بزرگ (A-Z)", met: /[A-Z]/.test(password) },
    { label: "عدد (0-9)", met: /[0-9]/.test(password) },
    { label: "نشانه خاص (!@#$%)", met: /[!@#$%^&*]/.test(password) },
  ];

  const strength = requirements.filter((req) => req.met).length;
  const strengthText = ["ضعیف", "متوسط", "خوب", "قوی", "بسیار قوی"][strength];
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
        <span className="text-sm font-medium">قوت رمز:</span>
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
