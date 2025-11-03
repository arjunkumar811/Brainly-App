import { forwardRef } from 'react';

interface InputProps {
  placeholder: string;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, type = "text" }, ref) => {
  return (
    <div>
      <input
        ref={ref} 
        placeholder={placeholder}
        type={type}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
      />
    </div>
  );
});

Input.displayName = 'Input';
