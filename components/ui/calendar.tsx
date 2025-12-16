import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import { buttonVariants } from "./button";

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

function Calendar({ className, selected, onSelect, ...props }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date()); // View date (Month/Year)
  
  // Helpers (Vanilla JS Date Logic)
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getFirstDayOfMonth(year, month); // 0 = Sunday

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    if (onSelect) {
      onSelect(new Date(year, month, day));
    }
  };

  const isSameDay = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  // Generate days array
  const days = [];
  // Empty slots for previous month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} />);
  }
  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const isSelected = selected && isSameDay(selected, new Date(year, month, i));
    const isCurrentDay = isToday(i);

    days.push(
      <button
        key={i}
        onClick={() => handleDateClick(i)}
        className={cn(
          "h-9 w-9 p-0 font-normal text-sm flex items-center justify-center rounded-md cursor-pointer transition-all duration-200",
          isSelected 
            ? "bg-primary text-primary-foreground shadow-md font-bold hover:bg-primary/90" 
            : isCurrentDay
                ? "bg-accent text-accent-foreground font-bold border border-primary/30"
                : "hover:bg-muted text-foreground"
        )}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={cn("p-4 bg-card border border-border rounded-xl shadow-sm w-[280px]", className)} {...props}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-bold font-sans flex gap-1">
            <span className="capitalize">{monthNames[month]}</span>
            <span className="text-muted-foreground">{year}</span>
        </div>
        <div className="flex items-center gap-1">
            <button onClick={prevMonth} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-7 w-7")}>
                <Icon name="angle-left" className="h-4 w-4" />
            </button>
            <button onClick={nextMonth} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-7 w-7")}>
                <Icon name="angle-right" className="h-4 w-4" />
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map(day => (
              <span key={day} className="text-[0.7rem] uppercase tracking-wider font-bold text-muted-foreground">{day}</span>
          ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
          {days}
      </div>
    </div>
  );
}

export { Calendar };