"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BRIGADEIROS } from "@/lib/data/products";
import { Cake, Cherry, Grid3X3, Layers3, Nut, Sparkles } from "lucide-react";

interface BrigadeiroTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

interface CategoryFilterProps {
  onCategoryChange: (value: string) => void;
  selectedCategory: string;
}

export function BrigadeiroTabs({
  activeTab,
  onTabChange,
}: BrigadeiroTabsProps) {
  // Count brigadeiros by category
  const regularCount = BRIGADEIROS.filter((b) => !b.isSeasonal).length;

  return (
    <Tabs className="w-full" onValueChange={onTabChange} value={activeTab}>
      <TabsList className="grid h-11 w-full max-w-md grid-cols-1">
        <TabsTrigger
          className="flex items-center gap-2 text-sm font-medium"
          value="regular"
        >
          Clásicos
          <Badge className="px-2 py-0.5 text-xs" variant="secondary">
            {regularCount}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function CategoryFilter({
  onCategoryChange,
  selectedCategory,
}: CategoryFilterProps) {
  // Get unique categories from regular brigadeiros
  const categories = Array.from(
    new Set(
      BRIGADEIROS.filter((b) => !b.isSeasonal && b.category).map(
        (b) => b.category!,
      ),
    ),
  ).sort();

  // Icon mapping for categories
  const categoryIcons: Record<
    string,
    React.ComponentType<{ className?: string }>
  > = {
    "Blancos & Suaves": Sparkles,
    "Clásicos de Chocolate": Layers3,
    "Frutales & Refrescantes": Cherry,
    "Inspirados en Postres": Cake,
    "Nueces & Cacahuates": Nut,
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <div className="flex flex-col gap-2">
      <Select onValueChange={onCategoryChange} value={selectedCategory}>
        <SelectTrigger
          className={`
            h-12 w-full text-base
            sm:max-w-sm
          `}
        >
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="py-3" value="all">
            <div className="flex items-center gap-3">
              <Grid3X3 className="h-5 w-5" />
              <span className="text-base">Todas las categorías</span>
            </div>
          </SelectItem>
          {categories.map((category) => (
            <SelectItem className="py-3" key={category} value={category}>
              <div className="flex items-center gap-3">
                {getCategoryIcon(category)}
                <span className="text-base">{category}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Keep the original component for backward compatibility
interface BrigadeiroFiltersProps {
  activeTab: string;
  onCategoryChange: (value: string) => void;
  onTabChange: (value: string) => void;
  selectedCategory: string;
}

export function BrigadeiroFilters({
  activeTab,
  onCategoryChange,
  onTabChange,
  selectedCategory,
}: BrigadeiroFiltersProps) {
  return (
    <div
      className={`
        space-y-4
        sm:space-y-6
      `}
    >
      <BrigadeiroTabs activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "regular" && (
        <CategoryFilter
          onCategoryChange={onCategoryChange}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
}
