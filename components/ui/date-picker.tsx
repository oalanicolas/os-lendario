import React, { useState } from "react";
import { format } from "date-fns"; // Note: In a real environment, ensure date-fns is installed. For this demo, I will simulate format if needed or assume format is passed.
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover } from "./popover";
import { Icon } from "./icon";

interface DatePickerProps {
  date?: Date;
  setDate?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

// Simple formatter since we might not have date-fns in the browser environment provided
const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export function DatePicker({ date, setDate, placeholder = "Selecione uma data", className }: DatePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(date);
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = date || internalDate;

  const handleSelect = (newDate: Date) => {
    if (setDate) setDate(newDate);
    else setInternalDate(newDate);
    setIsOpen(false);
  };

  return (
    <Popover
        trigger={
            <Button
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                    className
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Icon name="calendar" className="mr-2 h-4 w-4" />
                {selectedDate ? formatDate(selectedDate) : <span>{placeholder}</span>}
            </Button>
        }
        content={
            <div className="p-0 border-none shadow-none bg-transparent">
                <Calendar
                    selected={selectedDate}
                    onSelect={handleSelect}
                    className="border-0 shadow-none"
                />
            </div>
        }
        align="start"
        className="w-auto p-0"
    />
  );
}