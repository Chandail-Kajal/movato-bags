/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";

type FormControlContextType = {
  name?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormControlContext = createContext<FormControlContextType>({});

export const useFormControl = () => useContext(FormControlContext);

type Props = {
  name?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export const FormControl = ({
  name,
  error,
  required,
  disabled,
  children,
}: Props) => {
  return (
    <FormControlContext.Provider value={{ name, error, required, disabled }}>
      <div className="flex flex-col w-full gap-1.5">{children}</div>
    </FormControlContext.Provider>
  );
};
