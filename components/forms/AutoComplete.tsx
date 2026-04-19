import { useState } from "react";

export const Autocomplete = ({
  options,
}: {
  options: string[];
}) => {
  const [query, setQuery] = useState("");

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative">
      <input
        className="input input-bordered w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-base-100 shadow rounded-box">
          {filtered.map((o) => (
            <li
              key={o}
              className="p-2 hover:bg-base-200 cursor-pointer"
              onClick={() => setQuery(o)}
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};