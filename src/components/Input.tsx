import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon/Icon";

const inputVariants = cva(
  "min-w-[387px] rounded-md transition-colors text-body p-4 border border-gray-1",
  {
    variants: {
      variant: {
        default: "",
        error: "",
        money: "px-12", // Add left padding for dollar sign
        success: "", // Add right padding for check icon
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
  ({ variant, inputSize, className, ...props }, ref) => {
    return (
      <div className="relative">
        {variant === "money" && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Icon type="dollar" />
          </span>
        )}
        {variant === "success" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <Icon type="check" />
          </span>
        )}
        <input
          ref={ref}
          className={twMerge(inputVariants({ variant, inputSize, className }))}
          {...props}
        />
      </div>
    );
  }
);
