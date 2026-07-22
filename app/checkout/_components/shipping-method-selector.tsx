"use client";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface ShippingMethod {
  id: string;
  label: string;
  cost: number;
  disabled?: boolean; // 👈 add this
}

interface ShippingMethodSelectorProps {
  shippingMethodId: string;
  setShippingMethodId: (id: string) => void;
  shippingMethods: ShippingMethod[];
}

export function ShippingMethodSelector({
  shippingMethodId,
  setShippingMethodId,
  shippingMethods,
}: ShippingMethodSelectorProps) {
  if (shippingMethods.length === 0) return null;

  return (
    <div className="shadow-lg border p-4 rounded-xl">
      <Label className="mb-3 block text-sm font-medium">
        Shipping Method
      </Label>

      <RadioGroup
        value={shippingMethodId}
        onValueChange={setShippingMethodId}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {shippingMethods.map((method) => (
          <Label
            key={method.id}
            htmlFor={method.id}
            className={cn(
              "flex items-center justify-between rounded-md border p-2 transition-all text-xs font-semibold",
              method.disabled
                ? "cursor-not-allowed opacity-50 border-border"
                : "cursor-pointer",
              !method.disabled && shippingMethodId === method.id
                ? "border-primary bg-primary/5"
                : "",
              !method.disabled && shippingMethodId !== method.id
                ? "border-border hover:border-primary/50"
                : ""
            )}
          >
            <div className="flex items-center gap-1">
              <RadioGroupItem
                id={method.id}
                value={method.id}
                disabled={method.disabled}
              />
              <span className="">
                {method.label}
            
              </span>
            </div>

            <span className="">
              BDT {method.cost.toLocaleString()}
            </span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}