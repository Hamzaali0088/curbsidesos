import { useState } from "react";

export default function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete = "off",
  className = "",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue =
    value !== null && value !== undefined && String(value).trim().length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-md border border-gray-300 px-3 pt-4 pb-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-3 text-sm transition-all duration-200 ${
          isFocused || hasValue
            ? "top-[-9px] bg-white px-1 text-xs text-primary"
            : "top-1/2 -translate-y-1/2 text-gray-500"
        }`}
      >
        {label}
        {required ? " *" : ""}
      </label>
    </div>
  );
}

