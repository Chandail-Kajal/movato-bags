/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
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
import { useFormControl } from "./FormControl";
import { FormLabel } from "./FormLabel";
import { FormHelperText } from "./FormHelperText";
import { Typography } from "../Typography";
import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type Props = {
  fetchOptions: (query: string) => Promise<Option[]>;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
  placeholder?: string;
  width?: number | string;
  dropdownWidth?: number | string;
  label?: string;
};

export const AsyncAutocomplete = ({
  fetchOptions,
  value,
  onChange,
  label,
  placeholder,
  width,
  dropdownWidth,
}: Props) => {
  const { error, disabled } = useFormControl();

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debounceRef = useRef<any>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 8 }),
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

  useEffect(() => {
    if (!query) {
      setOptions([]);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchOptions(query);
        setOptions(res);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  return (
    <div className="w-full flex flex-col gap-1">
      {label && <FormLabel>{label}</FormLabel>}

      {/* Input */}
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={
          width
            ? typeof width === "number"
              ? { width: `${width}px` }
              : { width }
            : undefined
        }
        className={clsx(
          !width && "w-full",
          "flex items-center px-4 py-1.5 border rounded-md bg-transparent",
          "border-primary/20 focus-within:border-primary",
          error && "border-error ring-2 ring-error",
        )}
      >
        <input
          disabled={disabled}
          value={value?.label ?? query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            onChange?.(null);
          }}
          placeholder={placeholder||"Search..."}
          className="w-full bg-transparent outline-none"
        />
      </div>

      
      {open &&
        createPortal(
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx(
              "z-50 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto",
              
              !loading && options.length === 0 && !query && "hidden",
            )}
          >
            {loading && (
              <div className="px-4 py-2">
                <Typography color="text.disabled">Loading...</Typography>
              </div>
            )}

            {!loading &&
              options.map((o) => (
                <button
                  key={o.value}
                  onClick={() => {
                    onChange?.(o);
                    setOpen(false);
                  }}
                  className="w-full flex justify-between px-4 py-2 hover:bg-accent/5"
                >
                  <Typography className="truncate">{o.label}</Typography>
                </button>
              ))}

            {!loading && options.length === 0 && query && (
              <div className="px-4 py-2">
                <Typography variant="body2" color="text.disabled">
                  No results
                </Typography>
              </div>
            )}

            {/* {!loading && options.length === 0 && !query && (
              <div className="px-4 py-2">
                <Typography variant="body2" color="text.disabled">
                  Type Something to search
                </Typography>
              </div>
            )} */}
          </div>,
          document.body,
        )}

      <FormHelperText />
    </div>
  );
};
