/* eslint-disable react-hooks/refs */
"use client";

import React, { useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  size,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { createPortal } from "react-dom";
import { CgChevronDown, CgCheck } from "react-icons/cg";
import { FormLabel } from "./FormLabel";
import { FormHelperText } from "./FormHelperText";
import { useFormControl } from "./FormControl";
import clsx from "clsx";
import { Typography } from "../Typography";

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  dropdownWidth?: number | string;
  width?: number | string;
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  dropdownWidth,
  width,
}: SelectProps) => {
  const { error, disabled } = useFormControl();
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 8 }),

      // 🔥 THIS FIXES WIDTH
      size({
        apply({ rects, elements }) {
          elements.floating.style.width =
            dropdownWidth !== undefined
              ? typeof dropdownWidth === "number"
                ? `${dropdownWidth}px`
                : dropdownWidth
              : `${rects.reference.width}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="w-full flex flex-col gap-1">
      {label && <FormLabel>{label}</FormLabel>}

      {/* Trigger */}
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        style={
          width
            ? typeof width === "number"
              ? { width: `${width}px` }
              : { width }
            : undefined
        }
        className={clsx(
          !width && "w-full",
          "flex justify-between items-center px-4 py-1.5 border rounded-md bg-transparent",
          "border-primary/20 focus:border-primary",
          error && "border-error ring-2 ring-error",
        )}
      >
        {selected?.label ? (
          <Typography className="truncate">{selected?.label}</Typography>
        ) : (
          <Typography color="text.disabled" className="truncate">
            {"Select option"}
          </Typography>
        )}

        <CgChevronDown className={clsx("transition", open && "rotate-180")} />
      </button>

      {/* Dropdown */}
      {open &&
        createPortal(
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            className="z-50 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((op) => (
              <button
                key={op.value}
                onClick={() => {
                  onChange?.(op.value);
                  setOpen(false);
                }}
                className="w-full flex justify-between items-center px-4 py-2 hover:bg-accent/5"
              >
                <Typography className="truncate">{op.label}</Typography>

                {value === op.value && <CgCheck size={18} className="text-primary" />}
              </button>
            ))}
          </div>,
          document.body,
        )}

      <FormHelperText />
    </div>
  );
};
