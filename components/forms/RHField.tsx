/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  children: (field: any, fieldState: any) => React.ReactElement;
};

export const RHFField = ({ name, children }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => children(field, fieldState)}
    />
  );
};
