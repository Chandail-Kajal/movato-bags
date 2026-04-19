import clsx from "clsx";
import { useFormControl } from "./FormControl";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  regex?: RegExp;
};

export const InputBase = ({ regex, onChange, className, ...props }: Props) => {
  const { error, disabled } = useFormControl();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regex && !regex.test(e.target.value)) return;

    onChange?.(e);
  };

  return (
    <input
      {...props}
      disabled={disabled}
      onChange={handleChange}
      className={clsx(
        "input input-bordered w-full",
        error && "input-error",
        className,
      )}
    />
  );
};