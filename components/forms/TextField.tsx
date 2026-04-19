import React, { useState } from "react";
import { useFormControl } from "./FormControl";
import clsx from "clsx";
import { FormHelperText } from "./FormHelperText";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Typography } from "../Typography";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  password?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ password, ...props }, ref) => {
    const { error, disabled } = useFormControl();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    return (
      <div className="w-full flex flex-col gap-1">
        <div
          className={clsx(
            "flex items-center py-1.5 px-4 rounded-md border border-primary/20 focus-within:border-primary outline-0",
            error && "border-error ring-2 ring-offset-1 ring-error",
            props.className,
          )}
        >
          <input
            ref={ref}
            {...props}
            disabled={disabled}
            type={password ? (isPasswordVisible ? "text" : "password") : "text"}
            className="flex-1 outline-none ring-0"
          />
          {password && (
            <Typography
              variant="h6"
              className="text-primary/80"
              onClick={() => setIsPasswordVisible((p) => !p)}
            >
              {isPasswordVisible ? <LuEyeOff /> : <LuEye />}
            </Typography>
          )}
        </div>
        <FormHelperText />
      </div>
    );
  },
);
