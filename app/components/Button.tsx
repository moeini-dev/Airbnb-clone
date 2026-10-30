'use client';

import { ReactHTMLElement } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon  // 'Icon' is just an alias for 'icon' for 
              //  better integration with react's component notation
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`
      relative
      w-full
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      ${outline ? 'bg-white' : 'bg-rose-500'}
      ${outline ? 'border-black' : 'border-rose-500'}
      ${outline ? 'text-black' : 'text-white'}
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'border' : 'border-2'}
      `}
      >
      {/* now use 'Icon' alias here like a normal react componet (instead of 'icon') */}
      {Icon && (
        <Icon size={24} className="
          absolute
          left-4
          top-3
        " />
      )}
      {label}
    </button>

  );
}

export default Button;