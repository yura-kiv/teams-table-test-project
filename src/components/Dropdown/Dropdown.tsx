import React, { useState, useEffect, useRef, ReactNode } from "react";
import styles from "./Dropdown.module.scss";
import OptionsIcon from "../Icons/OptionsIcon";

interface DropdownItem {
  content: ReactNode;
  eventHandler: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (eventHandler: () => void) => {
    setIsOpen(false);
    eventHandler();
  };

  return (
    <div
      className={styles.container}
      ref={dropdownRef}
    >
      <button
        className={styles.button}
        onClick={handleTriggerClick}
      >
        <OptionsIcon
          height={15}
          width={15}
        />
      </button>
      {isOpen && (
        <div className={styles.content}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => handleItemClick(item.eventHandler)}
            >
              {item.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
