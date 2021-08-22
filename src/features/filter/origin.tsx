import React from "react";

interface originProps {
  options: Array<string>;
}

export const Origin: React.FC<originProps> = ({ options }) => {
  return (
    <div className="origin">
      {options.map((option) => (
        <div>{option}</div>
      ))}
    </div>
  );
};
