import { FormControl } from "./FormControl";
import { FormLabel } from "./FormLabel";

export const FileInput = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}

      <input
        type="file"
        className="file-input file-input-bordered w-full"
        {...props}
      />
    </FormControl>
  );
};
