import React, { useState } from "react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
} from "./popover"
import { Icon } from "./icon"

interface ComboboxProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  emptyText = "Nenhum resultado.",
  value,
  onValueChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState("")
  const currentValue = value !== undefined ? value : internalValue
  const [open, setOpen] = useState(false)

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    if(onValueChange) onValueChange(newValue)
    else setInternalValue(newValue)
    setOpen(false)
  }

  const selectedLabel = options.find((option) => option.value === currentValue)?.label

  return (
    <Popover
      trigger={
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", !currentValue && "text-muted-foreground", className)}
        >
          {selectedLabel || placeholder}
          <Icon name="angle-small-down" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      }
      content={
        <Command className="w-full">
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Icon
                    name="check"
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentValue === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      }
      className="w-[200px] p-0"
      align="start"
    />
  )
}

export { Combobox }