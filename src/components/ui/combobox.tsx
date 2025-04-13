import * as React from 'react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComboboxProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  onAddNew?: (value: string) => void;
}

export const Combobox = ({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  className,
  onAddNew,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    return options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  }, [options, inputValue]);

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter(v => v !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
    // Don't close the popover on selection
  };

  const handleAddNew = () => {
    if (inputValue.trim() && onAddNew) {
      onAddNew(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          <div className='flex flex-wrap gap-1'>
            {value.length > 0 ? (
              value.map(v => {
                const option = options.find(o => o.value === v);
                return (
                  <Badge key={v} variant='secondary'>
                    {option?.label || v}
                  </Badge>
                );
              })
            ) : (
              <span className='text-muted-foreground'>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-full p-0'
        sideOffset={5}
        align='start'
        style={{ zIndex: 1000 }}
        forceMount
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search options...'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>
              {onAddNew && inputValue.trim() && (
                <div className='flex items-center gap-2 p-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start'
                    onClick={handleAddNew}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Add "{inputValue}"
                  </Button>
                </div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.includes(option.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
