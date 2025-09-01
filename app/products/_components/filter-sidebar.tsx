"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Filter,
  Tag,
  DollarSign,
  Grid3X3,
  Factory,
} from "lucide-react";

export default function FilterSideBar() {
  const [price, setPrice] = useState([200, 1600]);
  const categories = [
    "Spices",
    "Rice",
  ];
  const brands = ["Brand A", "Brand B", "Brand C"];

  return (
    <aside className="w-full lg:w-44 xl:w-60 rounded-2xl shadow-md p-4 space-y-4 hidden lg:block sticky top-2 my-4">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5 text-orange-500" />
          Filters
        </h2>
        <Button variant="ghost" size="sm" className="text-xs text-red-500">
          Reset
        </Button>
      </div>

      {/* Accordion filters (all open by default) */}
      <Accordion
        type="multiple"
        defaultValue={["sort", "price", "categories", "brands"]}
        className="space-y-3"
      >
        {/* Sort By */}
        <AccordionItem value="sort">
          <AccordionTrigger className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" /> Sort By
          </AccordionTrigger>
          <AccordionContent>
            <Select defaultValue="name-asc">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
                <SelectItem value="name-desc">Name: Z-A</SelectItem>
                <SelectItem value="price-low">Price: Low → High</SelectItem>
                <SelectItem value="price-high">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500" /> Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-2">
              <Slider
                value={price}
                onValueChange={setPrice}
                min={0}
                max={2000}
                step={10}
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tk {price[0]}</span>
                <span>Tk {price[1]}</span>
              </div>
              <Button className="w-full mt-1 rounded-xl" size="sm">
                Apply Range
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-gray-500" /> Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((cat, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Checkbox id={cat} />
                  <Label htmlFor={cat} className="text-sm text-gray-700">
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-gray-500" /> Brands
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Checkbox id={brand} />
                  <Label htmlFor={brand} className="text-sm text-gray-700">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
