import React, { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GoStarFill } from "react-icons/go";
import { Eye, EyeOff } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  field: any;
  label: string;
  placeHolder?: string;
  fieldType: "input" | "textarea";
  inputType?: "number" | "text" | "password" | "email"; // Added email here
  important?: boolean;
  error?: any;
  allowShowHidePassword?: boolean;
  previewImage?: string;
  options?: SelectOption[];
}

export const CustomForm = ({
  field,
  placeHolder,
  label,
  fieldType,
  important,
  inputType = "text",
  allowShowHidePassword = false,
  previewImage,
  options = [],
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  let FieldComponent;

  switch (fieldType) {
    case "textarea":
      FieldComponent = (
        <Textarea
          placeholder={placeHolder}
          {...field}
          className="min-h-36"
        />
      );
      break;

    case "input":
    default:
      const isPassword = inputType === "password" && allowShowHidePassword;

      const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const parsed = val === "" ? undefined : Number(val);
        field.onChange(parsed);
      };

      FieldComponent = (
        <div className="relative">
          <Input
            placeholder={placeHolder}
            type={isPassword ? (showPassword ? "text" : "password") : inputType}
            {...field}
            onChange={
              inputType === "number" ? handleNumberChange : field.onChange
            }
            value={
              inputType === "number" &&
              (field.value === undefined || field.value === null)
                ? ""
                : field.value
            }
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
            >
              {showPassword ? (
                    <Eye className="w-5 h-5" />
              ) : (
            
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      );
      break;
  }

  return (
    <FormItem>
      <FormLabel className="text-accent-foreground flex gap-x-2 items-start">
        {label}
        {important && (
          <div className="p-0.5 rounded-full">
            <GoStarFill className="size-1.5 text-rose-600 dark:text-rose-800" />
          </div>
        )}
      </FormLabel>
      <FormControl>{FieldComponent}</FormControl>
      <FormMessage className="text-sm" />
    </FormItem>
  );
};
