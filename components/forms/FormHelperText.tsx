import { useFormControl } from "./FormControl";

export const FormHelperText = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { error } = useFormControl();

  return <span className="text-error text-xs">{error || children}</span>;
};
