"use client";

import React, { ReactNode, useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GoStarFill } from "react-icons/go";
import { Check, ChevronDown, ChevronsUpDown, Eye, EyeOff } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  field: any;
  label: string;
  placeHolder?: string;
  fieldType: "input" | "textarea" | "select" | "checkbox";
  inputType?: "number" | "text" | "password" | "email";
  important?: boolean;
  error?: any;
  allowShowHidePassword?: boolean;
  previewImage?: string;
  options?: SelectOption[];
  disable?: boolean;
  checkBoxLabel?: ReactNode;
  searchable?: boolean;
}

interface SearchableComboboxProps {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  placeHolder?: string;
  disable?: boolean;
}

const SearchableCombobox: React.FC<SearchableComboboxProps> = ({
  value,
  onChange,
  options,
  placeHolder,
  disable,
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          disabled={disable}
          className={cn(
            "w-full justify-between font-normal text-sm border border-2",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? selected.label : placeHolder || "Select an option"}
          <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-40">
        <Command>
          <CommandInput placeholder={placeHolder || "Search..."} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

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
  disable,
  checkBoxLabel,
  searchable = false,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  let FieldComponent;

  switch (fieldType) {
    case "textarea":
      FieldComponent = (
        <Textarea
          placeholder={placeHolder}
          {...field}
          className="min-h-16"
          disabled={disable}
        />
      );
      break;

    case "select":
      FieldComponent = searchable ? (
        <SearchableCombobox
          value={field.value}
          onChange={field.onChange}
          options={options}
          placeHolder={placeHolder}
          disable={disable}
        />
      ) : (
        <Select
          onValueChange={field.onChange}
          value={field.value}
          disabled={disable}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeHolder || "Select option"} />
          </SelectTrigger>
          <SelectContent className="w-full">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      break;

    case "checkbox":
      FieldComponent = (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={field.name}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
          />
          <Label htmlFor={field.name} className="text-sm leading-relaxed">
            {checkBoxLabel}
          </Label>
        </div>
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
            disabled={disable}
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