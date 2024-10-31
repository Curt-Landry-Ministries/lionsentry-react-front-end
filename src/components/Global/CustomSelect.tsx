import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import useOutsideClick from "@/lib/hooks/useOutsideClick";
import { TriangleDownIcon } from "@radix-ui/react-icons";

/*https://kaderbiral26.medium.com/building-a-custom-dropdown-component-in-react-step-by-step-e12f4330fb58 */

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  style?: string;
  containerStyle?: string;
  selectedId?: string;
  titleTop?: boolean;
  onSelect?: (id: string) => void;
}

const Dropdown = ({
  id,
  title,
  data,
  position = "bottom-left",
  titleTop = false,
  style,
  containerStyle,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.value === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.value === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames(
    "absolute bg-white dark:bg-dark-mode-subtle w-full max-h-52 overflow-y-auto py-3 rounded shadow-dropdown z-10",
    {
      "top-full right-0 mt-2": position === "bottom-right",
      "top-full left-0 mt-2": position === "bottom-left",
      "bottom-full right-0 mb-2": position === "top-right",
      "bottom-full left-0 mb-2": position === "top-left",
    }
  );

  return (
    <div
      className={classNames(
        "flex mobile-only:flex-wrap gap-2",
        {
          "flex-col items-start": titleTop,
          "items-center": !titleTop,
        },
        containerStyle
      )}
    >
      {title && <span className="font-semibold">{title}</span>}
      <div ref={dropdownRef} className="relative w-full">
        <button
          id={id}
          aria-label="Toggle dropdown"
          aria-haspopup="true"
          aria-expanded={isOpen}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            "flex justify-between items-center gap-5 rounded w-full py-2 px-3 border border-cloud-darker min-w-[160px] bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong",
            style
          )}
        >
          <span>{selectedItem?.label || title}</span>
          <TriangleDownIcon
            className={classNames("transform duration-300 ease-in-out", {
              "rotate-180": isOpen,
            })}
          />
        </button>
        {/* Open */}
        {isOpen && (
          <div aria-label="Dropdown menu" className={dropdownClass}>
            <ul
              role="menu"
              aria-labelledby={id}
              aria-orientation="vertical"
              className="leading-10"
            >
              {data?.map((item) => (
                <li
                  key={item.value}
                  onClick={() => handleChange(item)}
                  className={classNames(
                    "flex items-center cursor-pointer hover:bg-[#f1f1f1] hover:dark:text-black px-3",
                    {
                      "bg-[#f1f1f1] dark:text-black":
                        selectedItem?.value === item.value,
                    }
                  )}
                >
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
