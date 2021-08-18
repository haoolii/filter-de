import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterState, initOptions, Product } from "./filterSlice";
import "./filter.css";
interface filterProps {}

export const Filter: React.FC<filterProps> = () => {
  const typeOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.typeOptions
  );
  const brandOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.brandOptions
  );
  const colorOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.colorOptions
  );
  const sizeOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.sizeOptions
  );
  const productList = useSelector<{ filter: FilterState }, Array<Product>>(
    ({ filter }) => filter.productList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initOptions());
  }, []);

  return (
    <div className="filter">
      <div className="tab">
        {typeOptions.map((option) => (
          <label key={option}>
            <input type="checkbox" />
            <span>{option}</span>
          </label>
        ))}
        <div className="saveBtn">
          <button>Save</button>
        </div>
      </div>
      <div className="tab">
        {brandOptions.map((option) => (
          <label key={option}>
            <input type="checkbox" />
            <span>{option}</span>
          </label>
        ))}
        <div className="saveBtn">
          <button>Save</button>
        </div>
      </div>
      <div className="tab">
        {colorOptions.map((option) => (
          <label key={option}>
            <input type="checkbox" />
            <span>{option}</span>
          </label>
        ))}
        <div className="saveBtn">
          <button>Save</button>
        </div>
      </div>
      <div className="tab">
        {sizeOptions.map((option) => (
          <label key={option}>
            <input type="checkbox" />
            <span>{option}</span>
          </label>
        ))}
        <div className="saveBtn">
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};
