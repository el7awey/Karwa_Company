import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Location {
  nameAr: string;
  nameEn: string;
}

interface CustomSelectProps {
  locations: Location[];
  language: { code: string };
  value: string;
  onChange: (val: string) => void;
}

export default function CustomSelect({
  locations,
  language,
  value,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);
  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleOpen}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-muted-foreground/20 bg-muted/30 text-white focus:ring-2 focus:ring-primary focus:outline-none"
        dir={language.code === "ar" ? "rtl" : "ltr"}
      >
        <span>
          {value
            ? value
            : language.code === "ar"
            ? "اختر المكان"
            : "Select Location"}
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-muted-foreground/20 bg-muted/90 backdrop-blur-lg shadow-lg"
          dir={language.code === "ar" ? "rtl" : "ltr"}
        >
          {locations.map((loc, idx) => {
            const text =
              language.code === "ar" ? loc.nameAr : loc.nameEn;
            return (
              <li
                key={idx}
                onClick={() => handleSelect(text)}
                className={`px-4 py-2 cursor-pointer hover:bg-primary/20 ${
                  value === text ? "bg-primary/40" : ""
                }`}
              >
                {text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
