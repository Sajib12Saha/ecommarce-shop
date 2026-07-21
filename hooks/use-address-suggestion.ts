// hooks/use-address-suggestion.ts
"use client";

import { useMemo, useState } from "react";
import AddressData from "@/json/address.json";

const address = AddressData as Record<string, string[]>;

export interface AddressOption {
  label: string;
  value: string;
}

export function useAddressSuggestion(language?: string) {
  const [selectedZilla, setSelectedZilla] = useState<string>("");

  const zillaOptions: AddressOption[] = useMemo(
    () => Object.keys(address).map((zilla) => ({ label: zilla, value: zilla })),
    []
  );

  const thanaOptions: AddressOption[] = useMemo(() => {
    const thanas = address[selectedZilla];
    if (!thanas) return [];
    return thanas.map((thana) => ({ label: thana, value: thana }));
  }, [selectedZilla]);

  const onZillaSelect = (zillaValue: string) => {
    setSelectedZilla(zillaValue);
  };

  return { zillaOptions, thanaOptions, onZillaSelect };
}