import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed py-4 px-3 text-buttons-others cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-blue-gradient text-white-1 hover:opacity-80",
        secondary:
          "bg-white-1 text-blue-1 border border-blue-1 hover:opacity-80",
        disabled: "bg-gray-2 text-white-1",
      },
      size: {
        sm: "min-w-[183px]",
        lg: "min-w-[387px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={variant === "disabled" || props.disabled}
      {...props}
    />
  );
};

export default Button;
