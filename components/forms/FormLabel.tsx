import clsx from "clsx";
import { useFormControl } from "./FormControl";

export const FormLabel = ({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) => {
  const { required } = useFormControl();

  return (
    <label className={clsx("flex items-center", className)} htmlFor={htmlFor}>
      {children}
      {required && <span className="text-inherit ml-1">*</span>}
    </label>
  );
};
