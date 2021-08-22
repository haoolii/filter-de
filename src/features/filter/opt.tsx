import React from "react";

interface optProps {
  options: Array<string>;
  activatedDict: Record<string, boolean>;
  toggle: (option: string) => void;
}

export const Opt: React.FC<optProps> = ({ options, activatedDict, toggle }) => {
  return (
    <>
      <div className="opt">
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={!!activatedDict[option]}
              onChange={(event) => toggle(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </>
  );
};
