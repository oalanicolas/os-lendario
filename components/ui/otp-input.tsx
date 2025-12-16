import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, className }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Allow only one char
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Trigger complete
    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) {
      onComplete?.(combinedOtp);
    }

    // Move to next input if value is entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);

    // Optional: focus first empty input if clicking on empty middle
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // Move to previous input on backspace if empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(input) => {inputRefs.current[index] = input}}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-10 h-12 text-center text-lg font-bold rounded-lg border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-mono"
        />
      ))}
    </div>
  );
};

export { OTPInput };