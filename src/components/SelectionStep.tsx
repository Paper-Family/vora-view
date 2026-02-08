import { Calendar } from "lucide-react";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { categories } from "@/mock/data";

interface SelectionStepProps {
  selectedDate: string;
  selectedCategory: string;
  onDateChange: (date: string) => void;
  onCategoryChange: (category: string) => void;
  onSubmit: () => void;
}

export function SelectionStep({
  selectedDate,
  selectedCategory,
  onDateChange,
  onCategoryChange,
  onSubmit,
}: SelectionStepProps) {
  const isValid = selectedDate && selectedCategory;

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Calendar className="text-blue-600" size={24} />
          </div>
          <div>
            <h2>뉴스 큐레이션 요청</h2>
            <p className="text-gray-600 text-sm">
              날짜와 카테고리를 선택해주세요
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="date">날짜 선택</Label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full mt-2 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="category">카테고리 선택</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger id="category" className="w-full mt-2">
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={onSubmit}
            disabled={!isValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            기사 요청
          </Button>
        </div>
      </div>
    </div>
  );
}
