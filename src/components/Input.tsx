import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon/Icon";

const inputVariants = cva(
  "min-w-[387px] rounded-md transition-colors text-body p-4 border border-gray-1 focus:outline-none focus:ring-0 bg-white",
  {
    variants: {
      variant: {
        default: "",
        error: "",
        money: "px-12",
        success: "",
        password: "pr-12", // Espacio para el icono
      },
      inputSize: {
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "lg",
    },
  }
);

type InputProps = ComponentProps<"input"> & VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, inputSize, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        {variant === "money" && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
            <Icon type="dollar" />
          </span>
        )}
        {variant === "success" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-2">
            <Icon type="check" />
          </span>
        )}
        {variant === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Icon type={"eye"} />
          </button>
        )}
        <input
          ref={ref}
          type={
            variant === "password" ? (showPassword ? "text" : "password") : type
          }
          className={twMerge(inputVariants({ variant, inputSize, className }))}
          {...props}
        />
      </div>
    );
  }
);
