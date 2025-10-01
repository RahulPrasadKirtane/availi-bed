import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";

export interface FilterOptions {
  categories: string[];
  charges: string[];
  hasIsolation: boolean;
  hasOxygen: boolean;
  hasICU: boolean;
  hasVentilator: boolean;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const [open, setOpen] = useState(false);

  const categories = ["Government", "Private", "Charity"];
  const chargesOptions = ["Free", "Paid", "Regulated"];

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleChargesToggle = (charge: string) => {
    const newCharges = filters.charges.includes(charge)
      ? filters.charges.filter(c => c !== charge)
      : [...filters.charges, charge];
    onFilterChange({ ...filters, charges: newCharges });
  };

  const handleResourceToggle = (resource: keyof FilterOptions) => {
    onFilterChange({ ...filters, [resource]: !filters[resource] });
  };

  const handleClearAll = () => {
    onFilterChange({
      categories: [],
      charges: [],
      hasIsolation: false,
      hasOxygen: false,
      hasICU: false,
      hasVentilator: false,
    });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.charges.length + 
    [filters.hasIsolation, filters.hasOxygen, filters.hasICU, filters.hasVentilator].filter(Boolean).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Hospitals</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Hospital Category */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Hospital Category</h3>
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          {/* Charges */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Charges</h3>
            {chargesOptions.map(charge => (
              <div key={charge} className="flex items-center space-x-2">
                <Checkbox
                  id={`charge-${charge}`}
                  checked={filters.charges.includes(charge)}
                  onCheckedChange={() => handleChargesToggle(charge)}
                />
                <Label
                  htmlFor={`charge-${charge}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {charge}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          {/* Resource Type */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Available Resources</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasIsolation"
                checked={filters.hasIsolation}
                onCheckedChange={() => handleResourceToggle('hasIsolation')}
              />
              <Label htmlFor="hasIsolation" className="text-sm font-normal cursor-pointer">
                Isolation Beds
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasOxygen"
                checked={filters.hasOxygen}
                onCheckedChange={() => handleResourceToggle('hasOxygen')}
              />
              <Label htmlFor="hasOxygen" className="text-sm font-normal cursor-pointer">
                Oxygen Support
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasICU"
                checked={filters.hasICU}
                onCheckedChange={() => handleResourceToggle('hasICU')}
              />
              <Label htmlFor="hasICU" className="text-sm font-normal cursor-pointer">
                ICU Beds
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasVentilator"
                checked={filters.hasVentilator}
                onCheckedChange={() => handleResourceToggle('hasVentilator')}
              />
              <Label htmlFor="hasVentilator" className="text-sm font-normal cursor-pointer">
                Ventilator Support
              </Label>
            </div>
          </div>

          <Separator />

          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleClearAll}
            disabled={activeFiltersCount === 0}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
